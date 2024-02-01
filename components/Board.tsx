import Tile from './Tile';
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { MoveDirection, SwipeInput, Tile as TileModel } from '@/types/types';
import { GameContext } from '@/context/GameContext';
import MobileSwiper from './MobileSwiper';
import { TOTAL_CELL_COUNT } from '@/constants';

const MOVE_UP = 'move_up';
const MOVE_DOWN = 'move_down';
const MOVE_LEFT = 'move_left';
const MOVE_RIGHT = 'move_right';

type KeyActionKeys = 'ArrowUp' | 'KeyW' | 'ArrowDown' | 'KeyS' | 'ArrowLeft' | 'KeyA' | 'ArrowRight' | 'KeyD';

const keyActionMap: { [key in KeyActionKeys]?: MoveDirection } = {
  ArrowUp: MOVE_UP,
  KeyW: MOVE_UP,
  ArrowDown: MOVE_DOWN,
  KeyS: MOVE_DOWN,
  ArrowLeft: MOVE_LEFT,
  KeyA: MOVE_LEFT,
  ArrowRight: MOVE_RIGHT,
  KeyD: MOVE_RIGHT,
};

export default function Board() {
  const { getTiles, moveTiles, startGame } = useContext(GameContext);
  const initialized = useRef(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();

      const action = keyActionMap[event.code as KeyActionKeys];
      if (action) {
        moveTiles(action);
      }
    },
    [moveTiles],
  );

  const handleSwipe = useCallback(
    ({ deltaX, deltaY }: SwipeInput) => {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          moveTiles(MOVE_RIGHT);
        } else {
          moveTiles(MOVE_LEFT);
        }
      } else {
        if (deltaY > 0) {
          moveTiles(MOVE_DOWN);
        } else {
          moveTiles(MOVE_UP);
        }
      }
    },
    [moveTiles],
  );

  const renderGrid = useMemo(() => {
    const cells: JSX.Element[] = [];
    const totalCellCount = TOTAL_CELL_COUNT;

    for (let index = 0; index < totalCellCount; index++) {
      cells.push(
        <div
          key={index}
          className="size-16 m-1 rounded-[4px] bg-background-tertiary sm:size-[100px] sm:m-2"
          data-testid="cell"
        ></div>,
      );
    }

    return cells;
  }, []);

  const renderTiles = useMemo(() => {
    return getTiles().map((tile: TileModel) => {
      return tile ? <Tile key={`tile-${tile.id}`} {...tile} /> : null;
    });
  }, [getTiles]);

  useEffect(() => {
    if (!initialized.current) {
      startGame();
      initialized.current = true;
    }
  }, [startGame]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <MobileSwiper onSwipe={handleSwipe}>
      <div className="relative w-[296px] sm:w-[480px]">
        <div className="absolute z-10 m-1 inset-0 sm:m-2">{renderTiles}</div>
        <div className="flex flex-wrap bg-background-secondary rounded-md border-background-secondary border-4 sm:border-8">
          {renderGrid}
        </div>
      </div>
    </MobileSwiper>
  );
}
