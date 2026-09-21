import { Router, type Request, type Response } from 'express';

import { Event } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { toEvent } from '../lib/serializers.js';

const router = Router();
router.use(authenticate);

/** GET /api/events */
router.get('/', async (_req: Request, res: Response) => {
  const docs = await Event.find().sort({ createdAt: -1 }).lean();
  return res.json({ ok: true, data: docs.map(toEvent) });
});

export const eventRoutes = router;