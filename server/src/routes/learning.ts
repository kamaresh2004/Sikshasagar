import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

import { Activity, Homework } from '../models/index.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { toActivity, toHomework } from '../lib/serializers.js';
import { uid } from '../lib/id.js';
import { fmtDate } from '../lib/dates.js';
import { emitToClass } from '../lib/realtime.js';

const router = Router();
router.use(authenticate);

/* ---------------- Activities ---------------- */

/** GET /api/activities?classId=c-2 */
router.get('/activities', async (req: Request, res: Response) => {
  const { classId } = req.query;
  const filter: Record<string, unknown> = {};
  if (typeof classId === 'string') filter.classId = classId;
  const docs = await Activity.find(filter).sort({ createdAt: -1 }).lean();
  return res.json({ ok: true, data: docs.map(toActivity) });
});

const activitySchema = z.object({
  classId: z.string(),
  className: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional().default(''),
  mediaIds: z.array(z.string()).optional().default([]),
  emoji: z.string().optional().default('🎨'),
  color: z.string().optional().default('#0E7490'),
});

/** POST /api/activities — teacher logs a daily activity. */
router.post('/activities', requireRole('teacher', 'management'), async (req: Request, res: Response) => {
  const parsed = activitySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: 'Invalid activity payload.' });
  const data = parsed.data;
  const doc = await Activity.create({
    id: uid('act'),
    classId: data.classId,
    className: data.className ?? '',
    date: fmtDate(Date.now()),
    title: data.title,
    description: data.description,
    mediaIds: data.mediaIds,
    emoji: data.emoji,
    createdBy: req.auth!.name,
    color: data.color,
  });
  emitToClass(data.className ?? '', 'realtime:activities', toActivity(doc.toObject()));
  return res.status(201).json({ ok: true, data: toActivity(doc.toObject()) });
});

/* ---------------- Homework ---------------- */

/** GET /api/homework?classId=c-2 */
router.get('/homework', async (req: Request, res: Response) => {
  const { classId } = req.query;
  const filter: Record<string, unknown> = {};
  if (typeof classId === 'string') filter.classId = classId;
  const docs = await Homework.find(filter).sort({ createdAt: -1 }).lean();
  return res.json({ ok: true, data: docs.map(toHomework) });
});

const homeworkSchema = z.object({
  classId: z.string(),
  className: z.string().optional(),
  subject: z.string().default(''),
  title: z.string().min(1),
  description: z.string().optional().default(''),
  dueDate: z.string().optional(),
  attachments: z.number().optional().default(0),
  emoji: z.string().optional().default('📚'),
});

/** POST /api/homework — teacher shares homework. */
router.post('/homework', requireRole('teacher', 'management'), async (req: Request, res: Response) => {
  const parsed = homeworkSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: 'Invalid homework payload.' });
  const data = parsed.data;
  const doc = await Homework.create({
    id: uid('h'),
    classId: data.classId,
    className: data.className ?? '',
    date: fmtDate(Date.now()),
    subject: data.subject,
    title: data.title,
    description: data.description,
    dueDate: data.dueDate ?? '',
    attachments: data.attachments,
    emoji: data.emoji,
    createdBy: req.auth!.name,
  });
  emitToClass(data.className ?? '', 'realtime:homework', toHomework(doc.toObject()));
  return res.status(201).json({ ok: true, data: toHomework(doc.toObject()) });
});

export const learningRoutes = router;