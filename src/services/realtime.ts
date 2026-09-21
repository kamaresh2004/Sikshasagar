/**
 * Realtime hub (client side).
 *
 * Connects to the Socket.IO server using the JWT from the auth store, joins
 * `user:<id>` (automatic server-side) and any class rooms the user belongs to,
 * then routes `realtime:*` and `notification` events into the app's stores so
 * screens update instantly (attendance saved, leave decided, gallery approved,
 * new announcements).
 */

import { io, type Socket } from 'socket.io-client';

import { SOCKET_URL } from '@/services/config';
import { useAuthStore } from '@/store/auth';
import { useLeaveStore } from '@/store/leave';
import { useNotificationsStore } from '@/store/notifications';
import { LeaveRequest, NotificationItem } from '@/constants/types';

let socket: Socket | null = null;

function joinUserRooms() {
  const user = useAuthStore.getState().user;
  if (user?.className) socket?.emit('subscribe:class', user.className);
}

export function connectRealtime() {
  const token = useAuthStore.getState().token;
  if (!token || socket) return;

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1500,
  });

  socket.on('connect', () => {
    joinUserRooms();
  });

  socket.on('connect_error', () => {
    // Server not reachable yet — the client will keep trying; UI stays usable
    // with the last fetched snapshot.
  });

  // In-app notification feed.
  socket.on('notification', (item: NotificationItem) => {
    useNotificationsStore.getState().receiveLive(item);
  });

  // Leave decided / new request -> keep the leave list in sync.
  socket.on('realtime:leave', (request: LeaveRequest) => {
    useLeaveStore.getState().receiveLive(request);
  });
}

export function disconnectRealtime() {
  if (!socket) return;
  socket.disconnect();
  socket = null;
}

/** Called after login/hydrate to start the live feed. */
export function wireRealtime() {
  connectRealtime();
}

/** Called on logout to drop the socket. */
export function unwireRealtime() {
  disconnectRealtime();
}

/** Actively watch a class room (teachers + management). */
export function subscribeClass(className: string) {
  socket?.emit('subscribe:class', className);
}