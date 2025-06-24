import { useState, useEffect, useCallback } from 'react';

interface UseCarouselRotationProps {
  itemCount: number;
  initialRotation?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  axis?: 'x' | 'y';
}

const useCarouselRotation = ({
  itemCount,
  initialRotation = 0,
  autoRotate = false,
  autoRotateSpeed = 5000,
  axis = 'y'
}: UseCarouselRotationProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotation, setRotation] = useState(initialRotation);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto rotation effect
  useEffect(() => {
    if (!autoRotate || itemCount === 0) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoRotateSpeed);

    return () => clearInterval(interval);
  }, [autoRotate, autoRotateSpeed, selectedIndex]);

  const goToItem = useCallback((index: number) => {
    if (index === selectedIndex || isAnimating) return;
    
    setIsAnimating(true);
    setSelectedIndex(index);
    
    // Calculate rotation to bring selected item to front
    const anglePerItem = 360 / itemCount;
    const targetRotation = -index * anglePerItem;
    setRotation(targetRotation);
    
    setTimeout(() => setIsAnimating(false), 500);
  }, [selectedIndex, isAnimating, itemCount]);

  const goToNext = useCallback(() => {
    const nextIndex = (selectedIndex + 1) % itemCount;
    goToItem(nextIndex);
  }, [selectedIndex, itemCount, goToItem]);

  const goToPrev = useCallback(() => {
    const prevIndex = (selectedIndex - 1 + itemCount) % itemCount;
    goToItem(prevIndex);
  }, [selectedIndex, itemCount, goToItem]);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const getItemRotation = useCallback((index: number) => {
    const anglePerItem = 360 / itemCount;
    return index * anglePerItem;
  }, [itemCount]);

  return {
    selectedIndex,
    selectedItemIndex: selectedIndex,
    rotation,
    setRotation,
    isAnimating,
    startAnimation,
    goToItem,
    goToNext,
    goToPrev,
    getItemRotation
  };
};

export default useCarouselRotation;