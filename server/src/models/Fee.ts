import { Schema, model } from 'mongoose';

export interface IFee {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  amount: number;
  paid: number;
  dueDate: string;
  status: 'paid' | 'partial' | 'due';
  dueDateRaw: Date;
}

const feeSchema = new Schema<IFee>(
  {
    id: { type: String, required: true, unique: true },
    studentId: { type: String, required: true, index: true },
    studentName: { type: String, default: '' },
    className: { type: String, default: '' },
    amount: { type: Number, required: true },
    paid: { type: Number, default: 0 },
    dueDate: { type: String, default: '' },
    status: { type: String, enum: ['paid', 'partial', 'due'], default: 'due' },
    dueDateRaw: { type: Date, default: undefined },
  },
  { timestamps: true },
);

export const Fee = model<IFee>('Fee', feeSchema);