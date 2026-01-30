import { useState } from 'react';
import { IntroScreen } from '@/components/game/IntroScreen';
import { GameScreen } from '@/components/game/GameScreen';
import { EndScreen } from '@/components/game/EndScreen';

type GameState = 'intro' | 'playing' | 'ended';

interface GameResult {
  score: number;
  correctCount: number;
}

const TOTAL_FOODS = 25;

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [result, setResult] = useState<GameResult | null>(null);

  const handleStart = () => {
    setGameState('playing');
    setResult(null);
  };

  const handleGameEnd = (score: number, correctCount: number) => {
    setResult({ score, correctCount });
    setGameState('ended');
  };

  const handleRestart = () => {
    setGameState('intro');
    setResult(null);
  };

  if (gameState === 'intro') {
    return <IntroScreen onStart={handleStart} />;
  }

  if (gameState === 'playing') {
    return <GameScreen onGameEnd={handleGameEnd} />;
  }

  if (gameState === 'ended' && result) {
    return (
      <EndScreen
        score={result.score}
        correctCount={result.correctCount}
        totalCount={TOTAL_FOODS}
        onRestart={handleRestart}
      />
    );
  }

  return null;
};

export default Index;
