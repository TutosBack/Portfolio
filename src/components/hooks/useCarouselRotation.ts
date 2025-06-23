import { useState, useEffect, useCallback, useRef } from 'react';

interface UseCarouselRotationProps {
  itemCount: number;
  initialRotation?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  axis?: 'x' | 'y'; // New axis prop for rotation direction
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
 * Now supports both X and Y axis rotations
 */
const useCarouselRotation = ({
  itemCount,
  initialRotation = 0,
  autoRotate = false,
  autoRotateSpeed = 5000,
  axis = 'y', // Default to Y axis (horizontal rotation)
}: UseCarouselRotationProps): UseCarouselRotationReturn => {
  const [rotation, setRotation] = useState(initialRotation);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(0);
  const autoRotateTimeoutRef = useRef<number | null>(null);
  const lastInteractionTime = useRef<number>(Date.now());
  
  // Calculate angle for each item
  const itemAngle = 360 / itemCount;
  
  // Get the rotation angle for a specific item
  const getItemRotation = useCallback((index: number) => {
    return index * itemAngle;
  }, [itemAngle]);
  
  // Calculate the currently selected item based on rotation
  useEffect(() => {
    // Get the index of the frontmost item (opposite to current rotation)
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const closestItemAngle = Math.round(normalizedRotation / itemAngle) * itemAngle;
    const itemIndex = Math.round(closestItemAngle / itemAngle) % itemCount;
    
    // Make sure we use the positive index (0 to itemCount-1)
    const positiveIndex = (itemIndex + itemCount) % itemCount;
    setSelectedItemIndex(positiveIndex);
  }, [rotation, itemAngle, itemCount]);
  
  // Start animation to a target rotation
  const startAnimation = useCallback((targetRotation: number) => {
    setIsAnimating(true);
    setRotation(targetRotation);
    lastInteractionTime.current = Date.now();
    
    // Animation takes approximately 500ms
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, []);
  
  // Go to a specific item by index
  const goToItem = useCallback((index: number) => {
    const targetRotation = -getItemRotation(index);
    startAnimation(targetRotation);
  }, [getItemRotation, startAnimation]);
  
  // Go to next item - direction depends on axis
  const goToNext = useCallback(() => {
    // For both X and Y axis, we rotate in the negative direction to go "next"
    startAnimation(rotation - itemAngle);
  }, [rotation, itemAngle, startAnimation]);
  
  // Go to previous item - direction depends on axis
  const goToPrev = useCallback(() => {
    // For both X and Y axis, we rotate in the positive direction to go "previous"
    startAnimation(rotation + itemAngle);
  }, [rotation, itemAngle, startAnimation]);
  
  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;

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
  }, [autoRotate, autoRotateSpeed, goToNext]);
  
  return {
    rotation,
    setRotation,
    isAnimating,
    startAnimation,
    goToItem,
    goToNext,
    goToPrev,
    getItemRotation,
    selectedItemIndex,
  };
};

export default useCarouselRotation;