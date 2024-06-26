import { useContext } from 'react';
import { GameContext } from '@/context/GameContext';

const UndoButton = () => {
  const { undoMove, coins } = useContext(GameContext);
  const hasEnoughCoins = coins >= 3;

  return (
    <div
      title={hasEnoughCoins ? 'Undo last move for 3 coins' : 'Not enough coins'}
      className="font-bold text-center uppercase text-sm sm:text-base bg-background-secondary text-text-primary rounded-md py-1 px-2"
    >
      Undo <div className="text-xl sm:text-2xl text-text-secondary"></div>
      <button
        onClick={() => undoMove(3, 1)}
        disabled={!hasEnoughCoins}
        className="font-bold text-center uppercase text-sm sm:text-base bg-background-secondary text-text-secondary rounded-md py-1 px-2 disabled:text-text-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 7v6h6" />
          <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
        </svg>
      </button>
    </div>
  );
};

export default UndoButton;
