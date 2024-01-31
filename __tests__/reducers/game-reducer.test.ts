import { Tile } from '@/types/types';
import gameReducer, { initialState } from '@/reducers/GameReducer';
import { act, renderHook } from '@testing-library/react';
import { useReducer } from 'react';

// Helper function to generate tiles
const createTile = (position: [number, number], value: number): Tile => ({
  position,
  value,
});

describe('gameReducer', () => {
  describe('clean_up', () => {
    it("should remove tiles that are not referenced in the board's state", () => {
      const tile1 = createTile([0, 1], 2);
      const tile2 = createTile([0, 3], 2);

      const { result } = renderHook(() => useReducer(gameReducer, initialState));
      const [, dispatch] = result.current;

      act(() => {
        dispatch({ type: 'create_tile', tile: tile1 });
        dispatch({ type: 'create_tile', tile: tile2 });
        dispatch({ type: 'move_up' });
      });

      const [stateBefore] = result.current;
      expect(Object.values(stateBefore.tiles)).toHaveLength(2);

      act(() => dispatch({ type: 'clean_up' }));

      const [stateAfter] = result.current;
      expect(Object.values(stateAfter.tiles)).toHaveLength(1);
    });
  });

  describe('create_tile', () => {
    it('should create a new tile', () => {
      const tile = createTile([0, 0], 2);

      const { result } = renderHook(() => useReducer(gameReducer, initialState));
      const [, dispatch] = result.current;

      act(() => dispatch({ type: 'create_tile', tile }));

      const [state] = result.current;

      expect(state.board[0][0]).toBeDefined();
      expect(Object.values(state.tiles)).toEqual([{ id: state.board[0][0], ...tile }]);
    });
  });

  describe('move_up', () => {
    it('should move the tile up', () => {
      const tile1 = createTile([0, 1], 2);
      const tile2 = createTile([1, 3], 2);

      const { result } = renderHook(() => useReducer(gameReducer, initialState));
      const [, dispatch] = result.current;

      act(() => {
        dispatch({ type: 'create_tile', tile: tile1 });
        dispatch({ type: 'create_tile', tile: tile2 });
      });

      const [stateBefore] = result.current;
      expect(!stateBefore.board[0][0]).toBeTruthy();
      expect(!stateBefore.board[0][1]).toBeTruthy();
      expect(typeof stateBefore.board[1][0]).toBe('string');
      expect(typeof stateBefore.board[3][1]).toBe('string');

      act(() => dispatch({ type: 'move_up' }));

      const [stateAfter] = result.current;
      expect(typeof stateAfter.board[0][0]).toBe('string');
      expect(typeof stateAfter.board[0][1]).toBe('string');
      expect(!stateAfter.board[1][0]).toBeTruthy();
      expect(!stateAfter.board[3][1]).toBeTruthy();
    });

    it('should stack tiles with the same value on top of each other', () => {
      const tile1 = createTile([0, 1], 2);
      const tile2 = createTile([0, 3], 2);

      const { result } = renderHook(() => useReducer(gameReducer, initialState));
      const [, dispatch] = result.current;

      act(() => {
        dispatch({ type: 'create_tile', tile: tile1 });
        dispatch({ type: 'create_tile', tile: tile2 });
      });

      const [stateBefore] = result.current;
      expect(!stateBefore.board[0][0]).toBeTruthy();
      expect(typeof stateBefore.board[1][0]).toBe('string');
      expect(!stateBefore.board[2][0]).toBeTruthy();
      expect(typeof stateBefore.board[3][0]).toBe('string');

      act(() => dispatch({ type: 'move_up' }));

      const [stateAfter] = result.current;
      expect(typeof stateAfter.board[0][0]).toBe('string');
      expect(!stateAfter.board[1][0]).toBeTruthy();
      expect(!stateAfter.board[2][0]).toBeTruthy();
      expect(!stateAfter.board[3][0]).toBeTruthy();
    });

    it('should merge tiles with the same value', () => {
      const tile1 = createTile([0, 1], 2);
      const tile2 = createTile([0, 3], 2);

      const { result } = renderHook(() => useReducer(gameReducer, initialState));
      const [, dispatch] = result.current;

      act(() => {
        dispatch({ type: 'create_tile', tile: tile1 });
        dispatch({ type: 'create_tile', tile: tile2 });
      });

      const [stateBefore] = result.current;
      expect(!stateBefore.board[0][0]).toBeTruthy();
      expect(stateBefore.tiles[stateBefore.board[1][0]].value).toBe(2);
      expect(!stateBefore.board[2][0]).toBeTruthy();
      expect(stateBefore.tiles[stateBefore.board[3][0]].value).toBe(2);

      act(() => dispatch({ type: 'move_up' }));

      const [stateAfter] = result.current;
      expect(stateAfter.tiles[stateAfter.board[0][0]].value).toBe(4);
      expect(!stateAfter.board[1][0]).toBeTruthy();
      expect(!stateAfter.board[2][0]).toBeTruthy();
      expect(!stateAfter.board[3][0]).toBeTruthy();
    });
  });

  describe('move_down', () => {
    it('should move the tile down', () => {
      const tile1 = createTile([0, 1], 2);
      const tile2 = createTile([1, 3], 2);

      const { result } = renderHook(() => useReducer(gameReducer, initialState));
      const [, dispatch] = result.current;

      act(() => {
        dispatch({ type: 'create_tile', tile: tile1 });
        dispatch({ type: 'create_tile', tile: tile2 });
      });

      const [stateBefore] = result.current;
      expect(!stateBefore.board[0][1]).toBeTruthy();
      expect(typeof stateBefore.board[1][0]).toBe('string');
      expect(typeof stateBefore.board[3][1]).toBe('string');

      act(() => dispatch({ type: 'move_down' }));

      const [stateAfter] = result.current;
      expect(typeof stateAfter.board[3][0]).toBe('string');
      expect(typeof stateAfter.board[3][1]).toBe('string');
      expect(!stateAfter.board[1][0]).toBeTruthy();
    });

    it('should stack tiles with the same value on top of each other', () => {
      const tile1 = createTile([0, 1], 2);
      const tile2 = createTile([0, 3], 2);

      const { result } = renderHook(() => useReducer(gameReducer, initialState));
      const [, dispatch] = result.current;

      act(() => {
        dispatch({ type: 'create_tile', tile: tile1 });
        dispatch({ type: 'create_tile', tile: tile2 });
      });

      const [stateBefore] = result.current;
      expect(!stateBefore.board[0][0]).toBeTruthy();
      expect(typeof stateBefore.board[1][0]).toBe('string');
      expect(!stateBefore.board[2][0]).toBeTruthy();
      expect(typeof stateBefore.board[3][0]).toBe('string');

      act(() => dispatch({ type: 'move_down' }));

      const [stateAfter] = result.current;
      expect(!stateAfter.board[0][0]).toBeTruthy();
      expect(!stateAfter.board[1][0]).toBeTruthy();
      expect(!stateAfter.board[2][0]).toBeTruthy();
      expect(typeof stateAfter.board[3][0]).toBe('string');
    });
  });

  describe('move_left', () => {
    it('should move the tile left', () => {
      const tile1 = createTile([0, 1], 2);
      const tile2 = createTile([1, 3], 2);

      const { result } = renderHook(() => useReducer(gameReducer, initialState));
      const [, dispatch] = result.current;

      act(() => {
        dispatch({ type: 'create_tile', tile: tile1 });
        dispatch({ type: 'create_tile', tile: tile2 });
      });

      const [stateBefore] = result.current;
      expect(!stateBefore.board[3][0]).toBeTruthy();
      expect(typeof stateBefore.board[1][0]).toBe('string');
      expect(typeof stateBefore.board[3][1]).toBe('string');

      act(() => dispatch({ type: 'move_left' }));

      const [stateAfter] = result.current;
      expect(typeof stateAfter.board[1][0]).toBe('string');
      expect(typeof stateAfter.board[3][0]).toBe('string');
      expect(!stateAfter.board[3][1]).toBeTruthy();
    });

    it('should stack tiles with the same values on top of each other', () => {
      const tile1: Tile = {
        position: [0, 1],
        value: 2,
      };

      const tile2: Tile = {
        position: [3, 1],
        value: 2,
      };

      const { result } = renderHook(() => useReducer(gameReducer, initialState));
      const [, dispatch] = result.current;

      act(() => {
        dispatch({ type: 'create_tile', tile: tile1 });
        dispatch({ type: 'create_tile', tile: tile2 });
      });

      const [stateBefore] = result.current;
      expect(typeof stateBefore.board[1][0]).toBe('string');
      expect(!stateBefore.board[1][1]).toBeTruthy();
      expect(!stateBefore.board[1][2]).toBeTruthy();
      expect(typeof stateBefore.board[1][3]).toBe('string');

      act(() => dispatch({ type: 'move_left' }));

      const [stateAfter] = result.current;
      expect(typeof stateAfter.board[1][0]).toBe('string');
      expect(!stateAfter.board[1][1]).toBeTruthy();
      expect(!stateAfter.board[1][2]).toBeTruthy();
      expect(!stateAfter.board[1][3]).toBeTruthy();
    });
  });

  describe('move_right', () => {
    it('should move the tile right', () => {
      const tile1 = createTile([0, 1], 2);
      const tile2 = createTile([1, 3], 2);

      const { result } = renderHook(() => useReducer(gameReducer, initialState));
      const [, dispatch] = result.current;

      act(() => {
        dispatch({ type: 'create_tile', tile: tile1 });
        dispatch({ type: 'create_tile', tile: tile2 });
      });

      const [stateBefore] = result.current;
      expect(!stateBefore.board[1][3]).toBeTruthy();
      expect(!stateBefore.board[3][3]).toBeTruthy();
      expect(typeof stateBefore.board[1][0]).toBe('string');
      expect(typeof stateBefore.board[3][1]).toBe('string');

      act(() => dispatch({ type: 'move_right' }));

      const [stateAfter] = result.current;
      expect(typeof stateAfter.board[1][3]).toBe('string');
      expect(typeof stateAfter.board[3][3]).toBe('string');
      expect(!stateAfter.board[1][0]).toBeTruthy();
      expect(!stateAfter.board[3][1]).toBeTruthy();
    });

    it('should stack tiles with the same values on top of each other', () => {
      const tile1 = createTile([0, 1], 2);
      const tile2 = createTile([3, 1], 2);

      const { result } = renderHook(() => useReducer(gameReducer, initialState));
      const [, dispatch] = result.current;

      act(() => {
        dispatch({ type: 'create_tile', tile: tile1 });
        dispatch({ type: 'create_tile', tile: tile2 });
      });

      const [stateBefore] = result.current;
      expect(typeof stateBefore.board[1][0]).toBe('string');
      expect(!stateBefore.board[1][1]).toBeTruthy();
      expect(!stateBefore.board[1][2]).toBeTruthy();
      expect(typeof stateBefore.board[1][3]).toBe('string');

      act(() => dispatch({ type: 'move_right' }));

      const [stateAfter] = result.current;
      expect(!stateAfter.board[1][0]).toBeTruthy();
      expect(!stateAfter.board[1][1]).toBeTruthy();
      expect(!stateAfter.board[1][2]).toBeTruthy();
      expect(typeof stateAfter.board[1][3]).toBe('string');
    });
  });
});
