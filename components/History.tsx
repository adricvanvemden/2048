import { GameStateHistory } from '@/reducers/GameReducer';
import PreviewBoard from './PreviewBoard';

export const History = ({ history }: { history: GameStateHistory[] }) => {
  const showMax = 3;

  return (
    <div className="history text-center">
      <h3 className="text-2xl font-bold my-2">Last moves</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {history.slice(-showMax).map((gameState, index) => (
          <div key={index} className="history-item">
            <PreviewBoard historyState={gameState} />
          </div>
        ))}
      </div>
    </div>
  );
};
