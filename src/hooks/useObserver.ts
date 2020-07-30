import { useRef, useCallback } from 'react';

export const useObserver = (isLoading: boolean, func: () => void) => {
  const observer = useRef<HTMLDivElement>();

  const lastElement = useCallback(
    (user) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          func();
        }
      });
      if (user) observer.current.observe(user);
    },
    [isLoading, func],
  );

  return { lastElement };
};