import { useState, useCallback, useRef } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, PointerSensor, useSensor, useSensors, TouchSensor, MeasuringStrategy } from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
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

export function GameScreen({ onGameEnd }: GameScreenProps) {
  // Generate all foods once and use a queue
  const foodQueueRef = useRef<Food[]>(getRandomFoods(TOTAL_FOODS));
  const nextIndexRef = useRef(NUM_LANES); // Track next food to spawn globally
  
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [sortedCount, setSortedCount] = useState(0);
  const [lastChange, setLastChange] = useState<{ amount: number; timestamp: number } | null>(null);
  const [lowBasketGlow, setLowBasketGlow] = useState<GlowState>('none');
  const [highBasketGlow, setHighBasketGlow] = useState<GlowState>('none');
  const [activeFood, setActiveFood] = useState<Food | null>(null);
  const [isFastMode, setIsFastMode] = useState(false);
  
  // Each lane holds one food (or null if empty)
  const [lanes, setLanes] = useState<(Food | null)[]>(() => {
    return foodQueueRef.current.slice(0, NUM_LANES);
  });

  // More responsive sensors for fast movements
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // Reduced from 8 for faster activation
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 50, // Reduced from 100
        tolerance: 8, // Increased tolerance
      },
    })
  );

  const fallDuration = isFastMode ? 5 : 10;

  // Spawn next food in a specific lane from the global queue
  const spawnInLane = useCallback((laneIndex: number) => {
    const nextIdx = nextIndexRef.current;
    if (nextIdx < TOTAL_FOODS) {
      const nextFood = foodQueueRef.current[nextIdx];
      nextIndexRef.current = nextIdx + 1;
      setLanes(prev => {
        const newLanes = [...prev];
        newLanes[laneIndex] = nextFood;
        return newLanes;
      });
    } else {
      // No more foods to spawn
      setLanes(prev => {
        const newLanes = [...prev];
        newLanes[laneIndex] = null;
        return newLanes;
      });
    }
  }, []);

  // Handle food expiration (missed foods)
  const handleFoodExpire = useCallback((foodId: number, lane: number) => {
    // Clear the lane first to prevent duplicate processing
    setLanes(prev => {
      if (prev[lane]?.id !== foodId) return prev; // Already processed
      const newLanes = [...prev];
      newLanes[lane] = null;
      return newLanes;
    });
    
    setScore(prev => {
      const newScore = prev - 5;
      setLastChange({ amount: -5, timestamp: Date.now() });
      return newScore;
    });
    
    setSortedCount(prev => {
      const newCount = prev + 1;
      if (newCount >= TOTAL_FOODS) {
        setTimeout(() => onGameEnd(score - 5, correctCount), 500);
      }
      return newCount;
    });
    
    // Spawn new food after a small delay
    setTimeout(() => spawnInLane(lane), 100);
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
    
    // Verify the food is still in this lane (not already processed)
    setLanes(prev => {
      if (prev[lane]?.id !== droppedFood.id) return prev; // Already processed
      const newLanes = [...prev];
      newLanes[lane] = null;
      return newLanes;
    });
    
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
    setTimeout(() => spawnInLane(lane), 100);
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
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
      >
        <div className="flex-1 flex flex-col items-center justify-between p-6 pb-8">
          {/* Food Drop Zone */}
          <div className="flex-1 w-full relative overflow-hidden">
            {lanes.map((food, laneIndex) => (
              food && (
                <FoodItem 
                  key={`${food.id}-lane-${laneIndex}`} 
                  food={food} 
                  lane={laneIndex} 
                  fallDuration={fallDuration} 
                  onExpire={handleFoodExpire} 
                />
              )
            ))}
            
            {lanes.every(food => !food) && sortedCount >= TOTAL_FOODS && (
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

        {/* Drag Overlay - follows cursor exactly, always centered */}
        <DragOverlay dropAnimation={null} modifiers={[snapCenterToCursor]}>
          {activeFood ? <DragOverlayItem food={activeFood} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
