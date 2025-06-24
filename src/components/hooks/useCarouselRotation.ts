import { useState, useEffect, useCallback } from 'react';

const useCarouselRotation = (itemCount: number) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToItem = useCallback((index: number) => {
    if (index === selectedIndex || isAnimating) return;
    
    setIsAnimating(true);
    setSelectedIndex(index);
    
    setTimeout(() => setIsAnimating(false), 500);
  }, [selectedIndex, isAnimating]);

  const goToNext = useCallback(() => {
    const nextIndex = (selectedIndex + 1) % itemCount;
    goToItem(nextIndex);
  }, [selectedIndex, itemCount, goToItem]);

  const goToPrev = useCallback(() => {
    const prevIndex = (selectedIndex - 1 + itemCount) % itemCount;
    goToItem(prevIndex);
  }, [selectedIndex, itemCount, goToItem]);

  return {
    selectedIndex,
    isAnimating,
    goToItem,
    goToNext,
    goToPrev
  };
};

export default useCarouselRotation;