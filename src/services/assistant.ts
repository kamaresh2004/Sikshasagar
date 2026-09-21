/**
 * Sagar — local context-aware assistant engine.
 * No API key, no network. Answers are grounded in the app's own data
 * (students, fees, attendance, homework, performance, events, announcements)
 * plus a small school knowledge base. The single swap point for a real LLM
 * later would be replacing `askSagar` with a call that sends the question
 * (and the parent's child context) to a backend endpoint.
 */

import {
  ANNOUNCEMENTS,
  ATTENDANCE_TODAY,
  CLASSES,
  EVENTS,
  FEES,
  HOMEWORK,
  PERFORMANCE,
  studentById,
} from '@/constants/mock';
import type { Student } from '@/constants/types';
import { useAuthStore } from '@/store/auth';

const SCHOOL = {
  classHours: 'Playgroup–Nursery: 8:30 AM – 12:30 PM, LKG–UKG: 8:30 AM – 1:00 PM',
  officeHours: 'Mon–Sat • 8:30 AM – 5:00 PM',
  office: '+91 98200 11223',
  whatsapp: '+91 98765 43210',
  email: 'hello@sikshasagar.in',
  address: '22, Lake View Colony, Pune',
  transport:
    'door-to-door transport with trained attendants and GPS tracking. Routes cover Aundh, Baner, Hinjewadi and surrounding areas.',
  admission:
    'Admissions for 2026-27 are open for Playgroup to UKG. The process is a simple enquiry form, a friendly interaction with the child, and document submission.',
};

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

function currentChildren(): Student[] {
  const user = useAuthStore.getState().user;
  const ids = user?.linkedStudentIds ?? [];
  return ids.map((id) => studentById(id)).filter((s): s is Student => Boolean(s));
}

function feeStatus(s: Student): string {
  const rec = FEES.find((f) => f.studentId === s.id);
  if (!rec) return `${s.name} doesn't have a fee record yet.`;
  const who = `${s.name} (${s.className})`;
  if (rec.status === 'paid') return `${who}: fully paid — ${fmt(rec.amount)}. ✅`;
  const balance = rec.amount - rec.paid;
  if (rec.status === 'partial')
    return `${who}: ${fmt(rec.paid)} paid of ${fmt(rec.amount)}. Balance ${fmt(balance)} is due by ${rec.dueDate}.`;
  return `${who}: ${fmt(rec.amount)} outstanding, due by ${rec.dueDate}.`; 
}

function feeStructure(): string {
  return (
    `Our annual fee is all-inclusive — no hidden charges. Playgroup is ${fmt(42000)} and Nursery ${fmt(45000)} per year. ` +
    `For the current LKG/UKG breakdown, the office will share a detailed fee sheet. ` +
    `To see your own balance, just ask "Is my child's fee paid?".`
  );
}

function attendanceStatus(): string {
  const children = currentChildren();
  if (children.length === 0)
    return `I can't see any children linked to this account. Please contact the office at ${SCHOOL.office}.`;
  const date = ATTENDANCE_TODAY[0]?.date ?? 'today';
  const lines = children.map((c) => {
    const rec = ATTENDANCE_TODAY.find((a) => a.studentId === c.id);
    if (!rec)
      return `${c.name}: no attendance entry for ${date}. Please contact the office if you think this is an error.`;
    const when = rec.time ? ` at ${rec.time}` : '';
    if (rec.status === 'PRESENT') return `${c.name}: present today${when}. ✅`;
    if (rec.status === 'ABSENT') return `${c.name}: absent today. Please notify the class teacher with a reason.`;
    return `${c.name}: on leave today.`;
  });
  return `Attendance for ${date}:\n\n${lines.join('\n')}`;
}

function homeworkStatus(): string {
  const children = currentChildren();
  if (children.length === 0)
    return `I can't see any children linked to this account. Please contact the office at ${SCHOOL.office}.`;
  const classes = new Set(children.map((c) => c.className));
  const items = HOMEWORK.filter((h) => classes.has(h.className));
  if (items.length === 0) return `No homework is currently listed for your child's class.`;
  return (
    `Homework for your child's class(es):\n\n` +
    items.map((h) => `• ${h.subject}: ${h.title} (due ${h.dueDate}) — ${h.description}`).join('\n')
  );
}

function performanceStatus(): string {
  const children = currentChildren();
  if (children.length === 0)
    return `I can't see any children linked to this account. Please contact the office at ${SCHOOL.office}.`;
  const lines = children.map((c) => {
    const notes = PERFORMANCE.filter((p) => p.studentId === c.id);
    if (notes.length === 0) return `${c.name}: no progress notes shared yet.`;
    const latest = notes[0];
    return `${c.name}: latest note (${latest.category}, ${latest.rating}/5, ${latest.date}) — ${latest.note}`;
  });
  return `Here's what the teachers have shared:\n\n${lines.join('\n\n')}`;
}

function childInfo(): string {
  const children = currentChildren();
  if (children.length === 0)
    return `I can't see any children linked to this account. Please contact the office at ${SCHOOL.office}.`;
  return children
    .map((c) => {
      const cls = CLASSES.find((cl) => `${cl.name} ${cl.section}` === c.className);
      return `${c.name} ${c.emoji} is in ${c.className}${cls ? ` with ${cls.teacherName}` : ''}. ` +
        `Age ${c.age} • DOB ${c.dob} • Blood group ${c.bloodGroup} • Admitted ${c.admissionDate}.`;
    })
    .join('\n\n');
}

function childClasses(): string {
  return (
    `We offer ${CLASSES.map(
      (c) => `${c.emoji} ${c.name} ${c.section} (${c.studentCount} children • ${c.teacherName})`,
    ).join(', ')} for the 2026-27 session. ` +
    `The curriculum is child-first and play-based, with phonics-based early literacy from Nursery onwards.`
  );
}

function upcomingEvents(): string {
  const list = EVENTS.map(
    (e) => `• ${e.title} — ${e.date}${e.type === 'holiday' ? ' (school closed)' : ''}`,
  ).join('\n');
  return `Here's what's coming up:\n\n${list}`;
}

function announcements(): string {
  return (
    `Latest announcements:\n\n` +
    ANNOUNCEMENTS.map((a) => `• ${a.title} (${a.date})${a.priority === 'important' ? ' — important' : ''}: ${a.body}`).join('\n')
  );
}

function contactInfo(): string {
  return (
    `You can reach us at:\n• Office: ${SCHOOL.office}\n• WhatsApp: ${SCHOOL.whatsapp}\n` +
    `• Email: ${SCHOOL.email}\n• Address: ${SCHOOL.address}\n\nOffice hours: ${SCHOOL.officeHours}`
  );
}

const GREETING =
  `Hi! 👋 I'm Sagar, your Siksha Sagar AI assistant. ` +
  `Ask me about your child's fees, attendance, homework or progress — or anything about school ` +
  `timings, transport, events, admissions and announcements. How can I help?`;

const THANKS = `You're welcome! 😊 Anything else about your child or the school — just ask.`;

const FALLBACK =
  `I'm not sure about that one, but I can help with: your child's fees, attendance, homework and ` +
  `progress, plus school timings, transport, events, admissions and announcements. ` +
  `For anything else, please call the office at ${SCHOOL.office} (${SCHOOL.officeHours}).`;

export function askSagar(question: string): string {
  const q = question.toLowerCase().replace(/[?.,!]/g, '').trim();
  if (!q) return GREETING;

  const has = (...words: string[]) => words.some((w) => q.includes(w));
  const asksAboutChild = has('my child', 'my son', 'my daughter', 'my kid', 'my kids', 'my children');
  const children = currentChildren();
  const askedByName = children.filter((c) => q.includes(c.name.toLowerCase()));

  if (
    /\b(hi|hello|hey|namaste)\b/.test(q) ||
    q.startsWith('good morning') ||
    q.startsWith('good evening') ||
    q.startsWith('good afternoon')
  )
    return GREETING;
  if (has('thank')) return THANKS;

  // Fees — per child when the question references a child, otherwise the annual structure.
  if (has('fee', 'fees', 'pay', 'payment', 'paid', 'balance', 'rupees')) {
    if (asksAboutChild || askedByName.length > 0) {
      if (children.length === 0)
        return `I can't see any children linked to this account. Please contact the office at ${SCHOOL.office}.`;
      const asked = askedByName.length > 0 ? askedByName : children;
      return `Here's the fee status:\n\n${asked.map(feeStatus).join('\n\n')}`;
    }
    return feeStructure();
  }

  if (has('attendance', 'present', 'absent', 'skip', 'school today', 'went to school', 'come to school', 'in school', 'marked')) {
    return attendanceStatus();
  }

  if (has('homework', 'home work', 'assignment', 'practice')) return homeworkStatus();

  if (has('performance', 'progress', 'report', 'grade', 'milestone', 'behav', 'doing')) return performanceStatus();

  // Admission & age rules.
  if (has('admission', 'admit', 'enrol', 'enroll', 'join', 'registration', 'apply')) {
    if (has('age'))
      return `UKG admission requires the child to be at least 4.5 years old by 31 March; Playgroup starts from age 2. ` +
        `In exceptional cases we review applications individually — the office will guide you.`;
    return `${SCHOOL.admission}\n\nPrograms: Playgroup (age 2+), Nursery (3+), LKG (4+), UKG (4.5+ by 31 Mar).`;
  }

  if (asksAboutChild || askedByName.length > 0) return childInfo();

  if (has('timing', 'time', 'hour', 'start', 'end', 'open', 'close', 'when'))
    return `School class hours: ${SCHOOL.classHours}\nOffice (enquiries & payments): ${SCHOOL.officeHours}`;

  if (has('transport', 'bus', 'pickup', 'drop', 'van')) {
    const wantsTime = has('time', 'timing', 'when', 'start', 'hour');
    return wantsTime
      ? `We provide ${SCHOOL.transport} Pickups begin around 8:00 AM and children are dropped home soon after school ends.`
      : `Yes, we provide ${SCHOOL.transport}`;
  }

  if (has('curriculum', 'programme', 'program', 'phonics', 'teaching', 'class', 'playgroup', 'nursery', 'lkg', 'ukg'))
    return childClasses();

  if (has('event', 'celebration', 'function', 'holiday', 'annual day', 'parade', 'janmashtami')) return upcomingEvents();

  if (has('announcement', 'notice', 'circular', 'news', 'notification')) return announcements();

  if (has('contact', 'phone', 'number', 'call', 'email', 'whatsapp', 'address', 'reach')) return contactInfo();

  return FALLBACK;
}