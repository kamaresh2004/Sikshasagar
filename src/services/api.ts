/**
 * API client — mirror of the backend REST API (see section 6 of the spec).
 * Backed by live fetch calls to the Express/Mongo server (see server/).
 * Every function keeps the same signature the screens already use.
 */

import { useAuthStore } from '@/store/auth';
import { askSagar } from '@/services/assistant';
import { NotificationItem, LeaveRequest } from '@/constants/types';
import { API_BASE_URL } from '@/services/config';

export { API_BASE_URL };

export interface ApiResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<ApiResult<T>> {
  const token = useAuthStore.getState().token;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
    const json = await res.json().catch(() => null);
    if (!json || json.ok === false) {
      return { ok: false, error: json?.error ?? `Request failed (${res.status})` };
    }
    return { ok: true, data: json.data as T };
  } catch {
    return { ok: false, error: 'Could not reach the server. Start it with npm run dev in server/.' };
  }
}

export const api = {
  // Auth
  login: async (email: string, password: string) => useAuthStore.getState().login(email, password),
  resetPassword: async (email: string) => {
    const res = await request<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    return {
      ok: res.ok,
      message: res.data?.message ?? res.error ?? `If an account exists for ${email}, a reset link has been sent.`,
    };
  },

  // Students
  listStudents: () => request('/students'),
  createStudent: (payload: unknown) =>
    request('/students', { method: 'POST', body: JSON.stringify(payload) }),
  getStudent: (id: string) => request(`/students/${id}`),

  // Classes
  listClasses: () => request('/classes'),

  // Attendance
  getAttendance: (date: string) => request(`/attendance?date=${encodeURIComponent(date)}`),
  markAttendance: (records: unknown) =>
    request('/attendance/mark', { method: 'POST', body: JSON.stringify(records) }),

  // Performance
  getPerformance: (studentId: string) => request(`/performance?studentId=${encodeURIComponent(studentId)}`),
  addPerformance: (note: unknown) =>
    request('/performance', { method: 'POST', body: JSON.stringify(note) }),

  // Activities
  listActivities: (classId?: string) =>
    request(`/activities${classId ? `?classId=${encodeURIComponent(classId)}` : ''}`),
  createActivity: (activity: unknown) =>
    request('/activities', { method: 'POST', body: JSON.stringify(activity) }),

  // Homework
  listHomework: (classId?: string) =>
    request(`/homework${classId ? `?classId=${encodeURIComponent(classId)}` : ''}`),

  // Gallery
  listGallery: (classId?: string) =>
    request(`/gallery${classId ? `?classId=${encodeURIComponent(classId)}` : ''}`),
  listPendingGallery: () => request('/gallery/pending'),
  approveGallery: (id: string) => request(`/gallery/${id}/approve`, { method: 'POST' }),
  uploadPhotos: (payload: unknown) =>
    request('/gallery/upload', { method: 'POST', body: JSON.stringify(payload) }),

  // Announcements
  listAnnouncements: () => request('/announcements'),
  createAnnouncement: (announcement: unknown) =>
    request('/announcements', { method: 'POST', body: JSON.stringify(announcement) }),

  // Notifications
  listNotifications: () => request<NotificationItem[]>('/notifications'),
  markRead: (id: string) => request(`/notifications/${id}/read`, { method: 'PATCH' }),
  markAllRead: () => request('/notifications/read-all', { method: 'PATCH' }),
  registerPushToken: (token: string) =>
    request('/notifications/push-token', { method: 'POST', body: JSON.stringify({ token }) }),

  // Enquiries
  listEnquiries: () => request('/enquiries'),
  createEnquiry: (enquiry: unknown) =>
    request('/enquiries', { method: 'POST', body: JSON.stringify(enquiry) }),

  // Fees
  listFees: () => request('/fees'),

  // Events
  listEvents: () => request('/events'),

  // Leave
  listLeave: () => request<LeaveRequest[]>('/leave'),
  requestLeave: (payload: unknown) => request('/leave', { method: 'POST', body: JSON.stringify(payload) }),
  decideLeave: (id: string, action: 'approve' | 'decline') =>
    request(`/leave/${id}/${action}`, { method: 'POST' }),

  // AI
  askChatbot: async (question: string) => {
    const res = await request<{ answer: string }>('/ai/chatbot', {
      method: 'POST',
      body: JSON.stringify({ question }),
    });
    if (res.ok) return { ok: true, data: res.data };
    return { ok: true, data: { answer: askSagar(question) } };
  },
};
