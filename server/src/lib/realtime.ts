import { Server as SocketServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import type { Server } from 'http';

import { JWT_SECRET } from './config.js';
import { User } from '../models/User.js';

/**
 * Realtime hub.
 *
 * Every authenticated client joins `user:<userId>`. Any event that a UI should
 * update instantly (attendance saved, leave decided, gallery approved, new
 * announcement) is emitted to the owning user(s) via these helpers.
 */
let io: SocketServer | null = null;

export function initRealtime(httpServer: Server): SocketServer {
  io = new SocketServer(httpServer, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token as string | undefined;
    if (!token) return next(new Error('Unauthorized'));
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
      socket.data.userId = decoded.id;
      socket.data.role = decoded.role;
      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  });

  io.on('connection', async (socket) => {
    const userId = socket.data.userId as string;
    await socket.join(`user:${userId}`);

    // Real-time sync contract: teachers/managers publish an "event" any time a
    // mutation happens; parents poll by simply re-fetching on this signal.
    socket.on('subscribe:class', (className: string) => socket.join(`class:${className}`));
    socket.on('leave:class', (className: string) => socket.leave(`class:${className}`));

    socket.on('disconnect', () => {
      // rooms auto-clean on disconnect
    });
  });

  return io;
}

export function getIo(): SocketServer | null {
  return io;
}

/** Emit to a user's room (and to class room when relevant). */
export function emitToUser(userId: string, event: string, payload: Record<string, unknown>) {
  io?.to(`user:${userId}`).emit(event, payload);
}

export function emitToClass(className: string, event: string, payload: Record<string, unknown>) {
  io?.to(`class:${className}`).emit(event, payload);
}

export function emitToAll(event: string, payload: Record<string, unknown>) {
  io?.emit(event, payload);
}

/** Persist a notification + emit it to the target user live. */
export async function pushNotification(input: {
  userId: string;
  type: string;
  title: string;
  message: string;
  emoji?: string;
  email?: string;
}): Promise<void> {
  const { Notification } = await import('../models/Notification.js');
  const doc = await Notification.create({
    id: `not-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    userId: input.userId,
    type: input.type,
    title: input.title,
    message: input.message,
    read: false,
    createdAt: new Date(),
    emoji: input.emoji ?? '🔔',
  });
  emitToUser(input.userId, 'notification', {
    id: doc.id,
    userId: doc.userId,
    type: doc.type,
    title: doc.title,
    message: doc.message,
    read: doc.read,
    createdAt: doc.createdAt,
    emoji: doc.emoji,
  });
}

/** Send an Expo push to a user's registered device tokens (best effort). */
export async function sendPush(input: {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
}): Promise<void> {
  const user = await User.findOne({ id: input.userId }).lean();
  const tokens = user?.pushTokens ?? [];
  if (!tokens.length) return;
  const payload = {
    to: tokens,
    title: input.title,
    body: input.body,
    sound: 'default',
    data: { screen: 'Notifications', ...input.data },
  };
  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // best effort — token registration is optional
  }
}