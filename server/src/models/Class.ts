import { Schema, model } from 'mongoose';

export interface IClass {
  id: string;
  name: string;
  section: string;
  teacherId: string;
  teacherName: string;
  studentCount: number;
  academicYear: string;
  emoji: string;
}

const classSchema = new Schema<IClass>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    section: { type: String, default: 'A' },
    teacherId: { type: String, default: '' },
    teacherName: { type: String, default: '' },
    studentCount: { type: Number, default: 0 },
    academicYear: { type: String, default: '' },
    emoji: { type: String, default: '🎒' },
  },
  { timestamps: true },
);

export const ClassModel = model<IClass>('Class', classSchema);