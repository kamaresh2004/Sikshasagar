import { useEffect, useState } from 'react';

/**
 * Simulates a short data-load before revealing real content, so skeleton
 * placeholders have something to bridge. Swap for a real "fetching" flag
 * when a backend is connected.
 */
export function useDelayedReady(ms = 600): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), ms);
    return () => clearTimeout(t);
  }, [ms]);

  return ready;
}