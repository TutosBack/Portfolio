import { useState, useCallback, useRef, useEffect } from 'react';

interface UseDragProps {
  onDragStart?: () => void;
  onDragMove?: (delta: number) => void;
  onDragEnd?: (velocity: number) => void;
  enabled?: boolean;
  sensitivity?: number;
  minDragDistance?: number;
}

interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  startTime: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
}

const initialDragState: DragState = {
  isDragging: false,
  startX: 0,
  startY: 0,
  startTime: 0,
  currentX: 0,
  currentY: 0,
  deltaX: 0,
  deltaY: 0,
};

/**
 * Hook to handle drag gestures for the carousel
 */
const useDrag = ({
  onDragStart,
  onDragMove,
  onDragEnd,
  enabled = true,
  sensitivity = 1,
  minDragDistance = 5,
}: UseDragProps) => {
  const [dragState, setDragState] = useState<DragState>(initialDragState);
  const velocityRef = useRef<number>(0);
  const lastPositionRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const frameRef = useRef<number | null>(null);
  
  // Track velocity during drag
  const updateVelocity = useCallback(() => {
    if (!dragState.isDragging) return;
    
    const now = Date.now();
    const elapsed = now - lastTimeRef.current;
    
    if (elapsed > 0) {
      const delta = dragState.currentX - lastPositionRef.current;
      velocityRef.current = delta / elapsed * 16.67; // Normalize to roughly 60fps
    }
    
    lastPositionRef.current = dragState.currentX;
    lastTimeRef.current = now;
    
    frameRef.current = requestAnimationFrame(updateVelocity);
  }, [dragState.isDragging, dragState.currentX]);
  
  // Start drag
  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    if (!enabled) return;
    
    setDragState({
      isDragging: true,
      startX: clientX,
      startY: clientY,
      startTime: Date.now(),
      currentX: clientX,
      currentY: clientY,
      deltaX: 0,
      deltaY: 0,
    });
    
    lastPositionRef.current = clientX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    
    if (onDragStart) onDragStart();
    
    frameRef.current = requestAnimationFrame(updateVelocity);
  }, [enabled, onDragStart, updateVelocity]);
  
  // Continue drag
  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!dragState.isDragging) return;
    
    const deltaX = clientX - dragState.startX;
    const deltaY = clientY - dragState.startY;
    
    // Update state
    setDragState(prev => ({
      ...prev,
      currentX: clientX,
      currentY: clientY,
      deltaX,
      deltaY,
    }));
    
    // Call callback with delta scaled by sensitivity
    if (onDragMove && Math.abs(deltaX) > minDragDistance) {
      onDragMove(deltaX * sensitivity);
    }
  }, [dragState.isDragging, dragState.startX, dragState.startY, onDragMove, sensitivity, minDragDistance]);
  
  // End drag
  const handleDragEnd = useCallback(() => {
    if (!dragState.isDragging) return;
    
    // Clean up animation frame
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    
    // Calculate final velocity and direction
    const finalVelocity = velocityRef.current;
    
    // Reset state
    setDragState(initialDragState);
    
    // Call callback with final velocity
    if (onDragEnd && Math.abs(dragState.deltaX) > minDragDistance) {
      onDragEnd(finalVelocity);
    }
  }, [dragState.isDragging, dragState.deltaX, onDragEnd, minDragDistance]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);
  
  return {
    isDragging: dragState.isDragging,
    dragState,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
};

export default useDrag;