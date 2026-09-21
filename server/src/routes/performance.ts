import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

import { Performance, Student } from '../models/index.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { toPerformance } from '../lib/serializers.js';
import { uid } from '../lib/id.js';
import { fmtDate } from '../lib/dates.js';
import { pushNotification } from '../lib/realtime.js';

const router = Router();
router.use(authenticate);

/** GET /api/performance?studentId=s-1 */
router.get('/', async (req: Request, res: Response) => {
  const { studentId } = req.query;
  const filter: Record<string, unknown> = {};
  if (typeof studentId === 'string') filter.studentId = studentId;
  const docs = await Performance.find(filter).sort({ createdAt: -1 }).lean();
  return res.json({ ok: true, data: docs.map(toPerformance) });
});

const addSchema = z.object({
  studentId: z.string(),
  studentName: z.string().optional(),
  category: z.enum(['Milestone', 'Behavior', 'Academic', 'Social']),
  note: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  emoji: z.string().optional(),
});

/** POST /api/performance — teacher adds a note; parents are notified live. */
router.post('/', requireRole('teacher', 'management'), async (req: Request, res: Response) => {
  const parsed = addSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: 'Invalid performance note.' });
  const data = parsed.data;
  const student = await Student.findOne({ id: data.studentId }).lean();
  const doc = await Performance.create({
    id: uid('p'),
    studentId: data.studentId,
    studentName: data.studentName ?? student?.name ?? '',
    teacherId: req.auth!.id,
    category: data.category,
    note: data.note,
    date: fmtDate(Date.now()),
    rating: data.rating,
    emoji: data.emoji ?? '⭐',
  });
  for (const parentId of student?.parentIds ?? []) {
    await pushNotification({
      userId: parentId,
      type: 'performance',
      title: `New ${data.category.toLowerCase()} update`,
      message: `${doc.studentName} — ${data.note.slice(0, 90)}`,
      emoji: doc.emoji,
    });
  }
  return res.status(201).json({ ok: true, data: toPerformance(doc.toObject()) });
});

export const performanceRoutes = router;