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
  axis = 'y', // Default to Y axis (horizontal rotation)
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
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
    axis,
  });

  // Check if mobile and update container dimensions
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
        setContainerHeight(containerRef.current.clientHeight);
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

  // Calculate adaptive radius based on container dimensions
  const adaptiveRadius = containerWidth && containerHeight 
    ? Math.min(radius, axis === 'y' ? containerWidth / 2.5 : containerHeight / 2.5) 
    : radius;
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((axis === 'y' && e.key === 'ArrowLeft') || (axis === 'x' && e.key === 'ArrowUp')) {
        goToPrev();
      } else if ((axis === 'y' && e.key === 'ArrowRight') || (axis === 'x' && e.key === 'ArrowDown')) {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, axis]);

  // Click navigation: depends on axis orientation
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    if (axis === 'y') {
      // Horizontal carousel: left half = prev, right half = next
      const x = e.clientX - rect.left;
      if (x < rect.width / 2) {
        goToPrev();
      } else {
        goToNext();
      }
    } else {
      // Vertical carousel: top half = prev, bottom half = next
      const y = e.clientY - rect.top;
      if (y < rect.height / 2) {
        goToPrev();
      } else {
        goToNext();
      }
    }
  };

  // Calculate transform based on axis
  const getSpinnerTransform = () => {
    const translateAxis = axis === 'y' ? 'translateZ' : 'translateZ';
    const rotateAxis = axis === 'y' ? 'rotateY' : 'rotateX';
    return `${translateAxis}(-${adaptiveRadius}px) ${rotateAxis}(${rotation}deg)`;
  };

  return (
    <div 
      ref={containerRef}
      className={`carousel-container ${className} carousel-container--${axis}`}
      aria-roledescription="carousel"
      aria-label={`3D ${axis === 'y' ? 'horizontal' : 'vertical'} rotating carousel`}
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
            transform: getSpinnerTransform(),
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