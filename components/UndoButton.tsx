import { useContext } from 'react';
import { GameContext } from '@/context/GameContext';

const UndoButton = () => {
  const { undoMove } = useContext(GameContext);

  return (
    <button
      onClick={undoMove}
      className="font-bold text-center uppercase text-sm sm:text-base bg-background-secondary text-text-secondary rounded-md py-1 px-2"
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
  );
};

export default UndoButton;
