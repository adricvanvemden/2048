import { TOTAL_CELL_COUNT } from '@/constants';
import { GameStateHistory } from '@/reducers/GameReducer';
import React, { useMemo } from 'react';
import Tile from './Tile';
import { Tile as TileModel } from '@/types/types';

interface PreviewBoardProps {
  historyState: GameStateHistory;
}

const PreviewBoard: React.FC<PreviewBoardProps> = ({ historyState }) => {
  const { tilesByIds, tiles } = historyState;

  const renderGrid = useMemo(() => {
    const cells: JSX.Element[] = [];
    const totalCellCount = TOTAL_CELL_COUNT;

    for (let index = 0; index < totalCellCount; index++) {
      cells.push(
        <div
          key={index}
          className="size-12 m-1 rounded-[4px] bg-background-tertiary sm:size-[66px] sm:m-1"
          data-testid="cell"
        ></div>,
      );
    }

    return cells;
  }, []);

  const renderTiles = useMemo(() => {
    return tilesByIds
      .map((tileId: string) => tiles[tileId])
      .filter((tile: TileModel | undefined): tile is TileModel => Boolean(tile))
      .map((tile: TileModel) => {
        return <Tile key={`tile-${tile.id}`} {...tile} preview />;
      });
  }, [tilesByIds, tiles]);

  return (
    <div className="preview-board">
      <div className="relative">
        <div className="absolute z-10 m-1 inset-0 sm:m-2">{renderTiles}</div>
        <div className="grid grid-cols-4 bg-background-secondary rounded-md border-background-secondary border-4 sm:border-8">
          {renderGrid}
        </div>
      </div>
    </div>
  );
};

export default PreviewBoard;
