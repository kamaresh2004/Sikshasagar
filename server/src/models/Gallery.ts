import { Schema, model } from 'mongoose';

export interface IGallery {
  id: string;
  mediaUrl: string;
  classId: string;
  className: string;
  date: string;
  uploadedBy: string;
  status: 'pending' | 'approved';
  aiTags: string[];
  caption: string;
  emoji: string;
}

const gallerySchema = new Schema<IGallery>(
  {
    id: { type: String, required: true, unique: true },
    mediaUrl: { type: String, default: '' },
    classId: { type: String, required: true, index: true },
    className: { type: String, default: '' },
    date: { type: String, default: '' },
    uploadedBy: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'approved'], default: 'pending', index: true },
    aiTags: { type: [String], default: [] },
    caption: { type: String, default: '' },
    emoji: { type: String, default: '📷' },
  },
  { timestamps: true },
);

export const Gallery = model<IGallery>('Gallery', gallerySchema);