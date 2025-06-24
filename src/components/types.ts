export interface CarouselItem {
  id: string;
  title?: string;
  content?: React.ReactNode;
  image?: string;
}

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
  axis: 'x' | 'y';
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