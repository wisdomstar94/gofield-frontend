import { useCallback, useEffect, useRef } from "react";

const useDebounceEffect = (func: () => void, delay: number, deps: any[]) => {
  const callback = useCallback(func, [func]);

  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay]);
};

export default useDebounceEffect;