import { Schema, model } from 'mongoose';

export interface IAttendance {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LEAVE';
  time?: string;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    id: { type: String, required: true, unique: true },
    studentId: { type: String, required: true, index: true },
    studentName: { type: String, default: '' },
    classId: { type: String, default: '' },
    className: { type: String, default: '' },
    date: { type: String, required: true, index: true },
    status: { type: String, enum: ['PRESENT', 'ABSENT', 'LEAVE'], required: true },
    time: { type: String, default: undefined },
  },
  { timestamps: true },
);

// one record per student per day
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export const Attendance = model<IAttendance>('Attendance', attendanceSchema);