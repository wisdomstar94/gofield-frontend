import { useCallback, useRef } from "react";

const useCheckDebounce = () => {
  const timer = useRef<number>(0);

  const check = useCallback((func: () => void, debounceTime: number) => {
    clearTimeout(timer.current);
    setTimeout(func, debounceTime);
  }, []);

  return {
    check,
  };
};

export default useCheckDebounce;