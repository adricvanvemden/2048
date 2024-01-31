import Board from '@/components/Board';
import GameProvider from '@/context/GameContext';
import { RenderResult, render } from '@testing-library/react';

describe('Board', () => {
  let getAllByTestId: RenderResult['getAllByTestId'];

  beforeEach(() => {
    const renderResult = render(
      <GameProvider>
        <Board />
      </GameProvider>,
    );
    getAllByTestId = renderResult.getAllByTestId;
  });

  it('should render board with 16 cells', () => {
    const cellElements = getAllByTestId('cell');
    expect(cellElements.length).toBe(16);
  });

  it('should render board with 2 tiles', () => {
    const tileElements = getAllByTestId('tile');
    expect(tileElements.length).toBe(2);
  });
});
