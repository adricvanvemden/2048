import useThrottle from '@/utils/hooks/useThrottle';
import { SwipeInput } from '@/types/types';
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';

type MobileSwiperProps = PropsWithChildren<{ onSwipe: (_: SwipeInput) => void }>;

export default function MobileSwiper({ children, onSwipe }: MobileSwiperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleTouchStart = useThrottle(
    useCallback((event: TouchEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        return;
      }

      event.preventDefault();
      setStartX(event.touches[0].clientX);
      setStartY(event.touches[0].clientY);
    }, []),
    100,
  );

  const handleTouchEnd = useThrottle(
    useCallback(
      (event: TouchEvent) => {
        if (!wrapperRef.current?.contains(event.target as Node)) {
          return;
        }

        event.preventDefault();

        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        onSwipe({ deltaX, deltaY });

        setStartX(0);
        setStartY(0);
      },
      [onSwipe, startX, startY],
    ),
    100,
  );

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchEnd, handleTouchStart]);

  return <div ref={wrapperRef}>{children}</div>;
}
