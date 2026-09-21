import {
  ActivityItem,
  Announcement,
  AttendanceRecord,
  ClassInfo,
  Enquiry,
  EventItem,
  FeeRecord,
  GalleryItem,
  HomeworkItem,
  LeaveRequest,
  NotificationItem,
  PerformanceNote,
  Student,
  User,
} from './types';

export const DEMO_USERS: User[] = [
  {
    id: 'u-mgmt-1',
    name: 'Ramesh Patil',
    email: 'management@sikshasagar.in',
    phone: '+91 98200 11223',
    role: 'management',
    avatarColor: '#0E7490',
  },
  {
    id: 'u-teach-1',
    name: 'Ms. Priya Sharma',
    email: 'teacher@sikshasagar.in',
    phone: '+91 98765 43210',
    role: 'teacher',
    className: 'Nursery A',
    avatarColor: '#FF7A59',
  },
  {
    id: 'u-parent-1',
    name: 'Mrs. Anita Verma',
    email: 'parent@sikshasagar.in',
    phone: '+91 99887 76655',
    role: 'parent',
    linkedStudentIds: ['s-1', 's-2'],
    avatarColor: '#16A34A',
  },
];

export const DEMO_PASSWORD = 'demo1234';

export const CLASSES: ClassInfo[] = [
  { id: 'c-1', name: 'Playgroup', section: 'A', teacherId: 'u-teach-2', teacherName: 'Ms. Sunita', studentCount: 18, academicYear: '2026-27', emoji: '🐣' },
  { id: 'c-2', name: 'Nursery', section: 'A', teacherId: 'u-teach-1', teacherName: 'Ms. Priya', studentCount: 22, academicYear: '2026-27', emoji: '🦋' },
  { id: 'c-3', name: 'LKG', section: 'A', teacherId: 'u-teach-3', teacherName: 'Ms. Kavita', studentCount: 20, academicYear: '2026-27', emoji: '🌱' },
  { id: 'c-4', name: 'UKG', section: 'A', teacherId: 'u-teach-4', teacherName: 'Mr. Anand', studentCount: 21, academicYear: '2026-27', emoji: '🌻' },
];

export const STUDENTS: Student[] = [
  { id: 's-1', name: 'Aarav Verma', className: 'Nursery A', age: 3, dob: '12 May 2023', admissionDate: 'Jun 2025', bloodGroup: 'B+', guardian: 'Mrs. Anita Verma', guardianPhone: '+91 99887 76655', address: '22, Lake View Colony, Pune', parentIds: ['u-parent-1'], teacherId: 'u-teach-1', emoji: '👦', avatarColor: '#0E7490' },
  { id: 's-2', name: 'Myra Verma', className: 'Playgroup A', age: 2, dob: '03 Nov 2023', admissionDate: 'Jun 2025', bloodGroup: 'O+', guardian: 'Mrs. Anita Verma', guardianPhone: '+91 99887 76655', address: '22, Lake View Colony, Pune', parentIds: ['u-parent-1'], teacherId: 'u-teach-2', emoji: '👧', avatarColor: '#FF7A59' },
  { id: 's-3', name: 'Reyansh Iyer', className: 'Nursery A', age: 3, dob: '21 Jan 2023', admissionDate: 'Mar 2025', bloodGroup: 'A+', guardian: 'Mr. Rohan Iyer', guardianPhone: '+91 90040 12345', address: '8, Green Park, Pune', parentIds: [], teacherId: 'u-teach-1', emoji: '👦', avatarColor: '#7C3AED' },
  { id: 's-4', name: 'Anaya Joshi', className: 'Nursery A', age: 3, dob: '17 Aug 2022', admissionDate: 'Apr 2025', bloodGroup: 'AB+', guardian: 'Mrs. Sneha Joshi', guardianPhone: '+91 91112 22334', address: '44, Hill Road, Pune', parentIds: [], teacherId: 'u-teach-1', emoji: '👧', avatarColor: '#DB2777' },
  { id: 's-5', name: 'Ishaan Rao', className: 'LKG A', age: 4, dob: '09 Sep 2022', admissionDate: 'Apr 2025', bloodGroup: 'B+', guardian: 'Mr. Varun Rao', guardianPhone: '+91 92220 10101', address: '5, MG Road, Pune', parentIds: [], teacherId: 'u-teach-3', emoji: '👦', avatarColor: '#0891B2' },
  { id: 's-6', name: 'Diya Kulkarni', className: 'UKG A', age: 5, dob: '14 Dec 2021', admissionDate: 'Jun 2024', bloodGroup: 'O-', guardian: 'Mr. Abhay Kulkarni', guardianPhone: '+91 93331 44556', address: '12, Shanti Nagar, Pune', parentIds: [], teacherId: 'u-teach-4', emoji: '👧', avatarColor: '#65A30D' },
];

export const ATTENDANCE_TODAY: AttendanceRecord[] = [
  { id: 'a-1', studentId: 's-1', studentName: 'Aarav Verma', classId: 'c-2', className: 'Nursery A', date: '07 Aug 2026', status: 'PRESENT', time: '9:05 AM' },
  { id: 'a-2', studentId: 's-3', studentName: 'Reyansh Iyer', classId: 'c-2', className: 'Nursery A', date: '07 Aug 2026', status: 'PRESENT', time: '8:55 AM' },
  { id: 'a-3', studentId: 's-4', studentName: 'Anaya Joshi', classId: 'c-2', className: 'Nursery A', date: '07 Aug 2026', status: 'ABSENT' },
  { id: 'a-4', studentId: 's-5', studentName: 'Ishaan Rao', classId: 'c-3', className: 'LKG A', date: '07 Aug 2026', status: 'LEAVE' },
  { id: 'a-5', studentId: 's-6', studentName: 'Diya Kulkarni', classId: 'c-4', className: 'UKG A', date: '07 Aug 2026', status: 'PRESENT', time: '9:00 AM' },
];

export const ACTIVITIES: ActivityItem[] = [
  { id: 'act-1', classId: 'c-2', className: 'Nursery A', date: '07 Aug 2026', title: 'Rainy Day Craft', description: 'Children made colourful paper umbrellas and painted raindrops. Great fine-motor practice!', mediaIds: ['m-1', 'm-2'], emoji: '🌧️', createdBy: 'Ms. Priya', color: '#0E7490' },
  { id: 'act-2', classId: 'c-3', className: 'LKG A', date: '06 Aug 2026', title: 'Phonics Fun', description: 'Practiced letter sounds A to E with the phonics song and picture matching activity.', mediaIds: ['m-3'], emoji: '🔤', createdBy: 'Ms. Kavita', color: '#FF7A59' },
  { id: 'act-3', classId: 'c-2', className: 'Nursery A', date: '06 Aug 2026', title: 'Story Time — The Rainbow Fish', description: 'Listened to the story and learnt about sharing. Each child drew their own shiny fish scale.', mediaIds: [], emoji: '🐟', createdBy: 'Ms. Priya', color: '#16A34A' },
  { id: 'act-4', classId: 'c-1', className: 'Playgroup A', date: '06 Aug 2026', title: 'Sensory Play', description: 'Playing with colourful blocks and water beads to explore textures and colours.', mediaIds: ['m-4'], emoji: '🧩', createdBy: 'Ms. Sunita', color: '#7C3AED' },
];

export const HOMEWORK: HomeworkItem[] = [
  { id: 'h-1', classId: 'c-2', className: 'Nursery A', date: '07 Aug 2026', subject: 'English', title: 'Letter ' + 'S' + ' tracing', description: 'Trace letter S on page 12. Practice the phonics sound "sss" with a snake action.', dueDate: '10 Aug 2026', attachments: 1, emoji: '✏️' },
  { id: 'h-2', classId: 'c-3', className: 'LKG A', date: '06 Aug 2026', subject: 'Maths', title: 'Numbers 1–10', description: 'Count and circle the correct number on the worksheet shared in class.', dueDate: '09 Aug 2026', attachments: 2, emoji: '🔢' },
  { id: 'h-3', classId: 'c-2', className: 'Nursery A', date: '05 Aug 2026', subject: 'General Awareness', title: 'My Body parts', description: 'Say the names of body parts and point to them. Sing the "Head, Shoulders" song at home.', dueDate: '08 Aug 2026', attachments: 0, emoji: '🖐️' },
];

export const PERFORMANCE: PerformanceNote[] = [
  { id: 'p-1', studentId: 's-1', studentName: 'Aarav Verma', teacherId: 'u-teach-1', category: 'Academic', note: 'Aarav is recognising all uppercase letters now. Great improvement in pencil grip.', date: '06 Aug 2026', rating: 4, emoji: '⭐' },
  { id: 'p-2', studentId: 's-1', studentName: 'Aarav Verma', teacherId: 'u-teach-1', category: 'Milestone', note: 'First independent attempt at tying shoelaces — so proud!', date: '02 Aug 2026', rating: 5, emoji: '🎉' },
  { id: 'p-3', studentId: 's-1', studentName: 'Aarav Verma', teacherId: 'u-teach-1', category: 'Social', note: 'Has started sharing toys during free play. Kind and gentle with classmates.', date: '29 Jul 2026', rating: 4, emoji: '🤝' },
  { id: 'p-4', studentId: 's-1', studentName: 'Aarav Verma', teacherId: 'u-teach-1', category: 'Behavior', note: 'Needs gentle reminders to wait for his turn during circle time.', date: '25 Jul 2026', rating: 3, emoji: '🔔' },
];

export const GALLERY: GalleryItem[] = [
  { id: 'g-1', mediaUrl: '', classId: 'c-2', className: 'Nursery A', date: '07 Aug 2026', uploadedBy: 'Ms. Priya', status: 'pending', aiTags: ['Rainy day craft', 'Nursery A', '2026-08-07'], caption: 'Rainy day umbrella craft', emoji: '🌧️' },
  { id: 'g-2', mediaUrl: '', classId: 'c-2', className: 'Nursery A', date: '07 Aug 2026', uploadedBy: 'Ms. Priya', status: 'pending', aiTags: ['Painting', 'Nursery A'], caption: 'Raining colours on paper', emoji: '🎨' },
  { id: 'g-3', mediaUrl: '', classId: 'c-2', className: 'Nursery A', date: '06 Aug 2026', uploadedBy: 'Ms. Priya', status: 'approved', aiTags: ['Story time', 'Nursery A'], caption: 'Story time with The Rainbow Fish', emoji: '🐟' },
  { id: 'g-4', mediaUrl: '', classId: 'c-3', className: 'LKG A', date: '06 Aug 2026', uploadedBy: 'Ms. Kavita', status: 'approved', aiTags: ['Phonics', 'LKG A'], caption: 'Phonics picture matching', emoji: '🔤' },
  { id: 'g-5', mediaUrl: '', classId: 'c-1', className: 'Playgroup A', date: '05 Aug 2026', uploadedBy: 'Ms. Sunita', status: 'approved', aiTags: ['Sensory play', 'Playgroup A'], caption: 'Colourful sensory bins', emoji: '🧩' },
];

export const ANNOUNCEMENTS: Announcement[] = [
  { id: 'n-1', title: 'Independence Day Celebration', body: 'Join us on 15th August for a flag hoisting and fancy dress parade from 9:00 AM. Parents welcome!', audience: 'All Classes', createdBy: 'Management', date: '07 Aug 2026', priority: 'important', pinned: true, emoji: '🇮🇳' },
  { id: 'n-2', title: 'Parent–Teacher Meeting', body: 'PTM scheduled for 22nd August, 4 PM – 6 PM. Slots can be booked via the app.', audience: 'All Classes', createdBy: 'Management', date: '06 Aug 2026', priority: 'important', pinned: false, emoji: '🗓️' },
  { id: 'n-3', title: 'Monsoon Safety Notice', body: 'Please ensure children carry a raincoat/umbrella and a spare pair of socks every day this week.', audience: 'All Classes', createdBy: 'Management', date: '05 Aug 2026', priority: 'normal', pinned: false, emoji: '☔' },
];

export const NOTIFICATIONS: NotificationItem[] = [
  { id: 'not-1', userId: 'u-parent-1', type: 'attendance', title: 'Aarav is marked present', message: 'Aarav marked present for Nursery A on 07 Aug 2026 at 9:05 AM.', read: false, createdAt: '07 Aug 2026, 9:05 AM', emoji: '✅' },
  { id: 'not-2', userId: 'u-parent-1', type: 'activity', title: 'New activity update', message: 'Rainy Day Craft — new photos added to Nursery A gallery.', read: false, createdAt: '07 Aug 2026, 12:30 PM', emoji: '🌧️' },
  { id: 'not-3', userId: 'u-parent-1', type: 'announcement', title: 'Independence Day Celebration', message: 'Flag hoisting & fancy dress on 15th August. See announcements.', read: false, createdAt: '07 Aug 2026, 8:00 AM', emoji: '🇮🇳' },
  { id: 'not-4', userId: 'u-parent-1', type: 'performance', title: 'New milestone for Aarav', message: 'Ms. Priya added a milestone note. Tap to view.', read: true, createdAt: '06 Aug 2026, 4:10 PM', emoji: '🎉' },
  { id: 'not-5', userId: 'u-parent-1', type: 'homework', title: 'Homework shared', message: 'Letter S tracing — Nursery A. Due 10 Aug.', read: true, createdAt: '06 Aug 2026, 3:45 PM', emoji: '✏️' },
];

export const ENQUIRIES: Enquiry[] = [
  { id: 'e-1', name: 'Sneha Deshmukh', contact: '+91 91234 56780', program: 'Nursery', message: 'Hi, I want to know the admission process for Nursery 2026-27 and the annual fee structure.', aiDraftReply: 'Thank you for your interest in Siksha Sagar! Nursery admissions for 2026-27 are open. The admission process includes a form fill, a friendly interaction with the child, and document submission. Our annual fee for Nursery is ₹45,000 (all-inclusive, no hidden charges). Would you like to book a campus tour?', status: 'new', date: '07 Aug 2026' },
  { id: 'e-2', name: 'Rahul Malhotra', contact: '+91 99887 11223', program: 'Playgroup', message: 'Do you provide transport facility? What are the pickup areas?', aiDraftReply: 'Yes, we provide door-to-door transport with trained attendants and GPS tracking. Routes currently cover Aundh, Baner, Hinjewadi and surrounding areas. Please share your area so we can confirm a pick-up point for you.', status: 'new', date: '07 Aug 2026' },
  { id: 'e-3', name: 'Pooja Nair', contact: '+91 90010 20030', program: 'LKG', message: 'Looking for a good preschool with focus on phonics and reading readiness.', aiDraftReply: 'Wonderful choice! Our LKG program has a structured phonics-based literacy curriculum, daily reading time, and regular progress reports. We also share performance updates with parents through the app.', status: 'followup', date: '06 Aug 2026' },
  { id: 'e-4', name: 'Vikram Singh', contact: '+91 92345 67890', program: 'UKG', message: 'Is there an age relaxation for admission to UKG?', aiDraftReply: 'As per guidelines, UKG admission requires the child to be at least 4.5 years old by 31 March. In exceptional cases we review applications individually — do share your child\'s date of birth.', status: 'closed', date: '05 Aug 2026' },
];

export const FEES: FeeRecord[] = [
  { id: 'f-1', studentId: 's-1', studentName: 'Aarav Verma', className: 'Nursery A', amount: 45000, paid: 45000, dueDate: '10 Apr 2026', status: 'paid' },
  { id: 'f-2', studentId: 's-2', studentName: 'Myra Verma', className: 'Playgroup A', amount: 42000, paid: 21000, dueDate: '05 Oct 2026', status: 'partial' },
  { id: 'f-3', studentId: 's-3', studentName: 'Reyansh Iyer', className: 'Nursery A', amount: 45000, paid: 45000, dueDate: '10 Apr 2026', status: 'paid' },
  { id: 'f-4', studentId: 's-4', studentName: 'Anaya Joshi', className: 'Nursery A', amount: 45000, paid: 0, dueDate: '15 Aug 2026', status: 'due' },
];

export const LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'lv-1',
    studentId: 's-1',
    studentName: 'Aarav Verma',
    className: 'Nursery A',
    parentName: 'Mrs. Anita Verma',
    fromDate: '10 Aug 2026',
    toDate: '11 Aug 2026',
    reason: 'Family function out of town',
    status: 'pending',
    createdAt: '07 Aug 2026',
  },
  {
    id: 'lv-2',
    studentId: 's-2',
    studentName: 'Myra Verma',
    className: 'Playgroup A',
    parentName: 'Mrs. Anita Verma',
    fromDate: '15 Aug 2026',
    toDate: '15 Aug 2026',
    reason: 'Travel for Independence Day weekend',
    status: 'approved',
    decidedBy: 'Ms. Sunita',
    decidedAt: '08 Aug 2026',
    createdAt: '05 Aug 2026',
  },
  {
    id: 'lv-3',
    studentId: 's-4',
    studentName: 'Anaya Joshi',
    className: 'Nursery A',
    parentName: 'Mrs. Sneha Joshi',
    fromDate: '18 Aug 2026',
    toDate: '19 Aug 2026',
    reason: 'Scheduled medical check-up',
    status: 'declined',
    decidedBy: 'Ms. Priya',
    decidedAt: '08 Aug 2026',
    createdAt: '04 Aug 2026',
  },
];

export const EVENTS: EventItem[] = [
  { id: 'ev-1', title: 'Independence Day Celebration', date: '15 Aug 2026', type: 'event', description: 'Flag hoisting, fancy dress parade and patriotic songs.', emoji: '🇮🇳' },
  { id: 'ev-2', title: 'Janmashtami', date: '05 Sep 2026', type: 'celebration', description: 'Kids will dress up as little Krishna & Radha. Storytelling session.', emoji: '🪈' },
  { id: 'ev-3', title: 'Parent–Teacher Meeting', date: '22 Aug 2026', type: 'event', description: 'Slot-wise PTM, 4 PM – 6 PM. Book your slot in the app.', emoji: '🗓️' },
  { id: 'ev-4', title: 'Ganesh Chaturthi Holiday', date: '19 Sep 2026', type: 'holiday', description: 'School remains closed.', emoji: '🛕' },
  { id: 'ev-5', title: 'Grandparents Day', date: '12 Sep 2026', type: 'celebration', description: 'A special morning with grandparents, games and tea.', emoji: '👴' },
];

export const CHILDREN_BY_USER: Record<string, Student[]> = {
  'u-parent-1': [STUDENTS[0], STUDENTS[1]],
};

export function studentById(id: string): Student | undefined {
  return STUDENTS.find((s) => s.id === id);
}

export function classById(id: string): ClassInfo | undefined {
  return CLASSES.find((c) => c.id === id);
}

export function attendanceRate(): number {
  const present = ATTENDANCE_TODAY.filter((a) => a.status === 'PRESENT').length;
  return Math.round((present / ATTENDANCE_TODAY.length) * 100);
}
