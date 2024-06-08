export type Tile = {
  id?: string;
  position: [number, number];
  value: number;
  preview?: boolean;
};

export type TileMap = { [id: string]: Tile };

export type MoveDirection = 'move_up' | 'move_down' | 'move_left' | 'move_right';

export type SwipeInput = { deltaX: number; deltaY: number };
