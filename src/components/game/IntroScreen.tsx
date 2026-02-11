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
            <p className="text-foreground/90 text-base leading-relaxed">
              When high-energy food is thrown away, all that energy is wasted too.
              When we waste food, we also waste water, land, and energy.
            </p>
          </div>

          {/* Rules */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Rules</h3>
            <div className="grid gap-2 text-[15px] text-foreground/85">
              <p>🎯 Catch the falling food and place each item in the correct basket.</p>
              <p>✅ <span className="text-primary font-medium">+10 points</span> for every correct basket.</p>
              <p>❌ <span className="text-secondary font-medium">−5 points</span> for every wrong basket.</p>
              <p>⏩ The food drops faster over time.</p>
              <p>🏆 Aim for the highest score — good luck!</p>
            </div>
          </div>
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

        <p className="text-center text-muted-foreground text-sm">🎯 25 foods to sort!</p>
      </div>
    </div>
  );
}
