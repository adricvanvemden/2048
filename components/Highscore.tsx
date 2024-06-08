import { GameContext } from '@/context/GameContext';
import { useContext } from 'react';

export default function Highscore() {
  const { highScore } = useContext(GameContext);

  return (
    <div className="font-bold text-center uppercase text-sm sm:text-base bg-background-secondary text-text-primary rounded-md py-1 px-2">
      Highscore <div className="text-xl sm:text-2xl text-text-secondary">{highScore}</div>
    </div>
  );
}
