import { Schema, model } from 'mongoose';

export interface IEvent {
  id: string;
  title: string;
  date: string;
  type: 'holiday' | 'event' | 'celebration';
  description: string;
  emoji: string;
}

const eventSchema = new Schema<IEvent>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    date: { type: String, default: '' },
    type: { type: String, enum: ['holiday', 'event', 'celebration'], default: 'event' },
    description: { type: String, default: '' },
    emoji: { type: String, default: '📅' },
  },
  { timestamps: true },
);

export const Event = model<IEvent>('Event', eventSchema);