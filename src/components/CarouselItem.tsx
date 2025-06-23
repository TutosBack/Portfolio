import React from 'react';
import { CarouselItemProps } from './types';
import './Carousel.css';

const CarouselItem: React.FC<CarouselItemProps> = ({
  item,
  index,
  rotation,
  radius,
  isSelected,
  isAnimating,
  onClick,
}) => {
  // For selected item, always show face-on (rotation 0deg)
  const itemAngle = isSelected ? 0 : rotation;
  const translateZ = radius;

  // Scale: selected is larger, others smaller
  const scale = isSelected ? 1.15 : 0.7;
  // Z-index: selected on top
  const zIndex = isSelected ? 200 : 100 - Math.abs(rotation) / 3.6;
  // Opacity: selected fully visible, others faded
  const opacity = isSelected ? 1 : 0.5;

  return (
    <div
      className={`carousel-item${isSelected ? ' selected' : ''}`}
      style={{
        transform: `rotateY(${itemAngle}deg) translateZ(${translateZ}px) scale(${scale})`,
        opacity,
        zIndex,
        transition: isAnimating ? 'transform 0.5s, opacity 0.5s' : undefined,
      }}
      onClick={onClick}
      role="group"
      aria-roledescription="slide"
      aria-label={`Slide ${index + 1} of ${item.title}`}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
    >
      <div className="carousel-item-content">
        {item.image && (
          <div className="carousel-item-image large">
            <img src={item.image} alt={item.title || `Item ${index + 1}`} />
          </div>
        )}
        {item.title && (
          <h3 className="carousel-item-title light">{item.title}</h3>
        )}
      </div>
    </div>
  );
};

export default CarouselItem;