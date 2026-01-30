import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, Share2 } from 'lucide-react';

interface EndScreenProps {
  score: number;
  correctCount: number;
  totalCount: number;
  onRestart: () => void;
}

export function EndScreen({ score, correctCount, totalCount, onRestart }: EndScreenProps) {
  const percentage = Math.round((correctCount / totalCount) * 100);
  
  const getMessage = () => {
    if (percentage >= 90) return { text: "Amazing! You're an Energy Expert! 🌟", emoji: "🏆" };
    if (percentage >= 70) return { text: "Great job! You know your foods! 👏", emoji: "🥈" };
    if (percentage >= 50) return { text: "Good effort! Keep learning! 📚", emoji: "🥉" };
    return { text: "Keep trying! You'll get better! 💪", emoji: "🌱" };
  };

  const message = getMessage();

  const handleShare = () => {
    const text = `I scored ${score} points in "High Energy or Low Energy?" 🌍\n${correctCount}/${totalCount} correct (${percentage}%)\n\nCan you beat my score?`;
    
    if (navigator.share) {
      navigator.share({
        title: 'High Energy or Low Energy?',
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Score copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted">
      <div className="max-w-md w-full space-y-8 animate-bounce-in">
        {/* Trophy */}
        <div className="text-center">
          <span className="text-8xl block mb-4 animate-float">{message.emoji}</span>
          <h1 className="text-3xl md:text-4xl font-black text-foreground text-shadow-soft mb-2">
            Game Complete!
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            {message.text}
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-card rounded-2xl p-8 food-shadow space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold uppercase tracking-wide text-sm">Final Score</span>
            </div>
            <span className="text-6xl font-black text-primary">{score}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/10 rounded-xl p-4 text-center">
              <span className="block text-3xl font-black text-primary">{correctCount}</span>
              <span className="text-sm font-medium text-muted-foreground">Correct</span>
            </div>
            <div className="bg-secondary/10 rounded-xl p-4 text-center">
              <span className="block text-3xl font-black text-secondary">{totalCount - correctCount}</span>
              <span className="text-sm font-medium text-muted-foreground">Wrong</span>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
              <span className="text-accent font-bold">{percentage}% accuracy</span>
            </div>
          </div>
        </div>

        {/* Planet message */}
        <div className="text-center text-muted-foreground">
          <p className="text-lg">
            🌍 Remember: Saving high-energy food helps the planet!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRestart}
            size="lg"
            className="text-lg px-8 py-6 rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground basket-shadow hover:scale-105 transition-transform"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
          <Button
            onClick={handleShare}
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 rounded-xl font-bold border-2 hover:scale-105 transition-transform"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Score
          </Button>
        </div>
      </div>
    </div>
  );
}
