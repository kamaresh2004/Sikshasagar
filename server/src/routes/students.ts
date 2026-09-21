import { Router, type Request, type Response } from 'express';

import { Student, ClassModel } from '../models/index.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { toStudent, toClass } from '../lib/serializers.js';
import { uid } from '../lib/id.js';

const router = Router();
router.use(authenticate);

/** GET /api/students */
router.get('/', async (_req: Request, res: Response) => {
  const docs = await Student.find().lean();
  return res.json({ ok: true, data: docs.map(toStudent) });
});

/** POST /api/students */
router.post('/', requireRole('management'), async (req: Request, res: Response) => {
  const body = req.body ?? {};
  const doc = await Student.create({ id: uid('s'), emoji: '🧒', avatarColor: '#0E7490', ...body });
  return res.status(201).json({ ok: true, data: toStudent(doc.toObject()) });
});

/** GET /api/students/:id */
router.get('/:id', async (req: Request, res: Response) => {
  const doc = await Student.findOne({ id: req.params.id }).lean();
  if (!doc) return res.status(404).json({ ok: false, error: 'Student not found' });
  return res.json({ ok: true, data: toStudent(doc) });
});

export const studentRoutes = router;

const classRouter = Router();
classRouter.use(authenticate);

/** GET /api/classes */
classRouter.get('/', async (_req: Request, res: Response) => {
  const docs = await ClassModel.find().lean();
  return res.json({ ok: true, data: docs.map(toClass) });
});

export const classRoutes = classRouter;