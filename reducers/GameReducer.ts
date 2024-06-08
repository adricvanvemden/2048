import { TILE_COUNT_PER_DIMENSION } from '@/constants';
import { MoveDirection, Tile, TileMap } from '@/types/types';
import flattenDeep from '@/utils/helpers/flattenDeep';
import { uid } from 'uid';
import isEqual from '@/utils/helpers/isEqual';

export type GameState = {
  board: string[][];
  tiles: TileMap;
  tilesByIds: string[];
  hasChanged: boolean;
  score: number;
  isGameOver: boolean;
  history: GameStateHistory[];
};

export type GameStateHistory = Pick<GameState, 'board' | 'score' | 'tiles' | 'tilesByIds'>;

type Action =
  | { type: 'create_tile'; tile: Tile }
  | { type: 'move_up' }
  | { type: 'move_down' }
  | { type: 'move_left' }
  | { type: 'move_right' }
  | { type: 'clean_up' }
  | { type: 'game_over' }
  | { type: 'game_reset' }
  | { type: 'undo_move' };

function createBoard() {
  const board: string[][] = [];
  for (let i = 0; i < TILE_COUNT_PER_DIMENSION; i++) {
    board[i] = new Array(TILE_COUNT_PER_DIMENSION).fill(null);
  }
  return board;
}

const move = (state: GameState, direction: MoveDirection) => {
  const newBoard = createBoard();
  const newTiles: TileMap = {};
  let hasChanged = false;
  let { score } = state;

  const isUpOrLeft = direction === 'move_up' || direction === 'move_left';
  const isVertical = direction === 'move_up' || direction === 'move_down';

  for (let i = 0; i < TILE_COUNT_PER_DIMENSION; i++) {
    let newPos = isUpOrLeft ? 0 : TILE_COUNT_PER_DIMENSION - 1;
    let prevTile: Tile | undefined;

    for (
      let j = isUpOrLeft ? 0 : TILE_COUNT_PER_DIMENSION - 1;
      isUpOrLeft ? j < TILE_COUNT_PER_DIMENSION : j >= 0;
      isUpOrLeft ? j++ : j--
    ) {
      const tileId = isVertical ? state.board[j][i] : state.board[i][j];
      const currentTile = state.tiles[tileId];

      if (tileId) {
        if (prevTile?.value === currentTile.value) {
          score += prevTile.value * 2;
          newTiles[prevTile.id as string] = {
            ...prevTile,
            value: prevTile.value * 2,
          };
          newTiles[tileId] = {
            ...currentTile,
            position: isVertical
              ? [i, isUpOrLeft ? newPos - 1 : newPos + 1]
              : [isUpOrLeft ? newPos - 1 : newPos + 1, i],
          };
          prevTile = undefined;
          hasChanged = true;
          continue;
        }

        if (isVertical) {
          newBoard[newPos][i] = tileId;
        } else {
          newBoard[i][newPos] = tileId;
        }
        newTiles[tileId] = {
          ...currentTile,
          position: isVertical ? [i, newPos] : [newPos, i],
        };
        prevTile = newTiles[tileId];
        if (!isEqual(currentTile.position, isVertical ? [i, newPos] : [newPos, i])) {
          hasChanged = true;
        }
        isUpOrLeft ? newPos++ : newPos--;
      }
    }
  }

  return { ...state, board: newBoard, tiles: newTiles, hasChanged, score };
};

export const initialState = {
  board: createBoard(),
  tiles: {},
  tilesByIds: [],
  hasChanged: false,
  score: 0,
  isGameOver: false,
  history: [],
};

export default function gameReducer(state: GameState = initialState, action: Action): GameState {
  switch (action.type) {
    case 'clean_up': {
      const flattenBoard = flattenDeep(state.board);
      const newTiles: TileMap = flattenBoard.reduce((acc: {}, tileId: string) => {
        if (!tileId) {
          return acc;
        }
        return { ...acc, [tileId]: state.tiles[tileId] };
      }, {});

      return {
        ...state,
        tiles: newTiles,
        tilesByIds: Object.keys(newTiles),
        hasChanged: true,
      };
    }
    case 'create_tile': {
      const tileId = uid();
      const [x, y] = action.tile.position;
      const newBoard = JSON.parse(JSON.stringify(state.board));
      newBoard[y][x] = tileId;

      return {
        ...state,
        board: newBoard,
        history: [
          ...state.history,
          {
            board: newBoard,
            score: state.score,
            tiles: {
              ...state.tiles,
              [tileId]: { id: tileId, ...action.tile },
            },
            tilesByIds: [...state.tilesByIds, tileId],
          },
        ],
        tiles: {
          ...state.tiles,
          [tileId]: { id: tileId, ...action.tile },
        },
        tilesByIds: [...state.tilesByIds, tileId],
        hasChanged: false,
      };
    }
    case 'move_up':
    case 'move_down':
    case 'move_left':
    case 'move_right': {
      const newState = move(state, action.type);
      const newHistory = [
        ...state.history,
        {
          board: newState.board,
          score: newState.score,
          tiles: newState.tiles,
          tilesByIds: newState.tilesByIds,
        },
      ];
      return {
        ...newState,
        history: newHistory,
      };
    }
    case 'undo_move': {
      if (state.history.length > 2) {
        const lastGameState = { ...state.history[state.history.length - 3] };
        return {
          ...state,
          ...lastGameState,
          history: state.history.slice(0, -2),
        };
      }
      return state; // If there are no more moves to undo, return the current state
    }
    case 'game_over': {
      const { board, score, tiles, tilesByIds } = state;
      return {
        ...state,
        history: [...state.history, { board, score, tiles, tilesByIds }],
        isGameOver: true,
      };
    }
    case 'game_reset': {
      return initialState;
    }
    default:
      return state;
  }
}
