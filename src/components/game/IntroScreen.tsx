import { Button } from '@/components/ui/button';
import { Leaf, Zap } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted">
      <div className="max-w-2xl w-full space-y-8 animate-bounce-in">
        {/* Title */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-5xl animate-float">🥗</span>
            <span className="text-5xl animate-float" style={{ animationDelay: '0.5s' }}>⚡</span>
            <span className="text-5xl animate-float" style={{ animationDelay: '1s' }}>🌍</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground text-shadow-soft">
            High Energy or Low Energy?
          </h1>
          <p className="text-xl text-muted-foreground font-semibold">
            A Food Sorting Game
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-card rounded-2xl p-6 md:p-8 food-shadow space-y-5">
          <p className="text-lg leading-relaxed text-foreground">
            Some foods take <strong className="text-secondary">a lot of energy</strong> to make.
            Other foods take <strong className="text-primary">less energy</strong> to make.
          </p>
          
          <p className="text-lg leading-relaxed text-foreground">
            Energy is used to grow food, feed animals, move food, and keep food cold.
          </p>
          
          <div className="bg-secondary/10 rounded-xl p-4 border-l-4 border-secondary">
            <p className="text-foreground font-medium">
              When high-energy food is thrown away, all that energy is wasted too.
              When we waste food, we also waste water, land, and energy.
            </p>
          </div>
          
          <p className="text-lg leading-relaxed text-foreground">
            Put each food in the basket you think is right.
            <span className="font-bold"> Saving high-energy food helps the planet</span> 🌍
          </p>
        </div>

        {/* Baskets Preview */}
        <div className="flex justify-center gap-8 py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center basket-shadow">
              <Leaf className="w-10 h-10 text-primary-foreground" />
            </div>
            <span className="font-bold text-primary text-sm">Low Energy</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center basket-shadow">
              <Zap className="w-10 h-10 text-secondary-foreground" />
            </div>
            <span className="font-bold text-secondary text-sm">High Energy</span>
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center pt-4">
          <Button 
            onClick={onStart}
            size="lg"
            className="text-xl px-12 py-7 rounded-2xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground basket-shadow hover:scale-105 transition-transform"
          >
            Start Game 🎮
          </Button>
        </div>

        {/* Rules */}
        <div className="text-center text-muted-foreground text-sm space-y-1">
          <p>✅ Correct = <strong className="text-primary">+10 points</strong></p>
          <p>❌ Wrong = <strong className="text-secondary">-5 points</strong></p>
          <p>🎯 25 foods to sort!</p>
        </div>
      </div>
    </div>
  );
}
