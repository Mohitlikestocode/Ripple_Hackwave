import { useEffect, useState } from "react";

/**
 * Persist a piece of state to localStorage and rehydrate on mount.
 * Falls back to the initial value if storage is unavailable or empty.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota exceeded or storage disabled — ignore */
    }
  }, [key, value]);

  return [value, setValue];
}
