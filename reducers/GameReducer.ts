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
  highscore: number;
  isGameOver: boolean;
  history: GameStateHistory[];
  coins: number;
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
  | { type: 'undo_move' }
  | { type: 'save_to_history' }
  | { type: 'add_coins'; coins: number }
  | { type: 'remove_coins'; coins: number }
  | { type: 'continue_game'; gameState: GameState };

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
  let { score, coins } = state;

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
          const newScore = score + prevTile.value * 2;
          const prevScoreHundreds = Math.floor(score / 100);
          const newScoreHundreds = Math.floor(newScore / 100);

          if (newScore > score) {
            state.highscore = newScore;
          }

          if (newScoreHundreds > prevScoreHundreds) {
            coins += 5;
          }
          score = newScore;
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

  return { ...state, board: newBoard, tiles: newTiles, hasChanged, score, coins };
};

const saveToLocalStorage = (state: GameState) => {
  localStorage.setItem('gameState', JSON.stringify(state));
};

export const initialState = {
  board: createBoard(),
  tiles: {},
  tilesByIds: [],
  hasChanged: false,
  score: 0,
  highscore: 0,
  isGameOver: false,
  history: [],
  coins: 0,
};

export default function gameReducer(state: GameState = initialState, action: Action): GameState {
  let newState = { ...state };

  switch (action.type) {
    case 'clean_up': {
      const flattenBoard = flattenDeep(state.board);
      const newTiles: TileMap = flattenBoard.reduce((acc: {}, tileId: string) => {
        if (!tileId) {
          return acc;
        }
        return { ...acc, [tileId]: state.tiles[tileId] };
      }, {});

      newState = {
        ...state,
        tiles: newTiles,
        tilesByIds: Object.keys(newTiles),
        hasChanged: true,
      };
      break;
    }
    case 'create_tile': {
      const tileId = uid();
      const [x, y] = action.tile.position;
      const newBoard = JSON.parse(JSON.stringify(state.board));
      newBoard[y][x] = tileId;

      newState = {
        ...state,
        board: newBoard,
        tiles: {
          ...state.tiles,
          [tileId]: { id: tileId, ...action.tile },
        },
        tilesByIds: [...state.tilesByIds, tileId],
        hasChanged: false,
      };
      break;
    }
    case 'move_up':
    case 'move_down':
    case 'move_left':
    case 'move_right': {
      newState = move(state, action.type);
      break;
    }
    case 'undo_move': {
      if (state.history.length > 1) {
        const lastGameState = { ...state.history[state.history.length - 2] };
        newState = {
          ...state,
          ...lastGameState,
          history: state.history.slice(0, -1),
        };
      }
      break;
    }
    case 'game_over': {
      const { board, score, tiles, tilesByIds } = state;
      newState = {
        ...state,
        history: [...state.history, { board, score, tiles, tilesByIds }],
        isGameOver: true,
      };
      break;
    }
    case 'game_reset':
      newState = initialState;
      break;
    case 'save_to_history': {
      const newHistory = [
        ...state.history,
        {
          board: state.board,
          score: state.score,
          tiles: state.tiles,
          tilesByIds: state.tilesByIds,
        },
      ];
      newState = { ...state, history: newHistory };
      break;
    }
    case 'add_coins':
      newState = {
        ...state,
        coins: state.coins ? state.coins + action.coins : action.coins,
      };
      break;
    case 'remove_coins':
      newState = {
        ...state,
        coins: state.coins ? state.coins - action.coins : 0,
      };
      break;
    case 'continue_game':
      newState = action.gameState;
      break;
    default:
      return state;
  }
  saveToLocalStorage(newState);
  return newState;
}
