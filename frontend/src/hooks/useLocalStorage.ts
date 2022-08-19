import { useEffect, useState } from 'react';

type UseLocalStorage<T> = [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>];

function useLocalStorage<T>(key: string): UseLocalStorage<T> {
  const [value, setValue] = useState<T | undefined>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return undefined;
    } catch (error) {
      return undefined;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
