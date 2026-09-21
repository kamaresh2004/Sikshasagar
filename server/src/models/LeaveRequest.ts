import { Schema, model } from 'mongoose';

export interface ILeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  parentName: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'declined';
  decidedBy?: string;
  decidedAt?: string;
  decidedAtRaw?: Date;
  createdAt: string;
  createdAtRaw: Date;
}

const leaveRequestSchema = new Schema<ILeaveRequest>(
  {
    id: { type: String, required: true, unique: true },
    studentId: { type: String, required: true, index: true },
    studentName: { type: String, default: '' },
    className: { type: String, default: '', index: true },
    parentName: { type: String, default: '' },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    reason: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending', index: true },
    decidedBy: { type: String, default: undefined },
    decidedAt: { type: String, default: undefined },
    decidedAtRaw: { type: Date, default: undefined },
    createdAt: { type: String, default: '' },
    createdAtRaw: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const LeaveRequest = model<ILeaveRequest>('LeaveRequest', leaveRequestSchema);