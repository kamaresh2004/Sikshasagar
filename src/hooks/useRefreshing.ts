import { useCallback, useState } from 'react';

/**
 * Pull-to-refresh state that spins a branded spinner for `duration` ms.
 * Replace `setTimeout` with a real fetch when the backend is connected.
 */
export function useRefreshing(duration = 900) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    if (refreshing) return;
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), duration);
  }, [refreshing, duration]);

  return { refreshing, onRefresh };
}