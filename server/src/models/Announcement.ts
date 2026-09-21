import { Schema, model } from 'mongoose';

export interface IAnnouncement {
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

const announcementSchema = new Schema<IAnnouncement>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    body: { type: String, default: '' },
    audience: { type: String, default: 'All Classes' },
    createdBy: { type: String, default: 'Management' },
    date: { type: String, default: '' },
    priority: { type: String, enum: ['normal', 'important'], default: 'normal' },
    pinned: { type: Boolean, default: false },
    emoji: { type: String, default: '📢' },
  },
  { timestamps: true },
);

export const Announcement = model<IAnnouncement>('Announcement', announcementSchema);