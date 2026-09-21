import { Router, type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { User } from '../models/User.js';
import { signToken, authenticate } from '../middleware/auth.js';
import { toUser } from '../lib/serializers.js';
import { uid } from '../lib/id.js';

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

/**
 * POST /api/auth/login
 * Matches api.login(email, password) -> { ok, role }
 */
router.post('/login', async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'Invalid email or password.' });
  }
  const { email, password } = parsed.data;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({
      ok: false,
      error: 'Invalid credentials. Try one of the demo accounts below.',
    });
  }
  const token = signToken({ id: user.id, role: user.role, email: user.email });
  return res.json({ ok: true, data: { token, user: toUser(user.toObject()) } });
});

/**
 * POST /api/auth/register
 * Used by the seed script + future sign-ups. Hashes the password server-side.
 */
router.post('/register', async (req: Request, res: Response) => {
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional().default(''),
    role: z.enum(['management', 'teacher', 'parent']),
    password: z.string().min(6),
    className: z.string().optional(),
    linkedStudentIds: z.array(z.string()).optional().default([]),
    avatarColor: z.string().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'Invalid registration payload.' });
  }
  const data = parsed.data;
  const exists = await User.findOne({ email: data.email.toLowerCase() });
  if (exists) return res.status(409).json({ ok: false, error: 'Account already exists.' });
  const hash = await bcrypt.hash(data.password, 10);
  const user = await User.create({
    id: uid('u'),
    name: data.name,
    email: data.email.toLowerCase(),
    phone: data.phone,
    role: data.role,
    passwordHash: hash,
    className: data.className,
    linkedStudentIds: data.linkedStudentIds,
    avatarColor: data.avatarColor,
    pushTokens: [],
  });
  return res.status(201).json({ ok: true, data: toUser(user.toObject()) });
});

router.post('/reset-password', async (_req, res: Response) => {
  return res.json({ ok: true, message: 'If an account exists, a reset link has been sent.' });
});

/** GET /api/auth/me — fetch the current user (for rehydrating on app open). */
router.get('/me', authenticate, async (req: Request, res: Response) => {
  const me = await User.findOne({ id: req.auth!.id }).lean();
  if (!me) return res.status(404).json({ ok: false, error: 'Not found' });
  return res.json({ ok: true, data: toUser(me) });
});

export const authRoutes = router;