import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

import { Gallery } from '../models/index.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { toGallery } from '../lib/serializers.js';
import { uid } from '../lib/id.js';
import { fmtDate } from '../lib/dates.js';
import { emitToClass, pushNotification } from '../lib/realtime.js';

const router = Router();
router.use(authenticate);

/** GET /api/gallery?classId=c-2 — approved photos for parents, all for teachers/mgmt. */
router.get('/', async (req: Request, res: Response) => {
  const { classId } = req.query;
  const filter: Record<string, unknown> = {};
  const me = req.auth!;
  if (me.role === 'parent') filter.status = 'approved';
  if (typeof classId === 'string') filter.classId = classId;
  const docs = await Gallery.find(filter).sort({ createdAt: -1 }).lean();
  return res.json({ ok: true, data: docs.map(toGallery) });
});

/** GET /api/gallery/pending — management approval queue. */
router.get('/pending', requireRole('management', 'teacher'), async (_req: Request, res: Response) => {
  const docs = await Gallery.find({ status: 'pending' }).sort({ createdAt: -1 }).lean();
  return res.json({ ok: true, data: docs.map(toGallery) });
});

const uploadSchema = z.object({
  classId: z.string(),
  className: z.string().optional(),
  mediaUrl: z.string().optional().default(''),
  caption: z.string().optional().default(''),
  emoji: z.string().optional().default('📷'),
  aiTags: z.array(z.string()).optional().default([]),
});

/** POST /api/gallery/upload — teacher uploads a photo (goes into approval queue). */
router.post('/upload', requireRole('teacher', 'management'), async (req: Request, res: Response) => {
  const parsed = uploadSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: 'Invalid upload payload.' });
  const data = parsed.data;
  const doc = await Gallery.create({
    id: uid('g'),
    mediaUrl: data.mediaUrl,
    classId: data.classId,
    className: data.className ?? '',
    date: fmtDate(Date.now()),
    uploadedBy: req.auth!.name,
    status: 'pending',
    aiTags: data.aiTags,
    caption: data.caption,
    emoji: data.emoji,
  });
  return res.status(201).json({ ok: true, data: toGallery(doc.toObject()) });
});

/**
 * POST /api/gallery/:id/approve
 * Approve a pending photo -> becomes visible to parents; the class room is
 * pinged live so their gallery updates instantly.
 */
router.post('/:id/approve', requireRole('management', 'teacher'), async (req: Request, res: Response) => {
  const doc = await Gallery.findOneAndUpdate(
    { id: req.params.id },
    { $set: { status: 'approved' } },
    { new: true },
  ).lean();
  if (!doc) return res.status(404).json({ ok: false, error: 'Photo not found' });

  emitToClass(doc.className, 'realtime:gallery', toGallery(doc));

  // Notify parents whose children are in that class.
  const { Student } = await import('../models/Student.js');
  const students = await Student.find({ classId: doc.classId }).lean();
  const parentIds = Array.from(new Set(students.flatMap((s) => s.parentIds ?? [])));
  for (const parentId of parentIds) {
    await pushNotification({
      userId: parentId,
      type: 'gallery',
      title: 'New photo in the gallery',
      message: `${doc.uploadedBy || 'Teacher'} added "${doc.caption || 'a new photo'}" — tap to view.`,
      emoji: doc.emoji ?? '📷',
    });
  }
  return res.json({ ok: true, data: toGallery(doc) });
});

export const galleryRoutes = router;