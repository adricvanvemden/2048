import { useContext, useEffect } from 'react';
import { GameContext } from '@/context/GameContext';
import Score from './Score';
import Coins from './Coins';
import NewGameButton from './NewGameButton';
import Highscore from './Highscore';

const GameOver = () => {
  const { undoMove, isGameOver, coins } = useContext(GameContext);

  useEffect(() => {
    if (isGameOver) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isGameOver]);

  if (!isGameOver) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center text-text-secondary">
      <div className="flex flex-col gap-4">
        <h2 className="text-5xl mb-12 uppercase underline underline-offset-4 text-center">Game Over</h2>
        <div className="flex items-center justify-between">
          <Coins />
          <Score />
          <Highscore />
        </div>
        <div
          title={coins >= 100 ? 'Go back 10 moves for 100 coins' : 'Not enough coins'}
          className="font-bold text-center uppercase text-sm sm:text-base bg-background-secondary text-text-primary rounded-md py-1 px-2 flex-col flex"
        >
          Go back 10 moves for 100 coins
          <button
            onClick={() => undoMove(100, 10)}
            disabled={coins < 100}
            className="bg-background-secondary text-text-secondary px-4 py-2 rounded disabled:text-text-primary"
          >
            Go Back 10 Moves
          </button>
        </div>
        <div
          title={coins >= 200 ? 'Go back 20 moves for 200 coins' : 'Not enough coins'}
          className="font-bold text-center uppercase text-sm sm:text-base bg-background-secondary text-text-primary rounded-md py-1 px-2 flex-col flex"
        >
          Go back 20 moves for 200 coins
          <button
            onClick={() => undoMove(200, 20)}
            disabled={coins < 200}
            className="bg-background-secondary text-text-secondary px-4 py-2 rounded disabled:text-text-primary"
          >
            Go Back 20 Moves
          </button>
        </div>
        <NewGameButton />
      </div>
    </div>
  );
};

export { GameOver };
