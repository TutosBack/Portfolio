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
  initialRotation?: number;
  visibleCount?: number;
  onSelectItem?: (item: CarouselItem, index: number) => void;
  className?: string;
}

// Props for each carousel item
export interface CarouselItemProps {
  item: CarouselItem;
  index: number;
  rotation: number;
  radius: number;
  isSelected: boolean;
  isAnimating: boolean;
  onClick: () => void;
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