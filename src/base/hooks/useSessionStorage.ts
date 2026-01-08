import { logger } from '@utils/logger';
import { useState } from 'react';

/**
 * React Hook for managing sessionStorage with state synchronization
 * Replacement for ahooks useSessionStorageState
 */
export function useSessionStorage<T>(
  key: string,
  initialValue?: T
): [T | undefined, (value: T | undefined) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      logger.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to sessionStorage.
  const setValue = (value: T | undefined) => {
    try {
      // Save to local state
      setStoredValue(value);
      // Save to sessionStorage
      if (typeof window !== 'undefined') {
        if (value === undefined) {
          window.sessionStorage.removeItem(key);
        } else {
          window.sessionStorage.setItem(key, JSON.stringify(value));
        }
      }
    } catch (error) {
      logger.error(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
