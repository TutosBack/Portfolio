import React from 'react';
import { CarouselItemProps } from './types';
import './Carousel.css';

const CarouselItem: React.FC<CarouselItemProps> = ({
  item,
  index,
  position,
  isSelected,
  isAnimating,
  onClick,
  axis = 'y',
}) => {
  // 3D transform calculation
  const getTransform = () => {
    if (!position) {
      return 'translate3d(0px, 0px, 0px)';
    }
    
    const { x, y, z, rotation } = position;
    
    // Translate to position, then rotate to face center
    const translate = `translate3d(${x}px, ${y}px, ${z}px)`;
    const rotate = axis === 'y' 
      ? `rotateY(${rotation}deg)` 
      : `rotateX(${rotation}deg)`;
    
    return `${translate} ${rotate}`;
  };

  // Calculate opacity based on position
  const getOpacity = () => {
    if (!position) return 0.5;
    
    // Items closer to the front (higher z values) are more visible
    const normalizedZ = (position.z + 300) / 600; // Normalize z position
    const baseOpacity = isSelected ? 1 : Math.max(0.4, normalizedZ);
    
    return baseOpacity;
  };

  // Calculate scale based on selection and position
  const getScale = () => {
    if (isSelected) return 1.1;
    if (!position) return 0.8;
    
    // Scale based on z position (closer items are larger)
    const normalizedZ = (position.z + 300) / 600;
    return 0.7 + (normalizedZ * 0.3);
  };

  // Dynamic styles
  const itemStyle: React.CSSProperties = {
    transform: getTransform(),
    opacity: getOpacity(),
    zIndex: isSelected ? 100 : Math.round(50 + (position?.z || 0) / 10),
    transition: isAnimating 
      ? 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
      : 'opacity 0.3s ease',
  };

  const contentStyle: React.CSSProperties = {
    transform: `scale(${getScale()})`,
    transition: isAnimating 
      ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
      : 'transform 0.3s ease',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`carousel-item ${isSelected ? 'selected' : ''}`}
      style={itemStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isSelected ? 0 : -1}
      role="button"
      aria-label={`${item.title || `Item ${index + 1}`}${isSelected ? ' (selected)' : ''}`}
      aria-pressed={isSelected}
    >
      <div className="carousel-item-content" style={contentStyle}>
        {item.image && (
          <img 
            src={item.image} 
            alt={item.title || `Item ${index + 1}`} 
            className="carousel-image"
            loading="lazy"
          />
        )}
        {item.title && (
          <h3 className="carousel-title">{item.title}</h3>
        )}
      </div>
    </div>
  );
};

export default CarouselItem;