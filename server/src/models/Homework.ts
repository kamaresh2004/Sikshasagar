import { Schema, model } from 'mongoose';

export interface IHomework {
  id: string;
  classId: string;
  className: string;
  date: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  attachments: number;
  emoji: string;
  createdBy: string;
}

const homeworkSchema = new Schema<IHomework>(
  {
    id: { type: String, required: true, unique: true },
    classId: { type: String, required: true, index: true },
    className: { type: String, default: '' },
    date: { type: String, default: '' },
    subject: { type: String, default: '' },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    dueDate: { type: String, default: '' },
    attachments: { type: Number, default: 0 },
    emoji: { type: String, default: '📚' },
    createdBy: { type: String, default: '' },
  },
  { timestamps: true },
);

export const Homework = model<IHomework>('Homework', homeworkSchema);