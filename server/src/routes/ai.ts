import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

import { authenticate } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

const qSchema = z.object({ question: z.string().min(1) });

/**
 * POST /api/ai/chatbot
 * Currently returns a scripted reply (same knowledge the app's local engine
 * used). Swap the body for an OpenAI/Anthropic call later.
 */
router.post('/chatbot', async (req: Request, res: Response) => {
  const parsed = qSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: 'Invalid question.' });
  const question = parsed.data.question.toLowerCase();

  const reply = (() => {
    if (/(fee|pay|paym|invoice|charge|amount)/.test(question)) {
      return 'Your fee summary is available under the Fees section. Nursery A annual fee is ₹45,000 and Playgroup A is ₹42,000 — both all-inclusive. You can view the current paid balance and due date for each child there.';
    }
    if (/(attend|absent|present|school today)/.test(question)) {
      return 'Today\'s attendance for your children is shown on the Home screen under Attendance. Marked-present updates appear as notifications as soon as the teacher records them.';
    }
    if (/(homework|assignment|work|practice)/.test(question)) {
      return 'Your child\'s homework for the week is listed in the Homework section. Each entry shows the subject, due date and any attachments.';
    }
    if (/(timing|time|hours|schedule)/.test(question)) {
      return 'School runs Monday–Friday, 9:00 AM to 12:30 PM. Office hours are 9 AM – 5 PM on weekdays.';
    }
    if (/(transport|bus|pick|drop)/.test(question)) {
      return 'Yes — we provide door-to-door transport with trained attendants and GPS tracking, covering Aundh, Baner, Hinjewadi and surrounding areas.';
    }
    if (/(admission|age|eligible|enrol)/.test(question)) {
      return 'Admissions are open for the 2026-27 session. Children aged 1.5+ are eligible for Playgroup; Nursery requires the child to be 2.5+ by 31 March.';
    }
    if (/(leave|holiday|vacation|off)/.test(question)) {
      return 'You can request leave for your child any time from the Home screen → Leave applications. The teacher reviews and approves it, and you get a notification with the decision.';
    }
    if (/(contact|call|phone|office|reach|whatsapp)/.test(question)) {
      return 'You can reach the office at +91 98200 11223, or use the Contact section to call or WhatsApp the school directly. Office hours 9 AM – 5 PM, Mon–Fri.';
    }
    if (/(gallery|photo|picture|album)/.test(question)) {
      return 'Approved class photos appear in the Gallery. New photos show up there as soon as management approves them.';
    }
    if (/(hi|hello|hey|namaste)/.test(question)) {
      return 'Hello! I\'m Sagar, your Siksha Sagar assistant. Ask me about fees, attendance, homework, timings, transport, leave or anything school-related.';
    }
    if (/(thank|thanks|great|awesome|good)/.test(question)) {
      return 'You\'re most welcome! Anything else you\'d like to know about Siksha Sagar?';
    }
    return 'I can help with fees, attendance, homework, school timings, transport, admissions and leave. For anything else, the office is at +91 98200 11223 — or tap Contact to reach us directly.';
  })();

  return res.json({ ok: true, data: { answer: reply } });
});

export const aiRoutes = router;