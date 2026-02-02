import { Food } from '@/data/foods';
import { useDraggable } from '@dnd-kit/core';
import { useEffect, useState } from 'react';

interface FoodItemProps {
  food: Food;
  lane: number;
  fallDuration: number;
  onExpire?: (foodId: number, lane: number) => void;
}

export function FoodItem({ food, lane, fallDuration, onExpire }: FoodItemProps) {
  const [timeLeft, setTimeLeft] = useState(fallDuration);
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `food-${food.id}`,
    data: { ...food, lane },
  });

  // Countdown timer
  useEffect(() => {
    if (isDragging) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onExpire?.(food.id, lane);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [food.id, lane, onExpire, isDragging]);

  const urgencyColor = timeLeft <= 2 ? 'text-secondary' : 'text-muted-foreground';

  // Calculate horizontal position based on lane
  const leftPosition = `${15 + (lane * 30)}%`;

  const style: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: leftPosition,
    animation: isDragging ? 'none' : `fall-slow ${fallDuration}s linear forwards`,
    opacity: isDragging ? 0.3 : 1,
    zIndex: 1,
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        cursor-grab active:cursor-grabbing
        bg-food-bg rounded-2xl p-4 food-shadow
        flex flex-col items-center justify-center gap-2
        min-w-[110px] min-h-[110px]
        select-none touch-none
        transition-opacity duration-200
        ${timeLeft <= 5 ? 'ring-2 ring-secondary ring-opacity-50' : ''}
      `}
    >
      <span className="text-5xl">{food.emoji}</span>
      <span className="text-sm font-bold text-foreground text-center leading-tight">
        {food.name}
      </span>
      <span className={`text-xs font-semibold ${urgencyColor}`}>
        {timeLeft}s
      </span>
    </div>
  );
}

// Separate component for the drag overlay - follows cursor exactly
interface DragOverlayItemProps {
  food: Food;
}

export function DragOverlayItem({ food }: DragOverlayItemProps) {
  return (
    <div
      className="
        bg-food-bg rounded-2xl p-4 food-shadow
        flex flex-col items-center justify-center gap-2
        min-w-[110px] min-h-[110px]
        select-none touch-none
        scale-110 shadow-2xl ring-4 ring-primary/50
        cursor-grabbing
      "
      style={{ zIndex: 9999 }}
    >
      <span className="text-5xl">{food.emoji}</span>
      <span className="text-sm font-bold text-foreground text-center leading-tight">
        {food.name}
      </span>
    </div>
  );
}
