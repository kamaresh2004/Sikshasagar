/** Demo data — mirrors the app's src/constants/mock.ts so the live backend
 *  starts with the same content the mock UI had. Passwords are hashed here. */

export const DEMO_PASSWORD = 'demo1234';

export const demoUsers = [
  {
    id: 'u-mgmt-1', name: 'Ramesh Patil', email: 'management@sikshasagar.in', phone: '+91 98200 11223',
    role: 'management', avatarColor: '#0E7490', linkedStudentIds: [], className: undefined,
  },
  {
    id: 'u-teach-1', name: 'Ms. Priya Sharma', email: 'teacher@sikshasagar.in', phone: '+91 98765 43210',
    role: 'teacher', avatarColor: '#FF7A59', linkedStudentIds: [], className: 'Nursery A',
  },
  {
    id: 'u-teach-2', name: 'Ms. Sunita', email: 'sunita@sikshasagar.in', phone: '+91 90000 00001',
    role: 'teacher', avatarColor: '#16A34A', linkedStudentIds: [], className: 'Playgroup A',
  },
  {
    id: 'u-teach-3', name: 'Ms. Kavita', email: 'kavita@sikshasagar.in', phone: '+91 90000 00002',
    role: 'teacher', avatarColor: '#7C3AED', linkedStudentIds: [], className: 'LKG A',
  },
  {
    id: 'u-teach-4', name: 'Mr. Anand', email: 'anand@sikshasagar.in', phone: '+91 90000 00003',
    role: 'teacher', avatarColor: '#DB2777', linkedStudentIds: [], className: 'UKG A',
  },
  {
    id: 'u-parent-1', name: 'Mrs. Anita Verma', email: 'parent@sikshasagar.in', phone: '+91 99887 76655',
    role: 'parent', avatarColor: '#16A34A', linkedStudentIds: ['s-1', 's-2'], className: undefined,
  },
];

export const demoClasses = [
  { id: 'c-1', name: 'Playgroup', section: 'A', teacherId: 'u-teach-2', teacherName: 'Ms. Sunita', studentCount: 18, academicYear: '2026-27', emoji: '🐣' },
  { id: 'c-2', name: 'Nursery', section: 'A', teacherId: 'u-teach-1', teacherName: 'Ms. Priya', studentCount: 22, academicYear: '2026-27', emoji: '🦋' },
  { id: 'c-3', name: 'LKG', section: 'A', teacherId: 'u-teach-3', teacherName: 'Ms. Kavita', studentCount: 20, academicYear: '2026-27', emoji: '🌱' },
  { id: 'c-4', name: 'UKG', section: 'A', teacherId: 'u-teach-4', teacherName: 'Mr. Anand', studentCount: 21, academicYear: '2026-27', emoji: '🌻' },
];

export const demoStudents = [
  { id: 's-1', name: 'Aarav Verma', className: 'Nursery A', classId: 'c-2', age: 3, dob: '12 May 2023', admissionDate: 'Jun 2025', bloodGroup: 'B+', guardian: 'Mrs. Anita Verma', guardianPhone: '+91 99887 76655', address: '22, Lake View Colony, Pune', parentIds: ['u-parent-1'], teacherId: 'u-teach-1', emoji: '👦', avatarColor: '#0E7490' },
  { id: 's-2', name: 'Myra Verma', className: 'Playgroup A', classId: 'c-1', age: 2, dob: '03 Nov 2023', admissionDate: 'Jun 2025', bloodGroup: 'O+', guardian: 'Mrs. Anita Verma', guardianPhone: '+91 99887 76655', address: '22, Lake View Colony, Pune', parentIds: ['u-parent-1'], teacherId: 'u-teach-2', emoji: '👧', avatarColor: '#FF7A59' },
  { id: 's-3', name: 'Reyansh Iyer', className: 'Nursery A', classId: 'c-2', age: 3, dob: '21 Jan 2023', admissionDate: 'Mar 2025', bloodGroup: 'A+', guardian: 'Mr. Rohan Iyer', guardianPhone: '+91 90040 12345', address: '8, Green Park, Pune', parentIds: [], teacherId: 'u-teach-1', emoji: '👦', avatarColor: '#7C3AED' },
  { id: 's-4', name: 'Anaya Joshi', className: 'Nursery A', classId: 'c-2', age: 3, dob: '17 Aug 2022', admissionDate: 'Apr 2025', bloodGroup: 'AB+', guardian: 'Mrs. Sneha Joshi', guardianPhone: '+91 91112 22334', address: '44, Hill Road, Pune', parentIds: [], teacherId: 'u-teach-1', emoji: '👧', avatarColor: '#DB2777' },
  { id: 's-5', name: 'Ishaan Rao', className: 'LKG A', classId: 'c-3', age: 4, dob: '09 Sep 2022', admissionDate: 'Apr 2025', bloodGroup: 'B+', guardian: 'Mr. Varun Rao', guardianPhone: '+91 92220 10101', address: '5, MG Road, Pune', parentIds: [], teacherId: 'u-teach-3', emoji: '👦', avatarColor: '#0891B2' },
  { id: 's-6', name: 'Diya Kulkarni', className: 'UKG A', classId: 'c-4', age: 5, dob: '14 Dec 2021', admissionDate: 'Jun 2024', bloodGroup: 'O-', guardian: 'Mr. Abhay Kulkarni', guardianPhone: '+91 93331 44556', address: '12, Shanti Nagar, Pune', parentIds: [], teacherId: 'u-teach-4', emoji: '👧', avatarColor: '#65A30D' },
];

export const demoAttendance = [
  { id: 'a-1', studentId: 's-1', studentName: 'Aarav Verma', classId: 'c-2', className: 'Nursery A', date: '07 Aug 2026', status: 'PRESENT', time: '9:05 AM' },
  { id: 'a-3', studentId: 's-3', studentName: 'Reyansh Iyer', classId: 'c-2', className: 'Nursery A', date: '07 Aug 2026', status: 'PRESENT', time: '8:55 AM' },
  { id: 'a-4', studentId: 's-4', studentName: 'Anaya Joshi', classId: 'c-2', className: 'Nursery A', date: '07 Aug 2026', status: 'ABSENT' },
  { id: 'a-5', studentId: 's-5', studentName: 'Ishaan Rao', classId: 'c-3', className: 'LKG A', date: '07 Aug 2026', status: 'LEAVE' },
  { id: 'a-6', studentId: 's-6', studentName: 'Diya Kulkarni', classId: 'c-4', className: 'UKG A', date: '07 Aug 2026', status: 'PRESENT', time: '9:00 AM' },
];

export const demoActivities = [
  { id: 'act-1', classId: 'c-2', className: 'Nursery A', date: '07 Aug 2026', title: 'Rainy Day Craft', description: 'Children made colourful paper umbrellas and painted raindrops. Great fine-motor practice!', mediaIds: ['m-1', 'm-2'], emoji: '🌧️', createdBy: 'Ms. Priya', color: '#0E7490' },
  { id: 'act-2', classId: 'c-3', className: 'LKG A', date: '06 Aug 2026', title: 'Phonics Fun', description: 'Practiced letter sounds A to E with the phonics song and picture matching activity.', mediaIds: ['m-3'], emoji: '🔤', createdBy: 'Ms. Kavita', color: '#FF7A59' },
  { id: 'act-3', classId: 'c-2', className: 'Nursery A', date: '06 Aug 2026', title: 'Story Time — The Rainbow Fish', description: 'Listened to the story and learnt about sharing. Each child drew their own shiny fish scale.', mediaIds: [], emoji: '🐟', createdBy: 'Ms. Priya', color: '#16A34A' },
  { id: 'act-4', classId: 'c-1', className: 'Playgroup A', date: '06 Aug 2026', title: 'Sensory Play', description: 'Playing with colourful blocks and water beads to explore textures and colours.', mediaIds: ['m-4'], emoji: '🧩', createdBy: 'Ms. Sunita', color: '#7C3AED' },
];

export const demoHomework = [
  { id: 'h-1', classId: 'c-2', className: 'Nursery A', date: '07 Aug 2026', subject: 'English', title: 'Letter S tracing', description: 'Trace letter S on page 12. Practice the phonics sound "sss" with a snake action.', dueDate: '10 Aug 2026', attachments: 1, emoji: '✏️', createdBy: 'Ms. Priya' },
  { id: 'h-2', classId: 'c-3', className: 'LKG A', date: '06 Aug 2026', subject: 'Maths', title: 'Numbers 1–10', description: 'Count and circle the correct number on the worksheet shared in class.', dueDate: '09 Aug 2026', attachments: 2, emoji: '🔢', createdBy: 'Ms. Kavita' },
  { id: 'h-3', classId: 'c-2', className: 'Nursery A', date: '05 Aug 2026', subject: 'General Awareness', title: 'My Body parts', description: 'Say the names of body parts and point to them. Sing the "Head, Shoulders" song at home.', dueDate: '08 Aug 2026', attachments: 0, emoji: '🖐️', createdBy: 'Ms. Priya' },
];

export const demoPerformance = [
  { id: 'p-1', studentId: 's-1', studentName: 'Aarav Verma', teacherId: 'u-teach-1', category: 'Academic', note: 'Aarav is recognising all uppercase letters now. Great improvement in pencil grip.', date: '06 Aug 2026', rating: 4, emoji: '⭐' },
  { id: 'p-2', studentId: 's-1', studentName: 'Aarav Verma', teacherId: 'u-teach-1', category: 'Milestone', note: 'First independent attempt at tying shoelaces — so proud!', date: '02 Aug 2026', rating: 5, emoji: '🎉' },
  { id: 'p-3', studentId: 's-1', studentName: 'Aarav Verma', teacherId: 'u-teach-1', category: 'Social', note: 'Has started sharing toys during free play. Kind and gentle with classmates.', date: '29 Jul 2026', rating: 4, emoji: '🤝' },
  { id: 'p-4', studentId: 's-1', studentName: 'Aarav Verma', teacherId: 'u-teach-1', category: 'Behavior', note: 'Needs gentle reminders to wait for his turn during circle time.', date: '25 Jul 2026', rating: 3, emoji: '🔔' },
];

export const demoGallery = [
  { id: 'g-1', mediaUrl: '', classId: 'c-2', className: 'Nursery A', date: '07 Aug 2026', uploadedBy: 'Ms. Priya', status: 'pending', aiTags: ['Rainy day craft', 'Nursery A', '2026-08-07'], caption: 'Rainy day umbrella craft', emoji: '🌧️' },
  { id: 'g-2', mediaUrl: '', classId: 'c-2', className: 'Nursery A', date: '07 Aug 2026', uploadedBy: 'Ms. Priya', status: 'pending', aiTags: ['Painting', 'Nursery A'], caption: 'Raining colours on paper', emoji: '🎨' },
  { id: 'g-3', mediaUrl: '', classId: 'c-2', className: 'Nursery A', date: '06 Aug 2026', uploadedBy: 'Ms. Priya', status: 'approved', aiTags: ['Story time', 'Nursery A'], caption: 'Story time with The Rainbow Fish', emoji: '🐟' },
  { id: 'g-4', mediaUrl: '', classId: 'c-3', className: 'LKG A', date: '06 Aug 2026', uploadedBy: 'Ms. Kavita', status: 'approved', aiTags: ['Phonics', 'LKG A'], caption: 'Phonics picture matching', emoji: '🔤' },
  { id: 'g-5', mediaUrl: '', classId: 'c-1', className: 'Playgroup A', date: '05 Aug 2026', uploadedBy: 'Ms. Sunita', status: 'approved', aiTags: ['Sensory play', 'Playgroup A'], caption: 'Colourful sensory bins', emoji: '🧩' },
];

export const demoAnnouncements = [
  { id: 'n-1', title: 'Independence Day Celebration', body: 'Join us on 15th August for a flag hoisting and fancy dress parade from 9:00 AM. Parents welcome!', audience: 'All Classes', createdBy: 'Management', date: '07 Aug 2026', priority: 'important', pinned: true, emoji: '🇮🇳' },
  { id: 'n-2', title: 'Parent–Teacher Meeting', body: 'PTM scheduled for 22nd August, 4 PM – 6 PM. Slots can be booked via the app.', audience: 'All Classes', createdBy: 'Management', date: '06 Aug 2026', priority: 'important', pinned: false, emoji: '🗓️' },
  { id: 'n-3', title: 'Monsoon Safety Notice', body: 'Please ensure children carry a raincoat/umbrella and a spare pair of socks every day this week.', audience: 'All Classes', createdBy: 'Management', date: '05 Aug 2026', priority: 'normal', pinned: false, emoji: '☔' },
];

export const demoNotifications = [
  { id: 'not-1', userId: 'u-parent-1', type: 'attendance', title: 'Aarav is marked present', message: 'Aarav marked present for Nursery A on 07 Aug 2026 at 9:05 AM.', read: false, createdAt: '2026-08-07T03:35:00Z', emoji: '✅' },
  { id: 'not-2', userId: 'u-parent-1', type: 'activity', title: 'New activity update', message: 'Rainy Day Craft — new photos added to Nursery A gallery.', read: false, createdAt: '2026-08-07T07:00:00Z', emoji: '🌧️' },
  { id: 'not-3', userId: 'u-parent-1', type: 'announcement', title: 'Independence Day Celebration', message: 'Flag hoisting & fancy dress on 15th August. See announcements.', read: false, createdAt: '2026-08-07T02:30:00Z', emoji: '🇮🇳' },
  { id: 'not-4', userId: 'u-parent-1', type: 'performance', title: 'New milestone for Aarav', message: 'Ms. Priya added a milestone note. Tap to view.', read: true, createdAt: '2026-08-06T10:40:00Z', emoji: '🎉' },
  { id: 'not-5', userId: 'u-parent-1', type: 'homework', title: 'Homework shared', message: 'Letter S tracing — Nursery A. Due 10 Aug.', read: true, createdAt: '2026-08-06T10:15:00Z', emoji: '✏️' },
];

export const demoEnquiries = [
  { id: 'e-1', name: 'Sneha Deshmukh', contact: '+91 91234 56780', program: 'Nursery', message: 'Hi, I want to know the admission process for Nursery 2026-27 and the annual fee structure.', aiDraftReply: 'Thank you for your interest in Siksha Sagar! Nursery admissions for 2026-27 are open. Our annual fee for Nursery is ₹45,000 (all-inclusive). Would you like to book a campus tour?', status: 'new', date: '07 Aug 2026' },
  { id: 'e-2', name: 'Rahul Malhotra', contact: '+91 99887 11223', program: 'Playgroup', message: 'Do you provide transport facility? What are the pickup areas?', aiDraftReply: 'Yes, we provide door-to-door transport with trained attendants and GPS tracking. Routes currently cover Aundh, Baner, Hinjewadi and surrounding areas.', status: 'new', date: '07 Aug 2026' },
  { id: 'e-3', name: 'Pooja Nair', contact: '+91 90010 20030', program: 'LKG', message: 'Looking for a good preschool with focus on phonics and reading readiness.', aiDraftReply: 'Wonderful choice! Our LKG program has a structured phonics-based literacy curriculum and regular progress reports.', status: 'followup', date: '06 Aug 2026' },
  { id: 'e-4', name: 'Vikram Singh', contact: '+91 92345 67890', program: 'UKG', message: 'Is there an age relaxation for admission to UKG?', aiDraftReply: 'As per guidelines, UKG admission requires the child to be at least 4.5 years old by 31 March. In exceptional cases we review applications individually.', status: 'closed', date: '05 Aug 2026' },
];

export const demoFees = [
  { id: 'f-1', studentId: 's-1', studentName: 'Aarav Verma', className: 'Nursery A', amount: 45000, paid: 45000, dueDate: '10 Apr 2026', status: 'paid', dueDateRaw: new Date('2026-04-10T00:00:00') },
  { id: 'f-2', studentId: 's-2', studentName: 'Myra Verma', className: 'Playgroup A', amount: 42000, paid: 21000, dueDate: '05 Oct 2026', status: 'partial', dueDateRaw: new Date('2026-10-05T00:00:00') },
  { id: 'f-3', studentId: 's-3', studentName: 'Reyansh Iyer', className: 'Nursery A', amount: 45000, paid: 45000, dueDate: '10 Apr 2026', status: 'paid', dueDateRaw: new Date('2026-04-10T00:00:00') },
  { id: 'f-4', studentId: 's-4', studentName: 'Anaya Joshi', className: 'Nursery A', amount: 45000, paid: 0, dueDate: '15 Aug 2026', status: 'due', dueDateRaw: new Date('2026-08-15T00:00:00') },
];

export const demoEvents = [
  { id: 'ev-1', title: 'Independence Day Celebration', date: '15 Aug 2026', type: 'event', description: 'Flag hoisting, fancy dress parade and patriotic songs.', emoji: '🇮🇳' },
  { id: 'ev-2', title: 'Janmashtami', date: '05 Sep 2026', type: 'celebration', description: 'Kids will dress up as little Krishna & Radha. Storytelling session.', emoji: '🪈' },
  { id: 'ev-3', title: 'Parent–Teacher Meeting', date: '22 Aug 2026', type: 'event', description: 'Slot-wise PTM, 4 PM – 6 PM. Book your slot in the app.', emoji: '🗓️' },
  { id: 'ev-4', title: 'Ganesh Chaturthi Holiday', date: '19 Sep 2026', type: 'holiday', description: 'School remains closed.', emoji: '🛕' },
  { id: 'ev-5', title: 'Grandparents Day', date: '12 Sep 2026', type: 'celebration', description: 'A special morning with grandparents, games and tea.', emoji: '👴' },
];

export const demoLeaveRequests = [
  {
    id: 'lv-1', studentId: 's-1', studentName: 'Aarav Verma', className: 'Nursery A', parentName: 'Mrs. Anita Verma',
    fromDate: '10 Aug 2026', toDate: '11 Aug 2026', reason: 'Family function out of town', status: 'pending',
    decidedBy: undefined, decidedAtRaw: undefined, createdAt: '07 Aug 2026', createdAtRaw: new Date('2026-08-07T00:00:00'),
  },
  {
    id: 'lv-2', studentId: 's-2', studentName: 'Myra Verma', className: 'Playgroup A', parentName: 'Mrs. Anita Verma',
    fromDate: '15 Aug 2026', toDate: '15 Aug 2026', reason: 'Travel for Independence Day weekend', status: 'approved',
    decidedBy: 'Ms. Sunita', decidedAtRaw: new Date('2026-08-08T00:00:00'), createdAt: '05 Aug 2026', createdAtRaw: new Date('2026-08-05T00:00:00'),
  },
  {
    id: 'lv-3', studentId: 's-4', studentName: 'Anaya Joshi', className: 'Nursery A', parentName: 'Mrs. Sneha Joshi',
    fromDate: '18 Aug 2026', toDate: '19 Aug 2026', reason: 'Scheduled medical check-up', status: 'declined',
    decidedBy: 'Ms. Priya', decidedAtRaw: new Date('2026-08-08T00:00:00'), createdAt: '04 Aug 2026', createdAtRaw: new Date('2026-08-04T00:00:00'),
  },
];