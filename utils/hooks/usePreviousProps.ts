import { useEffect, useRef } from 'react';

export default function usePreviousProps<T>(props: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = props;
  });

  return ref.current;
}
