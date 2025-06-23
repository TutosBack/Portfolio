import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Work } from './types';

type WorksProps = {
  works: Work[];
};

const Works: React.FC<WorksProps> = ({ works }) => (
  <section className="card">
    <h2 className="section-title">My Works</h2>
    <p className="section-description">
      Discover my portfolio, where purposeful interfaces meet captivating design. My work strives to enhance experiences and inspire.
    </p>
    <div className="work-list">
      {works.map((work, index) => (
        <div key={index} className="work-item">
          <div className="work-info">
            <img src={work.icon} alt={work.title} className="work-icon" />
            <div className="work-details">
              <h3>{work.title}</h3>
              <p>{work.subtitle}</p>
            </div>
          </div>
          <ExternalLink size={20} color="#9ca3af" />
        </div>
      ))}
    </div>
  </section>
);

export default Works; 