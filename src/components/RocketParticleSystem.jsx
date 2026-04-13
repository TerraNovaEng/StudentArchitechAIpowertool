import React, { useState, useCallback } from 'react';
import Rocket from './Rocket';
import '../styles/RocketParticleSystem.css';

const RocketParticleSystem = () => {
  const [rockets, setRockets] = useState([]);
  const [particles, setParticles] = useState([]);

  const handleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create rocket at click position
    const rocketId = Date.now();
    setRockets((prev) => [
      ...prev,
      {
        id: rocketId,
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: -Math.random() * 10 - 5,
        lifetime: 3000,
        startTime: Date.now(),
      },
    ]);

    // Create particles
    const newParticles = [];
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 2;
      const speed = Math.random() * 3 + 2;
      newParticles.push({
        id: `${rocketId}-${i}`,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        lifetime: 2000,
        startTime: Date.now(),
        color: ['#FFD700', '#FF8C00', '#FF6347'][Math.floor(Math.random() * 3)],
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
  }, []);

  // Animation loop
  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      // Update rockets
      setRockets((prev) => {
        const updated = prev
          .map((rocket) => ({
            ...rocket,
            x: rocket.x + rocket.vx,
            y: rocket.y + rocket.vy,
            vy: rocket.vy - 0.1, // Gravity
          }))
          .filter((rocket) => now - rocket.startTime < rocket.lifetime);

        return updated;
      });

      // Update particles
      setParticles((prev) => {
        const updated = prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy - 0.05, // Gravity
            opacity: 1 - (now - particle.startTime) / particle.lifetime,
          }))
          .filter((particle) => now - particle.startTime < particle.lifetime);

        return updated;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="particle-system-container" onClick={handleClick}>
      <div className="particle-canvas">
        {/* Render rockets */}
        {rockets.map((rocket) => (
          <div key={rocket.id} style={{ position: 'absolute' }}>
            <Rocket
              x={rocket.x - 25}
              y={rocket.y - 40}
              size={50}
              rotation={Math.atan2(-rocket.vy, rocket.vx) * (180 / Math.PI)}
              variant="particle"
            />
          </div>
        ))}

        {/* Render particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      <div className="particle-hint">
        <p>✨ Click anywhere to launch rockets! ✨</p>
      </div>
    </div>
  );
};

export default RocketParticleSystem;
