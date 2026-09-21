import { Router, type Request, type Response } from 'express';

import { Notification, User } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { toNotification } from '../lib/serializers.js';

const router = Router();
router.use(authenticate);

/** GET /api/notifications — the current user's feed, newest first. */
router.get('/', async (req: Request, res: Response) => {
  const docs = await Notification.find({ userId: req.auth!.id }).sort({ createdAt: -1 }).lean();
  return res.json({ ok: true, data: docs.map(toNotification) });
});

/** PATCH /api/notifications/:id/read */
router.patch('/:id/read', async (req: Request, res: Response) => {
  await Notification.updateOne({ id: req.params.id, userId: req.auth!.id }, { $set: { read: true } });
  return res.json({ ok: true });
});

/** PATCH /api/notifications/read-all */
router.patch('/read-all', async (req: Request, res: Response) => {
  await Notification.updateMany({ userId: req.auth!.id }, { $set: { read: true } });
  return res.json({ ok: true });
});

/**
 * POST /api/notifications/push-token
 * Register the Expo push token for this user (called from the app after login).
 */
router.post('/push-token', async (req: Request, res: Response) => {
  const token = req.body?.token as string | undefined;
  if (!token) return res.status(400).json({ ok: false, error: 'Missing token' });
  await User.updateOne({ id: req.auth!.id }, { $addToSet: { pushTokens: token } });
  return res.json({ ok: true });
});

export const notificationRoutes = router;