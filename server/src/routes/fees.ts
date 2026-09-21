import { Router, type Request, type Response } from 'express';

import { Fee, ClassModel } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { toFee } from '../lib/serializers.js';

const router = Router();
router.use(authenticate);

/** GET /api/fees */
router.get('/', async (req: Request, res: Response) => {
  const me = req.auth!;
  const docs = await Fee.find()
    .sort({ createdAt: -1 })
    .lean();
  let fees = docs;
  if (me.role === 'parent') {
    fees = docs.filter((f) => me.linkedStudentIds.includes(f.studentId));
  }
  const classes = await ClassModel.find().lean();
  return res.json({
    ok: true,
    data: fees.map(toFee),
    meta: { classes: classes.map((c) => ({ id: c.id, name: `${c.name} ${c.section}`, className: `${c.name} ${c.section}` })) },
  });
});

export const feeRoutes = router;