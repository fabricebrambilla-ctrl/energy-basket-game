import { useState, useCallback, useEffect } from 'react';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors, TouchSensor } from '@dnd-kit/core';
import { Food, getRandomFoods } from '@/data/foods';
import { FoodItem } from './FoodItem';
import { Basket } from './Basket';
import { ScoreDisplay } from './ScoreDisplay';
import { ProgressBar } from './ProgressBar';

const TOTAL_FOODS = 25;
const SPEED_INCREASE_AT = 10;

type GlowState = 'none' | 'correct' | 'wrong';

interface GameScreenProps {
  onGameEnd: (score: number, correctCount: number) => void;
}

export function GameScreen({ onGameEnd }: GameScreenProps) {
  const [foods] = useState<Food[]>(() => getRandomFoods(TOTAL_FOODS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [sortedCount, setSortedCount] = useState(0);
  const [lastChange, setLastChange] = useState<{ amount: number; timestamp: number } | null>(null);
  const [lowBasketGlow, setLowBasketGlow] = useState<GlowState>('none');
  const [highBasketGlow, setHighBasketGlow] = useState<GlowState>('none');
  const [activeFoods, setActiveFoods] = useState<Food[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  const isFastMode = sortedCount >= SPEED_INCREASE_AT;
  const fallDuration = isFastMode ? 5 : 10;

  // Always maintain 3 foods on screen
  useEffect(() => {
    const TARGET_ACTIVE = 3;
    
    if (currentIndex >= TOTAL_FOODS) return;
    
    const foodsToSpawn = Math.min(TARGET_ACTIVE - activeFoods.length, TOTAL_FOODS - currentIndex);
    
    if (foodsToSpawn > 0) {
      const newFoods = foods.slice(currentIndex, currentIndex + foodsToSpawn);
      setActiveFoods(prev => [...prev, ...newFoods]);
      setCurrentIndex(prev => prev + foodsToSpawn);
    }
  }, [currentIndex, activeFoods.length, foods]);

  // Handle food expiration (missed foods)
  const handleFoodExpire = useCallback((foodId: number) => {
    setActiveFoods(prev => prev.filter(f => f.id !== foodId));
    setScore(prev => prev - 5);
    setLastChange({ amount: -5, timestamp: Date.now() });
    setSortedCount(prev => {
      const newCount = prev + 1;
      if (newCount >= TOTAL_FOODS) {
        setTimeout(() => onGameEnd(score - 5, correctCount), 500);
      }
      return newCount;
    });
  }, [score, correctCount, onGameEnd]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const droppedFood = active.data.current as Food;
    const basketType = over.id === 'basket-low' ? 'low' : 'high';
    
    const isCorrect = 
      (basketType === 'low' && !droppedFood.isHighEnergy) ||
      (basketType === 'high' && droppedFood.isHighEnergy);
    
    const points = isCorrect ? 10 : -5;
    setScore(prev => prev + points);
    setLastChange({ amount: points, timestamp: Date.now() });
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
    
    // Set glow state
    if (basketType === 'low') {
      setLowBasketGlow(isCorrect ? 'correct' : 'wrong');
    } else {
      setHighBasketGlow(isCorrect ? 'correct' : 'wrong');
    }
    
    // Remove the food from active
    setActiveFoods(prev => prev.filter(f => f.id !== droppedFood.id));
    setSortedCount(prev => {
      const newCount = prev + 1;
      if (newCount >= TOTAL_FOODS) {
        setTimeout(() => onGameEnd(score + points, correctCount + (isCorrect ? 1 : 0)), 500);
      }
      return newCount;
    });
  }, [score, correctCount, onGameEnd]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-card/50 backdrop-blur-sm border-b border-border">
        <ScoreDisplay score={score} lastChange={lastChange} />
        <ProgressBar current={sortedCount} total={TOTAL_FOODS} />
        {isFastMode && (
          <div className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm font-bold animate-pulse">
            ⚡ Fast Mode!
          </div>
        )}
      </div>

      {/* Game Area */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex-1 flex flex-col items-center justify-between p-6 pb-8">
          {/* Food Drop Zone */}
          <div className="flex-1 w-full relative overflow-hidden">
            {activeFoods.map((food, index) => (
              <FoodItem key={food.id} food={food} index={index % 3} fallDuration={fallDuration} onExpire={handleFoodExpire} />
            ))}
            
            {activeFoods.length === 0 && currentIndex >= TOTAL_FOODS && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-muted-foreground text-lg font-medium animate-pulse">
                  Finishing up...
                </div>
              </div>
            )}
          </div>

          {/* Instruction */}
          <div className="my-6 text-center">
            <p className="text-muted-foreground font-medium">
              👆 Drag the food to the correct basket!
            </p>
          </div>

          {/* Baskets */}
          <div className="flex items-center justify-center gap-8 md:gap-16">
            <Basket 
              type="low" 
              glowState={lowBasketGlow}
              onGlowEnd={() => setLowBasketGlow('none')}
            />
            <Basket 
              type="high" 
              glowState={highBasketGlow}
              onGlowEnd={() => setHighBasketGlow('none')}
            />
          </div>
        </div>
      </DndContext>
    </div>
  );
}
