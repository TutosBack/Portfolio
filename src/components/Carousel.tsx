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
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  
  // Update container dimensions
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setContainerDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate adaptive radius based on container dimensions and axis
  const adaptiveRadius = React.useMemo(() => {
    if (!containerDimensions.width || !containerDimensions.height) return radius;
    
    const baseSize = axis === 'y' 
      ? Math.min(containerDimensions.width / 3, radius)
      : Math.min(containerDimensions.height / 3, radius);
    
    return Math.max(baseSize, 120); // Minimum radius
  }, [containerDimensions, radius, axis]);

  // Calculate item positions in 3D space
  const getItemPosition = (index: number) => {
    const totalItems = items.length;
    const angleStep = 360 / totalItems;
    const angle = index * angleStep;
    const radians = (angle * Math.PI) / 180;
    
    let x = 0, y = 0, z = 0;
    
    if (axis === 'y') {
      // Horizontal rotation around Y axis
      x = Math.sin(radians) * adaptiveRadius;
      z = Math.cos(radians) * adaptiveRadius;
      y = 0;
    } else {
      // Vertical rotation around X axis
      x = 0;
      y = -Math.sin(radians) * adaptiveRadius;
      z = Math.cos(radians) * adaptiveRadius;
    }
    
    return { x, y, z, rotation: angle };
  };

  // Navigation handlers
  const goToItem = (index: number) => {
    if (isAnimating || index === selectedIndex || index < 0 || index >= items.length) return;
    
    setIsAnimating(true);
    setSelectedIndex(index);
    
    if (onSelectItem) {
      onSelectItem(items[index], index);
    }
    
    setTimeout(() => setIsAnimating(false), 600);
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
    if (!autoRotate || items.length === 0) return;
    
    const interval = setInterval(goToNext, autoRotateSpeed);
    return () => clearInterval(interval);
  }, [autoRotate, autoRotateSpeed, selectedIndex, items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((axis === 'y' && e.key === 'ArrowLeft') || (axis === 'x' && e.key === 'ArrowUp')) {
        e.preventDefault();
        goToPrev();
      } else if ((axis === 'y' && e.key === 'ArrowRight') || (axis === 'x' && e.key === 'ArrowDown')) {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, axis]);

  // Click navigation
  const handleContainerClick = (e: React.MouseEvent) => {
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

  // Calculate spinner rotation
  const getSpinnerRotation = () => {
    const angleStep = 360 / items.length;
    const rotation = -selectedIndex * angleStep;
    return axis === 'y' ? `rotateY(${rotation}deg)` : `rotateX(${rotation}deg)`;
  };

  return (
    <div 
      ref={containerRef}
      className={`carousel-container carousel-container--${axis} ${className}`}
      onClick={handleContainerClick}
      role="region"
      aria-label={`3D ${axis === 'y' ? 'horizontal' : 'vertical'} carousel`}
      aria-live="polite"
    >
      <div 
        className="carousel"
        style={{ 
          perspective: `${adaptiveRadius * 4}px`,
          perspectiveOrigin: '50% 50%'
        }}
      >
        <div 
          className="carousel-spinner"
          style={{ 
            transform: `translateZ(-${adaptiveRadius}px) ${getSpinnerRotation()}`,
            transition: isAnimating ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
          }}
        >
          {items.map((item, index) => {
            const position = getItemPosition(index);
            const isSelected = index === selectedIndex;
            
            return (
              <CarouselItem
                key={item.id || index}
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