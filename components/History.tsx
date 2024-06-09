import PreviewBoard from './PreviewBoard';
import { useContext } from 'react';
import { GameContext } from '@/context/GameContext';

export const History = () => {
  const { history } = useContext(GameContext);
  const showMax = 3;

  return (
    <div className="history text-center">
      <h3 className="text-2xl font-bold my-2">Last moves</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {history
          .slice(1, -1)
          .slice(-showMax)
          .reverse()
          .map((gameState, index) => (
            <div key={index} className="history-item">
              <span className="font-bold">{history.length - index - 2}</span>
              <PreviewBoard historyState={gameState} />
            </div>
          ))}
      </div>
    </div>
  );
};
