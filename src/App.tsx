import React from 'react';
import { Home, Sparkles, ShoppingCart, Phone } from 'lucide-react';
import Hero from './components/Hero';
import TechStackCarousel from './components/TechStackCarousel';
import Works from './components/Works';
import Testimonials from './components/Testimonials';
import { profile, works, carouselItems, testimonials } from './data/profile';

function App() {
  return (
    <div>
      <nav>
        <div className="nav-container">
          <div className="nav-links">
            <a href="#"><Home size={20} /></a>
            <a href="#"><Sparkles size={20} /></a>
            <a href="#"><ShoppingCart size={20} /></a>
            <a href="#"><Phone size={20} /></a>
          </div>
          <button className="hire-button">Hire Me</button>
        </div>
      </nav>
      <main>
        <div className="container">
          <Hero {...profile} />
          <TechStackCarousel items={carouselItems} />
          <Works works={works} />
          <Testimonials testimonials={testimonials} />
        </div>
      </main>
    </div>
  );
}

export default App;