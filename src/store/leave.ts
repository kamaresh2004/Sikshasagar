import { create } from 'zustand';

import { LEAVE_REQUESTS } from '@/constants/mock';
import { LeaveRequest, LeaveStatus } from '@/constants/types';
import { useNotificationsStore } from '@/store/notifications';

interface LeaveState {
  requests: LeaveRequest[];
  requestLeave: (r: Omit<LeaveRequest, 'id' | 'status' | 'createdAt'>) => LeaveRequest;
  decide: (id: string, status: Extract<LeaveStatus, 'approved' | 'declined'>, decidedBy: string) => void;
  setRequests: (requests: LeaveRequest[]) => void;
  receiveLive: (req: LeaveRequest) => void;
}

function nowStamp() {
  return new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export const useLeaveStore = create<LeaveState>((set, get) => ({
  requests: LEAVE_REQUESTS,
  requestLeave: (r) => {
    const req: LeaveRequest = {
      ...r,
      id: `lv-${Date.now()}`,
      status: 'pending',
      createdAt: nowStamp(),
    };
    set((state) => ({ requests: [req, ...state.requests] }));
    return req;
  },
  decide: (id, status, decidedBy) => {
    const req = get().requests.find((r) => r.id === id);
    if (!req) return;
    set((state) => ({
      requests: state.requests.map((r) =>
        r.id === id ? { ...r, status, decidedBy, decidedAt: nowStamp() } : r,
      ),
    }));
    const verb = status === 'approved' ? 'approved' : 'declined';
    useNotificationsStore.getState().add(
      `Leave ${verb}`,
      `${req.studentName}'s leave request (${req.fromDate} – ${req.toDate}) was ${verb}.`,
      'leave',
    );
  },
  setRequests: (requests) => set({ requests }),
  receiveLive: (req) =>
    set((state) =>
      state.requests.some((r) => r.id === req.id)
        ? { requests: state.requests.map((r) => (r.id === req.id ? req : r)) }
        : { requests: [req, ...state.requests] },
    ),
}));