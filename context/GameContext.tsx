import { MERGE_ANIMATION_DURATION, TILE_COUNT_PER_DIMENSION } from '@/constants';
import useThrottle from '@/utils/hooks/useThrottle';
import { MoveDirection, Tile } from '@/types/types';
import gameReducer, { GameState, initialState } from '@/reducers/GameReducer';
import { createContext, PropsWithChildren, useCallback, useEffect, useReducer } from 'react';

export const GameContext = createContext({
  score: 0,
  isGameOver: false,
  getTiles: () => [] as Tile[],
  moveTiles: (_: MoveDirection) => {},
  startGame: () => {},
  restartGame: () => {},
  undoMove: () => {},
  history: [] as Pick<GameState, 'board' | 'score' | 'tiles' | 'tilesByIds'>[],
});

export default function GameProvider({ children }: PropsWithChildren) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const getEmptyCells = useCallback(() => {
    const results: [number, number][] = [];

    for (let x = 0; x < TILE_COUNT_PER_DIMENSION; x++) {
      for (let y = 0; y < TILE_COUNT_PER_DIMENSION; y++) {
        if (!gameState.board[y][x]) {
          results.push([x, y]);
        }
      }
    }
    return results;
  }, [gameState.board]);

  const isGameOver = useCallback(() => {
    const emptyCells = getEmptyCells();
    if (emptyCells.length > 0) {
      return false;
    }

    for (let y = 0; y < TILE_COUNT_PER_DIMENSION; y++) {
      for (let x = 0; x < TILE_COUNT_PER_DIMENSION; x++) {
        const tile = gameState.board[y][x];

        if (tile) {
          const above = gameState.board[y - 1]?.[x];
          const below = gameState.board[y + 1]?.[x];
          const left = gameState.board[y]?.[x - 1];
          const right = gameState.board[y]?.[x + 1];

          const tileValue = gameState.tiles[tile]?.value;
          const aboveValue = gameState.tiles[above]?.value;
          const belowValue = gameState.tiles[below]?.value;
          const leftValue = gameState.tiles[left]?.value;
          const rightValue = gameState.tiles[right]?.value;

          if (
            tileValue === aboveValue ||
            tileValue === belowValue ||
            tileValue === leftValue ||
            tileValue === rightValue
          ) {
            return false;
          }
        }
      }
    }

    return dispatch({ type: 'game_over' });
  }, [gameState.board, getEmptyCells, gameState.tiles]);

  const appendRandomTile = useCallback(() => {
    const emptyCells = getEmptyCells();
    if (emptyCells.length > 0) {
      const cellIndex = Math.floor(Math.random() * emptyCells.length);
      const newTile = {
        position: emptyCells[cellIndex],
        value: 2,
      };
      dispatch({ type: 'create_tile', tile: newTile });
    }
    isGameOver();
  }, [getEmptyCells, isGameOver]);

  const getTiles = () => {
    return gameState.tilesByIds.map((tileId: string) => gameState.tiles[tileId]);
  };

  const moveTiles = useThrottle(
    (type: MoveDirection) => {
      dispatch({ type });
      isGameOver();
    },
    MERGE_ANIMATION_DURATION * 1.05,
    { trailing: false },
  );

  function getRandomPosition() {
    return Math.floor(Math.random() * 4);
  }

  const startGame = () => {
    const firstTile: Tile = { position: [getRandomPosition(), getRandomPosition()], value: 2 };
    const secondTile: Tile = { position: [getRandomPosition(), getRandomPosition()], value: 2 };
    dispatch({ type: 'create_tile', tile: firstTile });
    dispatch({ type: 'create_tile', tile: secondTile });
    saveToHistory();
  };

  const restartGame = () => {
    dispatch({ type: 'game_reset' });
    startGame();
  };

  const undoMove = () => {
    dispatch({ type: 'undo_move' });
  };

  const saveToHistory = () => {
    dispatch({ type: 'save_to_history' });
  };

  useEffect(() => {
    if (gameState.hasChanged) {
      setTimeout(() => {
        dispatch({ type: 'clean_up' });
        appendRandomTile();
        saveToHistory();
      }, MERGE_ANIMATION_DURATION);
    }
  }, [appendRandomTile, gameState.hasChanged]);

  return (
    <GameContext.Provider
      value={{
        score: gameState.score,
        isGameOver: gameState.isGameOver,
        history: gameState.history,
        getTiles,
        moveTiles,
        startGame,
        restartGame,
        undoMove,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
