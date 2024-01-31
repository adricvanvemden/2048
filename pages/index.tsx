import Head from 'next/head';
import Board from '@/components/Board';
import Score from '@/components/Score';
import { useContext } from 'react';
import { GameContext } from '@/context/GameContext';

export default function Home() {
  const { score, isGameOver, restartGame } = useContext(GameContext);

  return (
    <div className="mx-auto py-8 w-full max-w-[296px] sm:max-w-[480px]">
      <Head>
        <title>2048 Clone</title>
      </Head>
      <header className="flex items-center justify-between mb-2">
        <h1 className="text-4xl sm:text-6xl">2048</h1>
        <Score />
      </header>
      <main>
        <Board />
        <span className="gap-3 flex flex-col mt-3 text-sm sm:text-base">
          <p>Use the W/A/S/D or the arrow keys to move the tiles in the corresponding direction.</p>
          <p>When two tiles with the same number touch, they merge into one!</p>
          <p>The goal is to create a tile with the number 2048.</p>
        </span>
      </main>
      {isGameOver && (
        <div className="fixed inset-0 pb-[50vh] z-10 bg-black/50 flex flex-col items-center justify-center text-text-secondary">
          <h2 className="text-5xl mb-12 uppercase underline">Game Over</h2>
          <p className="text-2xl uppercase">SCORE</p>
          <p className="text-2xl uppercase">{score}</p>
          <button onClick={restartGame} className="mt-8 bg-background-secondary text-text-secondary px-4 py-2 rounded">
            Restart
          </button>
        </div>
      )}
      <footer className="text-center font-bold mt-4 text-sm">
        <a href="https://www.linkedin.com/in/adricvanvemden/" target="_blank" className="hover:underline">
          Made with 💜 by Adric
        </a>
      </footer>
    </div>
  );
}
