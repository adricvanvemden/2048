import { useContext } from 'react';
import { GameContext } from '@/context/GameContext';

const NewGameButton = () => {
  const { restartGame } = useContext(GameContext);

  return (
    <div
      title="Start a new game"
      className="font-bold text-center uppercase text-sm sm:text-base bg-background-secondary text-text-primary rounded-md py-1 px-2"
    >
      New game <div className="text-xl sm:text-2xl text-text-secondary"></div>
      <button
        onClick={restartGame}
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
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
    </div>
  );
};

export default NewGameButton;
