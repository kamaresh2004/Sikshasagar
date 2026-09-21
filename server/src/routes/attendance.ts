import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

import { Attendance } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { toAttendance } from '../lib/serializers.js';
import { uid } from '../lib/id.js';
import { parseDisplayDate, fmtDate, fmtDateTime } from '../lib/dates.js';
import { pushNotification } from '../lib/realtime.js';

const router = Router();
router.use(authenticate);

/** GET /api/attendance?date=07%20Aug%202026 */
router.get('/', async (req: Request, res: Response) => {
  const { date } = req.query;
  const filter: Record<string, unknown> = {};
  if (typeof date === 'string' && parseDisplayDate(date)) {
    filter.date = date;
  } else {
    filter.date = fmtDate(Date.now());
  }
  const docs = await Attendance.find(filter).lean();
  return res.json({ ok: true, data: docs.map(toAttendance) });
});

const markSchema = z.object({
  date: z.string().min(3),
  records: z.array(
    z.object({
      studentId: z.string(),
      studentName: z.string().optional(),
      status: z.enum(['PRESENT', 'ABSENT', 'LEAVE']),
      classId: z.string().optional(),
      className: z.string().optional(),
      time: z.string().optional(),
    }),
  ),
});

/**
 * POST /api/attendance/mark
 * Upserts each student's record for the day; parents of each student are
 * notified + pinged in real time.
 */
router.post('/mark', async (req: Request, res: Response) => {
  const parsed = markSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'Invalid attendance payload.' });
  }
  const { date, records } = parsed.data;
  const saved: unknown[] = [];

  for (const r of records) {
    const student = await (await import('../models/Student.js')).Student.findOne({ id: r.studentId }).lean();
    const classId = r.classId ?? student?.classId ?? '';
    const className = r.className ?? student?.className ?? '';

    const existing = await Attendance.findOne({ studentId: r.studentId, date });
    const payload = {
      studentId: r.studentId,
      studentName: r.studentName ?? student?.name ?? '',
      classId,
      className,
      date,
      status: r.status,
      time: r.status === 'PRESENT' ? r.time ?? fmtDateTime(Date.now()).split(',')[1].trim() : undefined,
    };
    let doc;
    if (existing) {
      await Attendance.updateOne({ _id: existing._id }, { $set: payload });
      doc = { id: existing.id, ...payload };
    } else {
      doc = await Attendance.create({ id: uid('a'), ...payload });
    }
    saved.push(toAttendance(doc));

    // Notify the child's parents live.
    const parentIds = student?.parentIds ?? [];
    for (const parentId of parentIds) {
      const statusLabel =
        r.status === 'PRESENT' ? 'present' : r.status === 'ABSENT' ? 'absent' : 'on leave';
      await pushNotification({
        userId: parentId,
        type: 'attendance',
        title: `${r.studentName ?? 'Child'} marked ${statusLabel}`,
        message: `${r.studentName ?? 'Your child'} was marked ${statusLabel} for ${className || 'class'} on ${fmtDate(Date.now())}${r.time ? ` at ${r.time}` : ''}.`,
        emoji: r.status === 'PRESENT' ? '✅' : r.status === 'ABSENT' ? '❌' : '🌴',
      });
    }
  }

  return res.json({ ok: true, data: saved });
});

export const attendanceRoutes = router;