import React, { useState, useEffect } from 'react';
import Rocket from './Rocket';
import '../styles/RocketAnimation.css';

const RocketAnimation = ({ autoLaunch = false, onLaunch = null }) => {
  const [rockets, setRockets] = useState([]);
  const [launchCount, setLaunchCount] = useState(0);

  // Launch a single rocket with animation
  const launchRocket = (rocketId) => {
    const rocket = {
      id: rocketId,
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 200, // Random horizontal position
      y: window.innerHeight - 200,
      progress: 0,
      showConfetti: false,
      wobble: 0,
      targetX: window.innerWidth / 2 + (Math.random() - 0.5) * 300, // Target destination
    };

    setRockets((prev) => [...prev, rocket]);

    // Animate the rocket
    let animationFrame;
    const startTime = Date.now();
    const duration = 4000; // Longer animation

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress < 1) {
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        const currentY = window.innerHeight - 200 - easeProgress * (window.innerHeight - 100);
        
        // Add some wobble and horizontal movement
        const wobble = Math.sin(progress * Math.PI * 8) * 20; // Oscillating wobble
        const horizontalDrift = (rocket.targetX - rocket.x) * easeProgress; // Drift toward target
        
        setRockets((prev) =>
          prev.map((r) =>
            r.id === rocketId
              ? {
                  ...r,
                  y: currentY,
                  x: rocket.x + horizontalDrift + wobble,
                  progress: progress,
                  wobble: wobble,
                }
              : r
          )
        );
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Show confetti and explosion
        setRockets((prev) =>
          prev.map((r) =>
            r.id === rocketId ? { ...r, showConfetti: true, progress: 1 } : r
          )
        );
        onLaunch?.();

        // Remove rocket after delay
        setTimeout(() => {
          setRockets((prev) => prev.filter((r) => r.id !== rocketId));
        }, 3000);
      }
    };

    animationFrame = requestAnimationFrame(animate);
  };

  // Auto launch rockets if enabled
  useEffect(() => {
    if (!autoLaunch) return;

    let launchInterval;
    let count = 0;

    const startAutoLaunch = () => {
      launchInterval = setInterval(() => {
        launchRocket(Date.now());
        count++;

        if (count >= 3) {
          clearInterval(launchInterval);
        }
      }, 1500);
    };

    startAutoLaunch();

    return () => clearInterval(launchInterval);
  }, [autoLaunch, onLaunch]);

  const handleLaunchMultiple = () => {
    const newCount = launchCount + 1;
    setLaunchCount(newCount);

    // Launch 3 rockets staggered
    launchRocket(`rocket-${newCount}-1`);
    setTimeout(() => launchRocket(`rocket-${newCount}-2`), 500);
    setTimeout(() => launchRocket(`rocket-${newCount}-3`), 1000);
  };

  return (
    <div className="rocket-animation-container">
      <div className="rocket-launch-area">
        {/* Render all active rockets */}
        {rockets.map((rocket, idx) => (
          <div key={rocket.id} style={{ 
            position: 'absolute', 
            left: `${rocket.x}px`,
            top: `${rocket.y}px`,
            transform: `rotate(${rocket.wobble * 0.1}deg)` // Slight rotation for realism
          }}>
            <div style={{ position: 'relative' }}>
              <Rocket y={0} x={0} size={80} variant="launch" />

              {/* Enhanced particle trails */}
              {rocket.progress > 0 && rocket.progress < 1 && (
                <>
                  <div className="particle-trail" style={{ 
                    top: `80px`,
                    left: `${Math.random() * 20 - 10}px`,
                    animationDelay: '0s'
                  }} />
                  <div className="particle-trail" style={{ 
                    top: `100px`,
                    left: `${Math.random() * 20 - 10}px`,
                    animationDelay: '0.1s'
                  }} />
                  <div className="particle-trail" style={{ 
                    top: `120px`,
                    left: `${Math.random() * 20 - 10}px`,
                    animationDelay: '0.2s'
                  }} />
                  <div className="particle-trail" style={{ 
                    top: `140px`,
                    left: `${Math.random() * 20 - 10}px`,
                    animationDelay: '0.3s'
                  }} />
                </>
              )}

              {/* Confetti explosion */}
              {rocket.showConfetti && (
                <div className="confetti-explosion" style={{ top: `0px` }}>
                  {[...Array(30)].map((_, i) => (
                    <div key={i} 
                         className="confetti-piece" 
                         style={{
                           backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                           animationDelay: `${Math.random() * 0.5}s`
                         }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="animation-controls">
        <div className="launch-instructions">
          <h3>🚀 Launch Animation</h3>
          <p><strong>How to use:</strong> Click the button below to launch 3 rockets with spectacular effects!</p>
          <p>Watch them soar with particle trails, realistic wobble, and colorful confetti explosions!</p>
        </div>
        <button className="launch-button" onClick={handleLaunchMultiple}>
          🚀 LAUNCH 3 ROCKETS
        </button>
        <p className="launch-count-text">Total Launches: {launchCount * 3}</p>
      </div>
    </div>
  );
};

export default RocketAnimation;
