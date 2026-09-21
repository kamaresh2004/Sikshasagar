import { Schema, model } from 'mongoose';

export interface INotification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  emoji: string;
}

const notificationSchema = new Schema<INotification>(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true, index: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, default: '' },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now, index: true },
    emoji: { type: String, default: '🔔' },
  },
  { timestamps: true },
);

export const Notification = model<INotification>('Notification', notificationSchema);