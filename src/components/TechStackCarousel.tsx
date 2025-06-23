import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import { CarouselItem } from './types';
import { Code2, Database, Cloud, Wrench, Globe, Cpu } from 'lucide-react';

type TechStackCarouselProps = {
  items: CarouselItem[];
};

const getCategoryIcon = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'frontend':
      return <Globe size={20} />;
    case 'backend':
      return <Cpu size={20} />;
    case 'database':
      return <Database size={20} />;
    case 'cloud':
      return <Cloud size={20} />;
    case 'devops':
      return <Wrench size={20} />;
    case 'tools':
      return <Wrench size={20} />;
    case 'language':
      return <Code2 size={20} />;
    default:
      return <Code2 size={20} />;
  }
};

const getLevelColor = (level: string) => {
  switch (level?.toLowerCase()) {
    case 'expert':
      return '#10b981'; // green
    case 'advanced':
      return '#3b82f6'; // blue
    case 'intermediate':
      return '#f59e0b'; // amber
    case 'beginner':
      return '#ef4444'; // red
    default:
      return '#6b7280'; // gray
  }
};

const TechStackCarousel: React.FC<TechStackCarouselProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(items[0] || null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Handle responsive screen size detection
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectItem = (item: CarouselItem) => {
    setSelectedItem(item);
  };

  return (
    <section className="card tech-stack-section">
      <div className="tech-stack-header">
        <h2 className="section-title">Tech Stack & Expertise</h2>
        <p className="section-description">
          Technologies and tools I use to build exceptional digital experiences
        </p>
      </div>
      
      <div className="tech-stack-content">
        <div className="carousel-section">
          <Carousel 
            items={items}
            radius={isLargeScreen ? 250 : 140}
            axis={isLargeScreen ? 'x' : 'y'}
            autoRotate={true}
            autoRotateSpeed={4000}
            onSelectItem={handleSelectItem}
            className={`tech-carousel tech-carousel--${isLargeScreen ? 'vertical' : 'horizontal'}`}
          />
        </div>
        
        <div className="tech-details-section">
          {selectedItem && (
            <div className="selected-tech-card">
              <div className="tech-card-header">
                <div className="tech-icon-wrapper">
                  {getCategoryIcon(selectedItem.category || '')}
                </div>
                <div className="tech-title-group">
                  <h3 className="tech-title">{selectedItem.title}</h3>
                  <div className="tech-meta">
                    <span className="tech-category">{selectedItem.category}</span>
                    <span 
                      className="tech-level"
                      style={{ color: getLevelColor(selectedItem.level || '') }}
                    >
                      {selectedItem.level}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="tech-description">{selectedItem.description}</p>
              
              <div className="tech-stats">
                <div className="tech-stat">
                  <span className="stat-label">Experience</span>
                  <span className="stat-value">
                    {selectedItem.yearsOfExperience}+ years
                  </span>
                </div>
                <div className="tech-stat">
                  <span className="stat-label">Proficiency</span>
                  <div className="proficiency-bar">
                    <div 
                      className="proficiency-fill"
                      style={{ 
                        width: selectedItem.level === 'Expert' ? '95%' : 
                               selectedItem.level === 'Advanced' ? '80%' : 
                               selectedItem.level === 'Intermediate' ? '65%' : '40%',
                        backgroundColor: getLevelColor(selectedItem.level || '')
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="tech-grid">
            {items.map((item) => (
              <div
                key={item.id}
                className={`tech-grid-item ${selectedItem && selectedItem.id === item.id ? 'active' : ''}`}
                onClick={() => handleSelectItem(item)}
              >
                <div className="grid-item-icon">
                  {getCategoryIcon(item.category || '')}
                </div>
                <span className="grid-item-title">{item.title}</span>
                <div 
                  className="grid-item-level"
                  style={{ backgroundColor: getLevelColor(item.level || '') }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackCarousel;