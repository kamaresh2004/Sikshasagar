import { Schema, model } from 'mongoose';

export interface IActivity {
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

const activitySchema = new Schema<IActivity>(
  {
    id: { type: String, required: true, unique: true },
    classId: { type: String, required: true, index: true },
    className: { type: String, default: '' },
    date: { type: String, default: '' },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    mediaIds: { type: [String], default: [] },
    emoji: { type: String, default: '🎨' },
    createdBy: { type: String, default: '' },
    color: { type: String, default: '#0E7490' },
  },
  { timestamps: true },
);

export const Activity = model<IActivity>('Activity', activitySchema);