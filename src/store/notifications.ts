import { create } from 'zustand';

import { NOTIFICATIONS } from '@/constants/mock';
import { NotificationItem } from '@/constants/types';

interface NotificationsState {
  items: NotificationItem[];
  unreadCount: number;
  add: (title: string, message: string, type: NotificationItem['type']) => void;
  markAllRead: () => void;
  toggleRead: (id: string) => void;
  setItems: (items: NotificationItem[]) => void;
  receiveLive: (item: NotificationItem) => void;
}

function nowStamp() {
  return new Date().toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  items: NOTIFICATIONS,
  unreadCount: NOTIFICATIONS.filter((n) => !n.read).length,
  add: (title, message, type) =>
    set((state) => {
      const item: NotificationItem = {
        id: `not-${Date.now()}`,
        userId: 'u-parent-1',
        type,
        title,
        message,
        read: false,
        createdAt: nowStamp(),
        emoji: '🔔',
      };
      return { items: [item, ...state.items], unreadCount: state.unreadCount + 1 };
    }),
  markAllRead: () =>
    set((state) => ({ items: state.items.map((n) => ({ ...n, read: true })), unreadCount: 0 })),
  toggleRead: (id) =>
    set((state) => {
      const items = state.items.map((n) => (n.id === id ? { ...n, read: !n.read } : n));
      return { items, unreadCount: items.filter((n) => !n.read).length };
    }),
  setItems: (items) =>
    set({ items, unreadCount: items.filter((n) => !n.read).length }),
  receiveLive: (item) =>
    set((state) => {
      if (state.items.some((n) => n.id === item.id)) return state;
      return { items: [item, ...state.items], unreadCount: state.unreadCount + (item.read ? 0 : 1) };
    }),
}));