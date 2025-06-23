import React, { useState, useEffect, useRef, useCallback } from 'react';
import CarouselItem from './CarouselItem';
import useCarouselRotation from './hooks/useCarouselRotation';
import { CarouselProps, CarouselItem as CarouselItemType } from './types';
import './Carousel.css';

const Carousel: React.FC<CarouselProps> = ({
  items,
  radius = 250,
  autoRotate = false,
  autoRotateSpeed = 5000,
  initialRotation = 0,
  visibleCount = 7,
  onSelectItem,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const {
    rotation,
    setRotation,
    isAnimating,
    startAnimation,
    goToItem,
    goToNext,
    goToPrev,
    getItemRotation,
    selectedItemIndex,
  } = useCarouselRotation({
    itemCount: items.length,
    initialRotation,
    autoRotate,
    autoRotateSpeed,
  });

  // Check if mobile and update container width
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
        setIsMobile(window.innerWidth < 768);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Notify parent when selected item changes
  useEffect(() => {
    if (onSelectItem && selectedItemIndex !== null) {
      onSelectItem(items[selectedItemIndex], selectedItemIndex);
    }
  }, [selectedItemIndex, items, onSelectItem]);

  // Calculate adaptive radius based on container width
  const adaptiveRadius = containerWidth ? Math.min(radius, containerWidth / 2.5) : radius;
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Click navigation: left half = prev, right half = next
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) {
      goToPrev();
    } else {
      goToNext();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`carousel-container ${className}`}
      aria-roledescription="carousel"
      aria-label="3D rotating carousel"
      onClick={handleContainerClick}
    >
      <div 
        className="carousel"
        style={{ 
          perspectiveOrigin: '50% 50%', 
          perspective: `${adaptiveRadius * 4}px`,
        }}
      >
        <div 
          className="carousel-spinner"
          style={{ 
            transform: `translateZ(-${adaptiveRadius}px) rotateY(${rotation}deg)`,
          }}
        >
          {items.map((item, index) => {
            // Calculate the angle so the selected item is always at 0deg
            const relativeIndex = ((index - selectedItemIndex!) + items.length) % items.length;
            const itemAngle = relativeIndex * (360 / items.length);
            const isSelected = index === selectedItemIndex;
            return (
              <CarouselItem
                key={index}
                item={item}
                index={index}
                isSelected={isSelected}
                rotation={itemAngle}
                radius={adaptiveRadius}
                isAnimating={isAnimating}
                onClick={() => goToItem(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;