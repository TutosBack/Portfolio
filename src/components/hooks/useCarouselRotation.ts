import { useState, useEffect, useCallback, useRef } from 'react';

interface UseCarouselRotationProps {
  itemCount: number;
  initialRotation?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  axis?: 'x' | 'y';
}

export interface UseCarouselRotationReturn {
  rotation: number;
  setRotation: (rotation: number) => void;
  isAnimating: boolean;
  startAnimation: (targetRotation: number) => void;
  goToItem: (index: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  getItemRotation: (index: number) => number;
  selectedItemIndex: number | null;
}

/**
 * Hook to handle carousel rotation state and animations
 * This is a simplified version that works with the new Carousel implementation
 */
const useCarouselRotation = ({
  itemCount,
  initialRotation = 0,
  autoRotate = false,
  autoRotateSpeed = 5000,
  axis = 'y'
}: UseCarouselRotationProps): UseCarouselRotationReturn => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotation, setRotation] = useState(initialRotation);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoRotateTimeoutRef = useRef<number | null>(null);
  const lastInteractionTime = useRef<number>(Date.now());
  
  // Calculate angle for each item
  const itemAngle = itemCount > 0 ? 360 / itemCount : 0;
  
  // Get the rotation angle for a specific item
  const getItemRotation = useCallback((index: number) => {
    return index * itemAngle;
  }, [itemAngle]);
  
  // Start animation to a target rotation
  const startAnimation = useCallback((targetRotation: number) => {
    setIsAnimating(true);
    setRotation(targetRotation);
    lastInteractionTime.current = Date.now();
    
    // Animation takes approximately 600ms
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, []);
  
  // Go to a specific item by index
  const goToItem = useCallback((index: number) => {
    if (index < 0 || index >= itemCount || index === selectedIndex) return;
    
    setSelectedIndex(index);
    const targetRotation = -getItemRotation(index);
    startAnimation(targetRotation);
  }, [itemCount, selectedIndex, getItemRotation, startAnimation]);
  
  // Go to next item
  const goToNext = useCallback(() => {
    const nextIndex = (selectedIndex + 1) % itemCount;
    goToItem(nextIndex);
  }, [selectedIndex, itemCount, goToItem]);
  
  // Go to previous item
  const goToPrev = useCallback(() => {
    const prevIndex = (selectedIndex - 1 + itemCount) % itemCount;
    goToItem(prevIndex);
  }, [selectedIndex, itemCount, goToItem]);
  
  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || itemCount === 0) return;

    const rotate = () => {
      // Only auto-rotate if user hasn't interacted in the last 2 seconds
      if (Date.now() - lastInteractionTime.current > 2000) {
        goToNext();
      }
      autoRotateTimeoutRef.current = window.setTimeout(rotate, autoRotateSpeed);
    };

    autoRotateTimeoutRef.current = window.setTimeout(rotate, autoRotateSpeed);

    return () => {
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current);
      }
    };
  }, [autoRotate, autoRotateSpeed, goToNext, itemCount]);
  
  return {
    rotation,
    setRotation,
    isAnimating,
    startAnimation,
    goToItem,
    goToNext,
    goToPrev,
    getItemRotation,
    selectedItemIndex: selectedIndex,
  };
};

export default useCarouselRotation;