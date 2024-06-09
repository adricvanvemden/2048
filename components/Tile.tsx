import {
  CONTAINER_WIDTH_DESKTOP,
  CONTAINER_WIDTH_DESKTOP_PREVIEW,
  CONTAINER_WIDTH_MOBILE,
  CONTAINER_WIDTH_MOBILE_PREVIEW,
  MERGE_ANIMATION_DURATION,
  TILE_COUNT_PER_DIMENSION,
} from '@/constants';
import usePreviousProps from '@/utils/hooks/usePreviousProps';
import { Tile as TileProps } from '@/types/types';
import { useEffect, useState } from 'react';
import useWindowWidth from '@/utils/hooks/useWindowWidth';

export default function Tile({ position, value, preview }: TileProps) {
  const windowWidth = useWindowWidth();
  const containerWidth =
    windowWidth >= 640
      ? preview
        ? CONTAINER_WIDTH_DESKTOP_PREVIEW
        : CONTAINER_WIDTH_DESKTOP
      : preview
      ? CONTAINER_WIDTH_MOBILE_PREVIEW
      : CONTAINER_WIDTH_MOBILE;
  const [scale, setScale] = useState(1);
  const prevValue = usePreviousProps(value);
  const hasChanged = prevValue !== value;

  const positionToPixels = (position: number) => {
    return (position / TILE_COUNT_PER_DIMENSION) * containerWidth;
  };

  useEffect(() => {
    if (hasChanged) {
      setScale(1.1);
      setTimeout(() => {
        setScale(1);
      }, MERGE_ANIMATION_DURATION);
    }
  }, [hasChanged]);

  const style = {
    left: positionToPixels(position[0]),
    top: positionToPixels(position[1]),
    transform: `scale(${scale})`,
    zIndex: value,
  };

  let tileClass = `absolute m-1 font-bold text-center rounded-[4px] bg-tile-2 text-text-primary transition-all duration-200 ease-in-out ${`tile${value}`}`;

  if (preview) {
    tileClass += ` preview size-12 text-[16px] leading-[50px] sm:size-[66px] sm:m-[4px] sm:text-2xl sm:leading-[66px]`;
  } else {
    tileClass += ` size-16 text-[32px] leading-[64px] sm:size-[100px] sm:m-2 sm:text-5xl sm:leading-[100px]`;
  }

  return (
    <div data-testid="tile" className={tileClass} style={style}>
      {value}
    </div>
  );
}
