import { useState, useCallback, useEffect } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, PointerSensor, useSensor, useSensors, TouchSensor } from '@dnd-kit/core';
import { Food, getRandomFoods } from '@/data/foods';
import { FoodItem, DragOverlayItem } from './FoodItem';
import { Basket } from './Basket';
import { ScoreDisplay } from './ScoreDisplay';
import { ProgressBar } from './ProgressBar';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

const TOTAL_FOODS = 25;
const NUM_LANES = 3;

type GlowState = 'none' | 'correct' | 'wrong';

interface GameScreenProps {
  onGameEnd: (score: number, correctCount: number) => void;
}

interface LaneState {
  food: Food | null;
  nextIndex: number;
}

export function GameScreen({ onGameEnd }: GameScreenProps) {
  const [foods] = useState<Food[]>(() => getRandomFoods(TOTAL_FOODS));
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [sortedCount, setSortedCount] = useState(0);
  const [lastChange, setLastChange] = useState<{ amount: number; timestamp: number } | null>(null);
  const [lowBasketGlow, setLowBasketGlow] = useState<GlowState>('none');
  const [highBasketGlow, setHighBasketGlow] = useState<GlowState>('none');
  const [activeFood, setActiveFood] = useState<Food | null>(null);
  const [isFastMode, setIsFastMode] = useState(false);
  
  // Lane-based state: each lane has its own food and tracks which index to spawn next
  const [lanes, setLanes] = useState<LaneState[]>(() => {
    // Initialize lanes with first 3 foods
    return Array.from({ length: NUM_LANES }, (_, i) => ({
      food: i < foods.length ? foods[i] : null,
      nextIndex: NUM_LANES + i, // Each lane will pull from every 3rd item
    }));
  });

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

  const fallDuration = isFastMode ? 5 : 10;

  // Spawn next food in a specific lane
  const spawnInLane = useCallback((laneIndex: number) => {
    setLanes(prev => {
      const lane = prev[laneIndex];
      // Find next available food for this lane
      let nextFood: Food | null = null;
      let newNextIndex = lane.nextIndex;
      
      // Look for next available food
      while (newNextIndex < TOTAL_FOODS && !nextFood) {
        nextFood = foods[newNextIndex];
        newNextIndex++;
      }
      
      const newLanes = [...prev];
      newLanes[laneIndex] = {
        food: nextFood,
        nextIndex: newNextIndex,
      };
      return newLanes;
    });
  }, [foods]);

  // Handle food expiration (missed foods)
  const handleFoodExpire = useCallback((foodId: number, lane: number) => {
    setScore(prev => prev - 5);
    setLastChange({ amount: -5, timestamp: Date.now() });
    setSortedCount(prev => {
      const newCount = prev + 1;
      if (newCount >= TOTAL_FOODS) {
        setTimeout(() => onGameEnd(score - 5, correctCount), 500);
      }
      return newCount;
    });
    spawnInLane(lane);
  }, [score, correctCount, onGameEnd, spawnInLane]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const food = event.active.data.current as Food;
    setActiveFood(food);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveFood(null);
    
    if (!over) return;
    
    const droppedFood = active.data.current as Food & { lane: number };
    const lane = droppedFood.lane;
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
    
    setSortedCount(prev => {
      const newCount = prev + 1;
      if (newCount >= TOTAL_FOODS) {
        setTimeout(() => onGameEnd(score + points, correctCount + (isCorrect ? 1 : 0)), 500);
      }
      return newCount;
    });
    
    // Spawn new food in the same lane
    spawnInLane(lane);
  }, [score, correctCount, onGameEnd, spawnInLane]);

  const handleDragCancel = useCallback(() => {
    setActiveFood(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-card/50 backdrop-blur-sm border-b border-border">
        <ScoreDisplay score={score} lastChange={lastChange} />
        <ProgressBar current={sortedCount} total={TOTAL_FOODS} />
        <Button
          variant={isFastMode ? "default" : "outline"}
          size="sm"
          onClick={() => setIsFastMode(!isFastMode)}
          className={`gap-2 ${isFastMode ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : ''}`}
        >
          <Zap className={`w-4 h-4 ${isFastMode ? 'fill-current' : ''}`} />
          Fast Mode {isFastMode ? 'ON' : 'OFF'}
        </Button>
      </div>

      {/* Game Area */}
      <DndContext 
        sensors={sensors} 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="flex-1 flex flex-col items-center justify-between p-6 pb-8">
          {/* Food Drop Zone */}
          <div className="flex-1 w-full relative overflow-hidden">
            {lanes.map((lane, laneIndex) => (
              lane.food && (
                <FoodItem 
                  key={`${lane.food.id}-${laneIndex}`} 
                  food={lane.food} 
                  lane={laneIndex} 
                  fallDuration={fallDuration} 
                  onExpire={handleFoodExpire} 
                />
              )
            ))}
            
            {lanes.every(lane => !lane.food) && sortedCount >= TOTAL_FOODS && (
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

        {/* Drag Overlay - follows cursor exactly */}
        <DragOverlay dropAnimation={null}>
          {activeFood ? <DragOverlayItem food={activeFood} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
