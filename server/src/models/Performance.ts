import { Schema, model } from 'mongoose';

export interface IPerformance {
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

const performanceSchema = new Schema<IPerformance>(
  {
    id: { type: String, required: true, unique: true },
    studentId: { type: String, required: true, index: true },
    studentName: { type: String, default: '' },
    teacherId: { type: String, default: '' },
    category: { type: String, enum: ['Milestone', 'Behavior', 'Academic', 'Social'], required: true },
    note: { type: String, default: '' },
    date: { type: String, default: '' },
    rating: { type: Number, default: 1, min: 1, max: 5 },
    emoji: { type: String, default: '⭐' },
  },
  { timestamps: true },
);

export const Performance = model<IPerformance>('Performance', performanceSchema);