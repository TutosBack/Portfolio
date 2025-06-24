// Item type definition
export interface CarouselItem {
  id?: string | number;
  title?: string;
  description?: string;
  image?: string;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience?: number;
  [key: string]: any; // Allow additional properties
}

// Main carousel props
export interface CarouselProps {
  items: CarouselItem[];
  radius?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  initialItemIndex?: number;
  visibleCount?: number;
  onSelectItem?: (item: CarouselItem, index: number) => void;
  className?: string;
  axis?: 'x' | 'y'; // 'x' for vertical, 'y' for horizontal
}

// Props for each carousel item
export interface CarouselItemProps {
  item: CarouselItem;
  index: number;
  position: {
    x: number;
    y: number;
    z: number;
    rotation: number;
  };
  isSelected: boolean;
  isAnimating: boolean;
  onClick: () => void;
  axis?: 'x' | 'y';
}

export interface Work {
  title: string;
  subtitle: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  feedback: string;
  avatar: string;
}