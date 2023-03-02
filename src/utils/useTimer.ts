import { useState, useRef, useCallback, useEffect } from "react";

export default function useTimer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current!);
    };
  }, []);

  const start = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  }, []);

  const pause = useCallback(() => {
    setIsActive(false);
    setIsPaused(true);
    clearInterval(intervalRef.current!);
  }, []);

  const stop = useCallback(() => {
    setTime(0);
    setIsActive(false);
    setIsPaused(false);
    clearInterval(intervalRef.current!);
  }, []);

  return {
    time,
    isActive,
    isPaused,
    start,
    pause,
    stop,
  };
}
