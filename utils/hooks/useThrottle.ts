import { useRef, useEffect } from 'react';

interface ThrottleOptions {
  trailing?: boolean;
}

function useThrottle(
  callback: (...args: any[]) => void,
  delay: number,
  options: ThrottleOptions = {},
): (...args: any[]) => void {
  const lastCall = useRef(0);
  const lastCallArgs = useRef<any[]>([]);
  const timeout = useRef<NodeJS.Timeout | undefined>();

  const { trailing = true } = options;

  useEffect(() => {
    if (trailing && timeout.current === undefined) {
      timeout.current = setTimeout(() => {
        callback.apply(null, lastCallArgs.current);
        timeout.current = undefined;
      }, delay);
    }
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [callback, delay, trailing]);

  return function (...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall.current < delay) {
      lastCallArgs.current = args;
      return;
    }
    lastCall.current = now;
    lastCallArgs.current = args;
    return callback.apply(null, args);
  };
}

export default useThrottle;
