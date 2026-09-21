/** Server-side mirror of the app's data shapes (src/constants/types.ts).
 *  Dates are stored as ISO in Mongo and serialized to the app's "07 Aug 2026"
 *  format by the formatter helpers. */

export type Role = 'management' | 'teacher' | 'parent';

export type AttStatusKey = 'PRESENT' | 'ABSENT' | 'LEAVE';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatarColor?: string;
  linkedStudentIds?: string[];
  className?: string;
}

export interface Student {
  id: string;
  name: string;
  className: string;
  age: number;
  dob: string;
  admissionDate: string;
  bloodGroup: string;
  guardian: string;
  guardianPhone: string;
  address: string;
  parentIds: string[];
  teacherId: string;
  emoji: string;
  avatarColor: string;
}

export interface ClassInfo {
  id: string;
  name: string;
  section: string;
  teacherId: string;
  teacherName: string;
  studentCount: number;
  academicYear: string;
  emoji: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  date: string;
  status: AttStatusKey;
  time?: string;
}

export interface ActivityItem {
  id: string;
  classId: string;
  className: string;
  date: string;
  title: string;
  description: string;
  mediaIds: string[];
  emoji: string;
  createdBy: string;
  color: string;
}

export interface HomeworkItem {
  id: string;
  classId: string;
  className: string;
  date: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  attachments: number;
  emoji: string;
}

export interface PerformanceNote {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  category: 'Milestone' | 'Behavior' | 'Academic' | 'Social';
  note: string;
  date: string;
  rating: number;
  emoji: string;
}

export interface GalleryItem {
  id: string;
  mediaUrl: string;
  classId: string;
  className: string;
  date: string;
  uploadedBy: string;
  status: 'pending' | 'approved';
  aiTags: string[];
  caption: string;
  emoji: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: string;
  createdBy: string;
  date: string;
  priority: 'normal' | 'important';
  pinned: boolean;
  emoji: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type:
    | 'attendance'
    | 'activity'
    | 'gallery'
    | 'announcement'
    | 'event'
    | 'performance'
    | 'fee'
    | 'homework'
    | 'leave';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  emoji: string;
}

export interface Enquiry {
  id: string;
  name: string;
  contact: string;
  program: string;
  message: string;
  aiDraftReply: string;
  status: 'new' | 'followup' | 'closed';
  date: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  amount: number;
  paid: number;
  dueDate: string;
  status: 'paid' | 'partial' | 'due';
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  type: 'holiday' | 'event' | 'celebration';
  description: string;
  emoji: string;
}

export type LeaveStatus = 'pending' | 'approved' | 'declined';

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  parentName: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: LeaveStatus;
  decidedBy?: string;
  decidedAt?: string;
  createdAt: string;
}

/** Shape of the envelope the REST API returns. */
export interface ApiResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}
