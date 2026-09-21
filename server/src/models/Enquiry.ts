import { Schema, model } from 'mongoose';

export interface IEnquiry {
  id: string;
  name: string;
  contact: string;
  program: string;
  message: string;
  aiDraftReply: string;
  status: 'new' | 'followup' | 'closed';
  date: string;
  createdAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    contact: { type: String, default: '' },
    program: { type: String, default: '' },
    message: { type: String, default: '' },
    aiDraftReply: { type: String, default: '' },
    status: { type: String, enum: ['new', 'followup', 'closed'], default: 'new' },
    date: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Enquiry = model<IEnquiry>('Enquiry', enquirySchema);