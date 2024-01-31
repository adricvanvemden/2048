import { GameContext } from '@/context/GameContext';
import { useContext, useEffect, useState } from 'react';

export default function Score() {
  const { score } = useContext(GameContext);
  const [highScore, setHighScore] = useState(0);

  // Load the high score from localStorage when the component mounts
  useEffect(() => {
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
      setHighScore(Number(savedHighScore));
    }
  }, []);

  // Update the high score in state and localStorage whenever the score increases
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', String(score));
    }
  }, [score, highScore]);

  return (
    <div className="flex gap-4">
      <div className="font-bold text-center uppercase text-sm sm:text-base bg-background-secondary text-text-primary rounded-md py-1 px-2">
        Score <div className="text-xl sm:text-2xl text-text-secondary">{score}</div>
      </div>
      <div className="font-bold text-center uppercase text-sm sm:text-base bg-background-secondary text-text-primary rounded-md py-1 px-2">
        Highscore <div className="text-xl sm:text-2xl text-text-secondary">{highScore}</div>
      </div>
    </div>
  );
}
