import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../lib/config.js';
import { User } from '../models/User.js';

export interface AuthUser {
  id: string;
  userId: string;
  role: 'management' | 'teacher' | 'parent';
  name: string;
  email: string;
  className?: string;
  linkedStudentIds: string[];
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      auth?: AuthUser;
    }
  }
}

export function signToken(payload: { id: string; role: string; email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }
  const token = header.slice('Bearer '.length);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string; email: string };
    const user = await User.findOne({ id: decoded.id }).lean();
    if (!user) return res.status(401).json({ ok: false, error: 'Unauthorized' });
    req.auth = {
      id: user.id,
      userId: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      className: user.className,
      linkedStudentIds: user.linkedStudentIds,
    };
    next();
  } catch {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }
}

export function requireRole(...roles: ('management' | 'teacher' | 'parent')[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth || !roles.includes(req.auth.role)) {
      return res.status(403).json({ ok: false, error: 'Forbidden' });
    }
    next();
  };
}