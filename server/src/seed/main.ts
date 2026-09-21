import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import { connectDb } from '../lib/db.js';
import {
  User, Student, ClassModel, Attendance, Activity, Homework, Performance,
  Gallery, Announcement, Notification, Enquiry, Fee, Event, LeaveRequest,
} from '../models/index.js';
import {
  demoUsers, demoClasses, demoStudents, demoAttendance, demoActivities,
  demoHomework, demoPerformance, demoGallery, demoAnnouncements,
  demoNotifications, demoEnquiries, demoFees, demoEvents, demoLeaveRequests,
  DEMO_PASSWORD,
} from './data.js';

async function wipe() {
  const names = [
    User, Student, ClassModel, Attendance, Activity, Homework, Performance,
    Gallery, Announcement, Notification, Enquiry, Fee, Event, LeaveRequest,
  ].map((m) => m.collection.name);
  await Promise.all(names.map((n) => mongoose.connection.collection(n).deleteMany({})));
  console.log('[seed] wiped existing data');
}

export async function seed() {
  await connectDb();
  await wipe();

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  await User.insertMany(demoUsers.map((u) => ({ ...u, passwordHash, pushTokens: [] })));
  await ClassModel.insertMany(demoClasses);
  await Student.insertMany(demoStudents);
  await Attendance.insertMany(demoAttendance);
  await Activity.insertMany(demoActivities);
  await Homework.insertMany(demoHomework);
  await Performance.insertMany(demoPerformance);
  await Gallery.insertMany(demoGallery);
  await Announcement.insertMany(demoAnnouncements);
  await Notification.insertMany(demoNotifications);
  await Enquiry.insertMany(demoEnquiries);
  await Fee.insertMany(demoFees);
  await Event.insertMany(demoEvents);
  await LeaveRequest.insertMany(demoLeaveRequests.map((l) => ({
    ...l,
    decidedBy: l.decidedBy,
    decidedAtRaw: l.decidedAtRaw,
    createdAtRaw: l.createdAtRaw,
  })));

  console.log('[seed] done — demo users + data loaded');
  console.log('        parent: parent@sikshasagar.in / demo1234');
  console.log('        teacher: teacher@sikshasagar.in / demo1234');
  console.log('        management: management@sikshasagar.in / demo1234');
}