import { useEffect, useRef } from 'react';

/**
 * Fires `onVisible` whenever the page transitions from hidden → visible.
 * Throttled so it fires at most once every `minInterval` ms.
 */
export function usePageVisibility(
  onVisible?: () => void,
  delay = 300,
  minInterval = 5_000,
): void {
  const callbackRef = useRef(onVisible);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastFiredRef = useRef(0);

  useEffect(() => { callbackRef.current = onVisible; }, [onVisible]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) return;
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        const now = Date.now();
        if (now - lastFiredRef.current >= minInterval) {
          lastFiredRef.current = now;
          callbackRef.current?.();
        }
      }, delay);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [delay, minInterval]);
}

/**
 * Last-resort watchdog: if `isLoading` is still `true` more than `timeoutMs`
 * after the user returns to the tab, reloads the page automatically.
 *
 * This protects against Supabase fetch stalls that survive the 10-second
 * abort timeout (e.g. the request never reached the network layer).
 */
export function useStuckLoadingRecovery(isLoading: boolean, timeoutMs = 8_000): void {
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabWasHiddenRef = useRef(false);

  // Track when the tab is hidden
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        tabWasHiddenRef.current = true;
        if (watchdogRef.current) clearTimeout(watchdogRef.current);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Arm or disarm the watchdog whenever loading state changes
  useEffect(() => {
    if (isLoading && tabWasHiddenRef.current) {
      watchdogRef.current = setTimeout(() => {
        console.warn('[useStuckLoadingRecovery] Stuck after tab return — reloading.');
        window.location.reload();
      }, timeoutMs);
    } else {
      if (watchdogRef.current) {
        clearTimeout(watchdogRef.current);
        watchdogRef.current = null;
      }
      if (!isLoading) tabWasHiddenRef.current = false;
    }

    return () => {
      if (watchdogRef.current) clearTimeout(watchdogRef.current);
    };
  }, [isLoading, timeoutMs]);
}