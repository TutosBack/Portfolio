import React, { useState, useEffect, useRef } from 'react';
import CarouselItem from './CarouselItem';
import { CarouselProps, CarouselItem as CarouselItemType } from './types';
import './Carousel.css';

const Carousel: React.FC<CarouselProps> = ({
  items,
  radius = 250,
  autoRotate = false,
  autoRotateSpeed = 5000,
  initialItemIndex = 0,
  visibleCount = 5,
  onSelectItem,
  className = '',
  axis = 'y',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(initialItemIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Calculate item positions
  const getItemPosition = (index: number) => {
    const totalItems = items.length;
    const angle = (360 / totalItems) * index;
    const rad = (angle - 90) * (Math.PI / 180); // Convert to radians
    
    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
      z: 0,
      rotation: angle,
    };
  };

  // Navigation handlers
  const goToItem = (index: number) => {
    if (isAnimating || index === selectedIndex) return;
    
    setIsAnimating(true);
    setSelectedIndex(index);
    
    if (onSelectItem) {
      onSelectItem(items[index], index);
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    const nextIndex = (selectedIndex + 1) % items.length;
    goToItem(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = (selectedIndex - 1 + items.length) % items.length;
    goToItem(prevIndex);
  };

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(goToNext, autoRotateSpeed);
    return () => clearInterval(interval);
  }, [autoRotate, autoRotateSpeed, selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goToPrev();
      else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  // Click navigation
  const handleContainerClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const isVertical = axis === 'x';
    const clickPosition = isVertical 
      ? (e.clientY - rect.top) / rect.height
      : (e.clientX - rect.left) / rect.width;
    
    if (clickPosition < 0.5) goToPrev();
    else goToNext();
  };

  return (
    <div 
      ref={containerRef}
      className={`carousel-container ${className} ${axis === 'x' ? 'vertical' : 'horizontal'}`}
      onClick={handleContainerClick}
    >
      <div className="carousel-viewport">
        <div 
          className="carousel-spinner"
          style={{
            transform: `rotate${axis === 'x' ? 'X' : 'Y'}(${selectedIndex * -360/items.length}deg)`,
            transition: isAnimating ? 'transform 0.5s ease' : 'none'
          }}
        >
          {items.map((item, index) => {
            const position = getItemPosition(index);
            const isSelected = index === selectedIndex;
            
            return (
              <CarouselItem
                key={index}
                item={item}
                index={index}
                position={position}
                isSelected={isSelected}
                isAnimating={isAnimating}
                onClick={() => goToItem(index)}
                axis={axis}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;