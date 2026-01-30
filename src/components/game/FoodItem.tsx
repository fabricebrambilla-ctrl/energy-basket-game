import { Food } from '@/data/foods';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface FoodItemProps {
  food: Food;
  index: number;
}

export function FoodItem({ food, index }: FoodItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `food-${food.id}`,
    data: food,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    animationDelay: `${index * 0.15}s`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        animate-fall cursor-grab active:cursor-grabbing
        bg-food-bg rounded-2xl p-4 food-shadow
        flex flex-col items-center justify-center gap-2
        min-w-[100px] min-h-[100px]
        select-none touch-none
        transition-all duration-200
        hover:scale-105
        ${isDragging ? 'opacity-80 scale-110 z-50 rotate-3' : ''}
      `}
    >
      <span className="text-5xl">{food.emoji}</span>
      <span className="text-sm font-bold text-foreground text-center leading-tight">
        {food.name}
      </span>
    </div>
  );
}
