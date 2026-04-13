import React, { useState, useEffect } from 'react';
import Rocket from './Rocket';
import '../styles/RocketBackground.css';

const RocketBackground = () => {
  const [rockets, setRockets] = useState([]);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Generate initial rockets
  useEffect(() => {
    const initialRockets = [
      { id: 1, speed: 0.3, size: 30, startX: 10, variant: 'bg-1' },
      { id: 2, speed: 0.5, size: 40, startX: 30, variant: 'bg-2' },
      { id: 3, speed: 0.2, size: 25, startX: 60, variant: 'bg-3' },
      { id: 4, speed: 0.7, size: 35, startX: 80, variant: 'bg-4' },
      { id: 5, speed: 0.25, size: 30, startX: 20, variant: 'bg-5' },
    ];
    setRockets(initialRockets);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="rocket-background">
      {rockets.map((rocket) => (
        <div
          key={rocket.id}
          className="background-rocket"
          style={{
            left: `${rocket.startX}%`,
            top: `${scrollOffset * rocket.speed}px`,
            opacity: 0.6,
            zIndex: -1,
          }}
        >
          <Rocket size={rocket.size} variant={rocket.variant} />
        </div>
      ))}

      {/* Stars layer */}
      <div className="stars">
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RocketBackground;
