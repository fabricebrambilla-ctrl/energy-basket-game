import { useDroppable } from '@dnd-kit/core';
import { Leaf, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

type BasketType = 'low' | 'high';
type GlowState = 'none' | 'correct' | 'wrong';

interface BasketProps {
  type: BasketType;
  glowState: GlowState;
  onGlowEnd: () => void;
}

export function Basket({ type, glowState, onGlowEnd }: BasketProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { isOver, setNodeRef } = useDroppable({
    id: `basket-${type}`,
  });

  useEffect(() => {
    if (glowState !== 'none') {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onGlowEnd();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [glowState, onGlowEnd]);

  const isLow = type === 'low';
  const Icon = isLow ? Leaf : Zap;
  
  const baseClasses = isLow
    ? 'bg-primary border-primary/30'
    : 'bg-secondary border-secondary/30';

  const glowClasses = 
    glowState === 'correct' ? 'glow-correct' : 
    glowState === 'wrong' ? 'glow-wrong animate-shake' : '';

  return (
    <div
      ref={setNodeRef}
      className={`
        relative flex flex-col items-center justify-center
        w-36 h-36 md:w-44 md:h-44
        rounded-3xl border-4 basket-shadow
        transition-all duration-200
        ${baseClasses}
        ${isOver ? 'scale-110 brightness-110' : ''}
        ${glowClasses}
        ${isAnimating && glowState === 'wrong' ? 'animate-shake' : ''}
      `}
    >
      <Icon className="w-12 h-12 md:w-16 md:h-16 text-white/90 mb-2" />
      <span className="text-white font-bold text-sm md:text-base text-center px-2">
        {isLow ? '🟢 Low Energy' : '🔴 High Energy'}
      </span>
      
      {/* Hover indicator */}
      {isOver && (
        <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse" />
      )}
    </div>
  );
}
