import { useCallback, useEffect, useState } from "react";

export function useLocalStorage <T>(key: string, initialState: T, persist = true): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!persist) return initialState;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialState;
    } catch (error) {
      console.log(error);
      return initialState;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      setStoredValue((prevValue) => {
        const valueToStore = value instanceof Function ? value(prevValue) : value;
        if (persist) {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        return valueToStore;
      });
    } catch (error) {
      console.log(error);
    }
  }, [key, persist]);

  useEffect(() => {
    if (!persist) return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, persist]);

  return [storedValue, setValue] as const;
}