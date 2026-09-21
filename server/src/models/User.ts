import { Schema, model } from 'mongoose';

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'management' | 'teacher' | 'parent';
  passwordHash: string;
  avatarColor?: string;
  linkedStudentIds: string[];
  className?: string;
  pushTokens: string[];
}

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true },
    phone: { type: String, default: '' },
    role: { type: String, enum: ['management', 'teacher', 'parent'], required: true },
    passwordHash: { type: String, required: true },
    avatarColor: { type: String, default: '#0E7490' },
    linkedStudentIds: { type: [String], default: [] },
    className: { type: String, default: undefined },
    pushTokens: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', userSchema);