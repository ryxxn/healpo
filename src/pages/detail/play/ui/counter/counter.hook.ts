import { useState, useRef, useCallback } from 'react';

interface UseCounter {
  time: number;
  isRunning: boolean;
  setTime: (time: number) => void;
  start: () => void;
  stop: () => void;
  reset: () => void;
  restart: () => void;
}

export const useCounter = (): UseCounter => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  }, [isRunning]);

  const stop = useCallback(() => {
    if (isRunning && timerRef.current) {
      setIsRunning(false);
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [isRunning]);

  const reset = useCallback(() => {
    stop();
    setTime(0);
  }, [stop]);

  const restart = useCallback(() => {
    reset();
    start();
  }, [reset, start]);

  return {
    time,
    setTime,
    //
    isRunning,
    start,
    stop,
    reset,
    restart,
  };
};
