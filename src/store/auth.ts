import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { DEMO_PASSWORD, DEMO_USERS } from '@/constants/mock';
import { Role, User } from '@/constants/types';
import { API_BASE_URL } from '@/services/config';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; error?: string; role?: Role }>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

const STORAGE_KEY = 'sikshasagar.auth';

async function post<T>(path: string, body: unknown): Promise<{ ok: boolean; data?: T; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => null);
    if (!json) return { ok: false, error: 'Server returned an invalid response.' };
    return json;
  } catch {
    return { ok: false, error: 'Could not reach the server. Start it with npm run dev in server/.' };
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      isLoading: true,

      hydrate: async () => {
        const { token, user } = useAuthStore.getState();
        if (!token || !user) {
          set({ isLoading: false });
          return;
        }
        // A stale API host must never leave the app behind the splash screen.
        // Keep the cached session usable while validation runs in the background.
        set({ isLoading: false });

        // Validate the stored session against the live API.
        try {
          const res = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const json = await res.json().catch(() => null);
          if (json?.ok && json.data) set({ user: json.data as User });
        } catch {
          // Offline — keep the cached session.
        }
      },

      login: async (email, password) => {
        const res = await post<{ token: string; user: User }>('/auth/login', {
          email,
          password,
        });
        if (!res.ok || !res.data) {
          // Keep the published demo usable before its optional backend seed has
          // been run. This only accepts the three credentials displayed on the
          // login screen; it never grants access to a real API account.
          const demoUser = DEMO_USERS.find(
            user => user.email.toLowerCase() === email.trim().toLowerCase(),
          );
          if (demoUser && password === DEMO_PASSWORD) {
            set({ user: demoUser, token: null });
            return { ok: true, role: demoUser.role };
          }
          return {
            ok: false,
            error: res.error ?? 'Invalid credentials. Try one of the demo accounts below.',
          };
        }
        set({ user: res.data.user, token: res.data.token });
        return { ok: true, role: res.data.user.role };
      },

      logout: async () => {
        set({ user: null, token: null });
        await AsyncStorage.removeItem(STORAGE_KEY);
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: s => ({ user: s.user, token: s.token }),
    },
  ),
);

export { DEMO_PASSWORD };

export function useRole(): Role | null {
  return useAuthStore(s => s.user?.role ?? null);
}
