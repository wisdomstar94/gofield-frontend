import { useCallback, useEffect, useRef } from "react";

const useSetInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(callback);
  const savedDelay = useRef(delay);
  const id = useRef(0);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    savedDelay.current = delay;
  }, [delay]);

  function start() {
    clearInterval(id.current);

    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      id.current = window.setInterval(tick, savedDelay.current);
      return () => clearInterval(id.current);
    }
  }

  function stop() {
    clearInterval(id.current); 
  }

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return {
    start,
    stop,
  };
};

export default useSetInterval;