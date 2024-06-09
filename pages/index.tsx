import Head from 'next/head';
import Board from '@/components/Board';
import Score from '@/components/Score';
import { useContext } from 'react';
import { GameContext } from '@/context/GameContext';
import UndoButton from '@/components/UndoButton';
import { History } from '@/components/History';
import Coins from '@/components/Coins';
import NewGameButton from '@/components/NewGameButton';
import { GameOver } from '@/components/GameOver';
import Highscore from '@/components/Highscore';

export default function Home() {
  const { score, isGameOver, restartGame, history } = useContext(GameContext);

  return (
    <div className="mx-auto py-8 w-full max-w-[296px] sm:max-w-[480px]">
      <Head>
        <link rel="icon" href="./favicon.ico?" />
        <title>2048 Clone</title>
      </Head>
      <header className="flex justify-between mb-2">
        <h1 className="text-4xl sm:text-6xl font-bold">2048</h1>
        <NewGameButton />
      </header>
      <div className="flex items-center justify-end mb-2 gap-2">
        <UndoButton />
        <Coins />
        <Score />
        <Highscore />
      </div>
      <main>
        <Board />
        <details className="bg-white p-2 rounded  mt-4 text-sm sm:text-base">
          <summary className="rounded text-black font-bold">Game Instructions</summary>
          <span className="flex flex-col gap-2">
            <p>Swipe or use the W/A/S/D or the arrow keys to move the tiles in the corresponding direction.</p>
            <p>When two tiles with the same number touch, they merge into one!</p>
            <p>The goal is to create a tile with the number 2048.</p>
          </span>
        </details>
        <History history={history} />
      </main>

      <GameOver />

      <footer className="text-center font-bold mt-4 text-sm">
        <a href="https://www.linkedin.com/in/adricvanvemden/" target="_blank" className="hover:underline">
          Made with 💜 by Adric
        </a>
      </footer>
    </div>
  );
}
