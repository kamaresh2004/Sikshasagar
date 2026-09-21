import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

import { LeaveRequest, Student, User } from '../models/index.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { toLeaveRequest } from '../lib/serializers.js';
import { uid } from '../lib/id.js';
import { fmtDate } from '../lib/dates.js';
import { emitToClass, pushNotification, sendPush } from '../lib/realtime.js';

const router = Router();
router.use(authenticate);

/** GET /api/leave — scoped to the caller's role. */
router.get('/', async (req: Request, res: Response) => {
  const me = req.auth!;
  let docs;
  if (me.role === 'parent') {
    const mine = me.linkedStudentIds ?? [];
    docs = await LeaveRequest.find({ studentId: { $in: mine } }).sort({ createdAtRaw: -1 }).lean();
  } else if (me.role === 'teacher') {
    docs = await LeaveRequest.find({ className: me.className }).sort({ createdAtRaw: -1 }).lean();
  } else {
    docs = await LeaveRequest.find().sort({ createdAtRaw: -1 }).lean();
  }
  return res.json({ ok: true, data: docs.map(toLeaveRequest) });
});

const requestSchema = z.object({
  studentId: z.string(),
  studentName: z.string().optional(),
  className: z.string().optional(),
  fromDate: z.string().min(4),
  toDate: z.string().min(4),
  reason: z.string().min(1),
});

/**
 * POST /api/leave — parent requests leave for a child.
 * The child's class room is pinged so their teacher sees it instantly.
 */
router.post('/', requireRole('parent'), async (req: Request, res: Response) => {
  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: 'Invalid leave request.' });
  const data = parsed.data;
  const student = await Student.findOne({ id: data.studentId }).lean();
  const doc = await LeaveRequest.create({
    id: uid('lv'),
    studentId: data.studentId,
    studentName: data.studentName ?? student?.name ?? '',
    className: data.className ?? student?.className ?? '',
    parentName: req.auth!.name,
    fromDate: data.fromDate,
    toDate: data.toDate,
    reason: data.reason,
    status: 'pending',
    createdAt: fmtDate(Date.now()),
    createdAtRaw: new Date(),
  });

  emitToClass(doc.className, 'realtime:leave', toLeaveRequest(doc.toObject()));

  // Notify the class teacher (and management) in real time.
  const classTeacher = await User.findOne({ className: doc.className, role: 'teacher' }).lean();
  if (classTeacher) {
    await pushNotification({
      userId: classTeacher.id,
      type: 'leave',
      title: `Leave request from ${req.auth!.name}`,
      message: `${doc.studentName} requested leave ${doc.fromDate} — ${doc.toDate}.`,
      emoji: '📅',
    });
  }
  return res.status(201).json({ ok: true, data: toLeaveRequest(doc.toObject()) });
});

/**
 * POST /api/leave/:id/:action (action = approve | decline)
 * Teacher or management decides; parent is notified live + via push.
 */
router.post(
  '/:id/:action',
  requireRole('teacher', 'management'),
  async (req: Request, res: Response) => {
    const action = req.params.action;
    if (action !== 'approve' && action !== 'decline') {
      return res.status(400).json({ ok: false, error: 'Action must be approve or decline.' });
    }
    const doc = await LeaveRequest.findOne({ id: req.params.id }).lean();
    if (!doc) return res.status(404).json({ ok: false, error: 'Leave request not found' });

    const status = action === 'approve' ? 'approved' : 'declined';
    const updated = await LeaveRequest.findOneAndUpdate(
      { id: req.params.id },
      { $set: { status, decidedBy: req.auth!.name, decidedAtRaw: new Date() } },
      { new: true },
    ).lean();
    if (!updated) return res.status(404).json({ ok: false, error: 'Leave request not found' });

    const parentUser = await User.findOne({ linkedStudentIds: doc.studentId, role: 'parent' })
      .lean()
      .catch(() => null);

    if (parentUser) {
      const verb = status === 'approved' ? 'approved' : 'declined';
      await pushNotification({
        userId: parentUser.id,
        type: 'leave',
        title: `Leave ${verb}`,
        message: `${doc.studentName}'s leave request (${doc.fromDate} — ${doc.toDate}) was ${verb}.`,
        emoji: status === 'approved' ? '✅' : '❌',
      });
      await sendPush({
        userId: parentUser.id,
        title: `Leave ${verb}`,
        body: `${doc.studentName}'s leave request was ${verb}.`,
      });
    }
    emitToClass(doc.className, 'realtime:leave', toLeaveRequest(updated));
    return res.json({ ok: true, data: toLeaveRequest(updated) });
  },
);

export const leaveRoutes = router;