import { Food } from '@/data/foods';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';

interface FoodItemProps {
  food: Food;
  index: number;
  onExpire?: (foodId: number) => void;
}

export function FoodItem({ food, index, onExpire }: FoodItemProps) {
  const [timeLeft, setTimeLeft] = useState(20);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `food-${food.id}`,
    data: food,
  });

  // Countdown timer
  useEffect(() => {
    if (isDragging) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onExpire?.(food.id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [food.id, onExpire, isDragging]);

  const style = {
    transform: isDragging ? CSS.Translate.toString(transform) : undefined,
    animationDelay: `${index * 0.3}s`,
    animationPlayState: isDragging ? 'paused' : 'running',
  };

  const urgencyColor = timeLeft <= 2 ? 'text-secondary' : 'text-muted-foreground';

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        position: 'absolute',
        top: 0,
        left: `${20 + (index * 30)}%`,
        animation: isDragging ? 'none' : 'fall-slow 20s linear forwards',
      }}
      {...listeners}
      {...attributes}
      className={`
        cursor-grab active:cursor-grabbing
        bg-food-bg rounded-2xl p-4 food-shadow
        flex flex-col items-center justify-center gap-2
        min-w-[110px] min-h-[110px]
        select-none touch-none
        transition-transform duration-200
        hover:scale-105
        ${isDragging ? 'opacity-90 scale-110 z-50 rotate-3' : ''}
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
