import { useSyncExternalStore } from "react";

function subscribeToSecondTick(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}

/** Current time to the second; null during SSR so markup hydrates cleanly. */
export function useNow() {
  return useSyncExternalStore(
    subscribeToSecondTick,
    () => Math.floor(Date.now() / 1000) * 1000,
    () => null,
  );
}

/** True once `startIso` has passed. Stays false during SSR: pages are prebuilt. */
export function useHasStarted(startIso: string) {
  const now = useNow();
  return now !== null && now >= Date.parse(startIso);
}
