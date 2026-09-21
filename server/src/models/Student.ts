import { Schema, model } from 'mongoose';

export interface IStudent {
  id: string;
  name: string;
  className: string;
  classId: string;
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

const studentSchema = new Schema<IStudent>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    className: { type: String, required: true },
    classId: { type: String, required: true },
    age: { type: Number, default: 0 },
    dob: { type: String, default: '' },
    admissionDate: { type: String, default: '' },
    bloodGroup: { type: String, default: '' },
    guardian: { type: String, default: '' },
    guardianPhone: { type: String, default: '' },
    address: { type: String, default: '' },
    parentIds: { type: [String], default: [] },
    teacherId: { type: String, default: '' },
    emoji: { type: String, default: '🧒' },
    avatarColor: { type: String, default: '#0E7490' },
  },
  { timestamps: true },
);

export const Student = model<IStudent>('Student', studentSchema);