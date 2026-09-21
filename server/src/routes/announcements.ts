import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

import { Announcement, User } from '../models/index.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { toAnnouncement } from '../lib/serializers.js';
import { uid } from '../lib/id.js';
import { fmtDate } from '../lib/dates.js';
import { emitToAll, pushNotification } from '../lib/realtime.js';

const router = Router();
router.use(authenticate);

/** GET /api/announcements */
router.get('/', async (_req: Request, res: Response) => {
  const docs = await Announcement.find().sort({ createdAt: -1 }).lean();
  return res.json({ ok: true, data: docs.map(toAnnouncement) });
});

const announceSchema = z.object({
  title: z.string().min(1),
  body: z.string().default(''),
  audience: z.string().default('All Classes'),
  priority: z.enum(['normal', 'important']).default('normal'),
  pinned: z.boolean().default(false),
  emoji: z.string().optional().default('📢'),
});

/**
 * POST /api/announcements — management/teacher creates an announcement.
 * Broadcasts to every user's notification feed in real time.
 */
router.post('/', requireRole('management', 'teacher'), async (req: Request, res: Response) => {
  const parsed = announceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: 'Invalid announcement.' });
  const data = parsed.data;
  const doc = await Announcement.create({
    id: uid('n'),
    title: data.title,
    body: data.body,
    audience: data.audience,
    createdBy: req.auth!.name,
    date: fmtDate(Date.now()),
    priority: data.priority,
    pinned: data.pinned,
    emoji: data.emoji,
  });

  const users = await User.find({ role: { $in: ['parent', 'teacher'] } }).lean();
  for (const u of users) {
    await pushNotification({
      userId: u.id,
      type: 'announcement',
      title: doc.title,
      message: doc.body.slice(0, 120) || 'See announcements.',
      emoji: doc.emoji,
    });
  }
  emitToAll('realtime:announcements', toAnnouncement(doc.toObject()));
  return res.status(201).json({ ok: true, data: toAnnouncement(doc.toObject()) });
});

export const announcementRoutes = router;