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
    const { x, y, z, rotation } = position;
    const translate = `translate3d(${x}px, ${y}px, ${z}px)`;
    const rotate = axis === 'y' 
      ? `rotateY(${rotation}deg)` 
      : `rotateX(${rotation}deg)`;
    
    return `${translate} ${rotate}`;
  };

  // Dynamic styles
  const itemStyle: React.CSSProperties = {
    transform: getTransform(),
    opacity: isSelected ? 1 : 0.7,
    zIndex: isSelected ? 100 : 10,
    transition: isAnimating ? 'all 0.5s ease' : 'none',
  };

  return (
    <div
      className={`carousel-item ${isSelected ? 'selected' : ''}`}
      style={itemStyle}
      onClick={onClick}
      aria-label={`Item ${index + 1}: ${item.title || ''}`}
    >
      <div className="carousel-item-content">
        {item.image && (
          <img 
            src={item.image} 
            alt={item.title || `Item ${index + 1}`} 
            className="carousel-image"
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