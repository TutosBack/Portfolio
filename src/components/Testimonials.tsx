import React from 'react';
import { Testimonial } from './types';

type TestimonialsProps = {
  testimonials: Testimonial[];
};

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => (
  <section className="card">
    <h2 className="section-title">What others say!!</h2>
    <p className="section-description">
      Some of the digital products that I have built, explore and try it now
    </p>
    <div className="testimonial-list">
      {testimonials.map((t, idx) => (
        <div key={idx} className="testimonial-item">
          <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
          <div className="testimonial-content">
            <p className="testimonial-feedback">"{t.feedback}"</p>
            <span className="testimonial-name">- {t.name}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials; 