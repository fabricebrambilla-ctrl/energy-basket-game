import { useEffect, useState } from 'react';

interface ScoreDisplayProps {
  score: number;
  lastChange: { amount: number; timestamp: number } | null;
}

export function ScoreDisplay({ score, lastChange }: ScoreDisplayProps) {
  const [popAnimation, setPopAnimation] = useState(false);

  useEffect(() => {
    if (lastChange) {
      setPopAnimation(true);
      const timer = setTimeout(() => setPopAnimation(false), 600);
      return () => clearTimeout(timer);
    }
  }, [lastChange]);

  return (
    <div className="relative flex flex-col items-center">
      <span className="text-muted-foreground font-semibold text-sm uppercase tracking-wide">
        Score
      </span>
      <span className="text-4xl md:text-5xl font-black text-foreground text-shadow-soft">
        {score}
      </span>
      
      {/* Score change popup */}
      {popAnimation && lastChange && (
        <span
          className={`
            absolute -top-2 left-1/2 -translate-x-1/2
            text-2xl font-black animate-score-pop
            ${lastChange.amount > 0 ? 'text-primary' : 'text-secondary'}
          `}
        >
          {lastChange.amount > 0 ? `+${lastChange.amount}` : lastChange.amount}
        </span>
      )}
    </div>
  );
}
