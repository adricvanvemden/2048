import { GameContext } from '@/context/GameContext';
import { useContext, useEffect } from 'react';

export default function Coins() {
  const { coins } = useContext(GameContext);

  return (
    <div className="flex gap-4">
      <div className="font-bold text-center uppercase text-sm sm:text-base bg-background-secondary text-text-primary rounded-md py-1 px-2">
        Coins <div className="text-xl sm:text-2xl text-text-secondary">{coins}</div>
      </div>
    </div>
  );
}
