import Constants from 'expo-constants';

/**
 * Resolve where the API server lives.
 *
 * In development the API runs on the same machine as Expo, so we read the
 * host from Expo's dev server URI (e.g. `192.168.1.5:8081`) and point the
 * API at the same host on the server port. This works whether you scan the
 * QR with Expo Go on the same phone/emulator or an external device.
 */
const API_PORT = 4000;
const productionApiUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');

export function resolveApiBaseUrl(): string {
  // Expo replaces EXPO_PUBLIC_* variables at web-build time. Render supplies
  // this value for the hosted frontend so browsers never try localhost.
  if (productionApiUrl) {
    return productionApiUrl.endsWith('/api') ? productionApiUrl : `${productionApiUrl}/api`;
  }

  try {
    const host = Constants.expoConfig?.hostUri ?? null;
    if (host) {
      const hostname = host.split(':')[0];
      return `http://${hostname}:${API_PORT}/api`;
    }
  } catch {
    // fall through to localhost
  }
  return `http://localhost:${API_PORT}/api`;
}

export const API_BASE_URL = resolveApiBaseUrl();

/** Base host (no /api suffix) — used by the realtime socket. */
export const SOCKET_URL = API_BASE_URL.replace(/\/api$/, '');
