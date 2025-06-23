import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Carousel.css';

interface ControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onPrev, onNext }) => {
  return (
    <div className="carousel-controls">
      <button 
        className="carousel-control carousel-control-prev"
        onClick={onPrev}
        aria-label="Previous item"
      >
        <ChevronLeft size={24} />
        <span>Prev</span>
      </button>
      <button 
        className="carousel-control carousel-control-next"
        onClick={onNext}
        aria-label="Next item"
      >
        <span>Next</span>
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Controls;