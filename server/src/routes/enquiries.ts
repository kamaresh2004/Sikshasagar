import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

import { Enquiry } from '../models/index.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { toEnquiry } from '../lib/serializers.js';
import { uid } from '../lib/id.js';
import { fmtDate } from '../lib/dates.js';

const router = Router();
router.use(authenticate);

/** GET /api/enquiries */
router.get('/', requireRole('management'), async (_req: Request, res: Response) => {
  const docs = await Enquiry.find().sort({ createdAt: -1 }).lean();
  return res.json({ ok: true, data: docs.map(toEnquiry) });
});

const enquirySchema = z.object({
  name: z.string().min(1),
  contact: z.string().default(''),
  program: z.string().default(''),
  message: z.string().default(''),
});

/** POST /api/enquiries — public-style contact form. */
router.post('/', async (req: Request, res: Response) => {
  const parsed = enquirySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: 'Invalid enquiry.' });
  const data = parsed.data;
  const doc = await Enquiry.create({
    id: uid('e'),
    name: data.name,
    contact: data.contact,
    program: data.program,
    message: data.message,
    aiDraftReply: '',
    status: 'new',
    date: fmtDate(Date.now()),
  });
  return res.status(201).json({ ok: true, data: toEnquiry(doc.toObject()) });
});

/** PATCH /api/enquiries/:id/status */
router.patch('/:id/status', requireRole('management'), async (req: Request, res: Response) => {
  const status = req.body?.status as string | undefined;
  if (!['new', 'followup', 'closed'].includes(status ?? '')) {
    return res.status(400).json({ ok: false, error: 'Invalid status.' });
  }
  const doc = await Enquiry.findOneAndUpdate(
    { id: req.params.id },
    { $set: { status } },
    { new: true },
  ).lean();
  if (!doc) return res.status(404).json({ ok: false, error: 'Enquiry not found' });
  return res.json({ ok: true, data: toEnquiry(doc) });
});

export const enquiryRoutes = router;