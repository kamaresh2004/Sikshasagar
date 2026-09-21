/** Convert a lean Mongo doc into the exact shape the app expects
 *  (see src/constants/types.ts). Dates are serialized as "07 Aug 2026". */
import { fmtDate, fmtDateTime } from './dates.js';

type Doc = Record<string, any>;

function pick(doc: Doc, keys: string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const k of keys) {
    if (doc[k] !== undefined) out[k] = doc[k];
  }
  return out;
}

export const toUser = (d: Doc) =>
  pick(d, [
    'id', 'name', 'email', 'phone', 'role', 'avatarColor', 'linkedStudentIds', 'className',
  ]) as any;

export const toStudent = (d: Doc) =>
  pick(d, [
    'id', 'name', 'className', 'age', 'dob', 'admissionDate', 'bloodGroup', 'guardian',
    'guardianPhone', 'address', 'parentIds', 'teacherId', 'emoji', 'avatarColor',
  ]) as any;

export const toClass = (d: Doc) =>
  pick(d, ['id', 'name', 'section', 'teacherId', 'teacherName', 'studentCount', 'academicYear', 'emoji']) as any;

export const toAttendance = (d: Doc) =>
  pick(d, ['id', 'studentId', 'studentName', 'classId', 'className', 'date', 'status', 'time']) as any;

export const toActivity = (d: Doc) =>
  pick(d, ['id', 'classId', 'className', 'date', 'title', 'description', 'mediaIds', 'emoji', 'createdBy', 'color']) as any;

export const toHomework = (d: Doc) =>
  pick(d, ['id', 'classId', 'className', 'date', 'subject', 'title', 'description', 'dueDate', 'attachments', 'emoji']) as any;

export const toPerformance = (d: Doc) =>
  pick(d, ['id', 'studentId', 'studentName', 'teacherId', 'category', 'note', 'date', 'rating', 'emoji']) as any;

export const toGallery = (d: Doc) =>
  pick(d, ['id', 'mediaUrl', 'classId', 'className', 'date', 'uploadedBy', 'status', 'aiTags', 'caption', 'emoji']) as any;

export const toAnnouncement = (d: Doc) =>
  pick(d, ['id', 'title', 'body', 'audience', 'createdBy', 'date', 'priority', 'pinned', 'emoji']) as any;

export const toNotification = (d: Doc) => ({
  id: d.id,
  userId: d.userId,
  type: d.type,
  title: d.title,
  message: d.message,
  read: d.read,
  createdAt: fmtDateTime(d.createdAt),
  emoji: d.emoji ?? '🔔',
});

export const toEnquiry = (d: Doc) =>
  pick(d, ['id', 'name', 'contact', 'program', 'message', 'aiDraftReply', 'status', 'date']) as any;

export const toFee = (d: Doc) =>
  pick(d, ['id', 'studentId', 'studentName', 'className', 'amount', 'paid', 'dueDate', 'status']) as any;

export const toEvent = (d: Doc) =>
  pick(d, ['id', 'title', 'date', 'type', 'description', 'emoji']) as any;

export const toLeaveRequest = (d: Doc) => ({
  id: d.id,
  studentId: d.studentId,
  studentName: d.studentName,
  className: d.className,
  parentName: d.parentName,
  fromDate: d.fromDate,
  toDate: d.toDate,
  reason: d.reason,
  status: d.status,
  ...(d.decidedBy ? { decidedBy: d.decidedBy } : {}),
  ...(d.decidedAtRaw ? { decidedAt: fmtDateTime(d.decidedAtRaw) } : {}),
  createdAt: d.createdAtRaw ? fmtDate(d.createdAtRaw) : d.createdAt,
}) as any;