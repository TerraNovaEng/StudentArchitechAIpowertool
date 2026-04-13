import React, { useState, useEffect, useRef } from 'react';
import Rocket from './Rocket';
import '../styles/RocketGame.css';

const RocketGame = ({ onLaunch = null }) => {
  const [gameState, setGameState] = useState({
    rocket: { x: window.innerWidth / 2, y: window.innerHeight - 150 },
    angle: 90,
    thrust: 0,
    vx: 0,
    vy: 0,
    isLaunched: false,
    altitude: 0,
    maxAltitude: 0,
    fuel: 100,
  });
  const [controls, setControls] = useState({ angle: 90, thrust: 0 });
  const [gameOver, setGameOver] = useState(false);
  const gameCanvasRef = useRef(null);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      setControls((prev) => {
        const newControls = { ...prev };
        if (e.key === 'ArrowLeft') newControls.angle = Math.max(0, prev.angle - 5);
        if (e.key === 'ArrowRight') newControls.angle = Math.min(180, prev.angle + 5);
        if (e.key === ' ') {
          e.preventDefault();
          newControls.thrust = Math.min(100, prev.thrust + 10);
        }
        return newControls;
      });
    };

    const handleKeyUp = (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        setControls((prev) => ({ ...prev, thrust: 0 }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game physics loop
  useEffect(() => {
    const gameLoop = setInterval(() => {
      setGameState((prev) => {
        if (!prev.isLaunched && controls.thrust === 0) {
          return { ...prev, angle: controls.angle };
        }

        let newState = { ...prev, angle: controls.angle };

        if (!newState.isLaunched && controls.thrust > 0) {
          newState.isLaunched = true;
          onLaunch?.(); // Call when rocket launches
        }

        if (newState.isLaunched && newState.fuel > 0) {
          const angleRad = (newState.angle * Math.PI) / 180;
          const thrustForce = (controls.thrust / 100) * 0.8; // Increased thrust

          newState.vx += Math.cos(angleRad) * thrustForce;
          newState.vy -= Math.sin(angleRad) * thrustForce;
          newState.fuel = Math.max(0, newState.fuel - controls.thrust / 30); // Slower fuel consumption
        }

        // Gravity (reduced for better gameplay)
        newState.vy -= 0.15;

        // Air resistance
        newState.vx *= 0.995;
        newState.vy *= 0.995;

        // Update position
        newState.rocket.x += newState.vx;
        newState.rocket.y += newState.vy;

        // Calculate altitude (from ground at innerHeight - 150)
        const groundLevel = window.innerHeight - 150;
        newState.altitude = Math.max(0, groundLevel - newState.rocket.y);
        newState.maxAltitude = Math.max(newState.maxAltitude, newState.altitude);

        // Check if crashed or landed
        if (newState.rocket.y >= groundLevel) {
          newState.rocket.y = groundLevel;
          newState.vx *= 0.7; // More bounce
          newState.vy = Math.abs(newState.vy) * -0.6; // Bounce back up

          if (Math.abs(newState.vy) < 1 && Math.abs(newState.vx) < 1) {
            // Stable landing
            newState.vx = 0;
            newState.vy = 0;
            if (newState.isLaunched) {
              setGameOver(true);
            }
          }
        }

        // Better boundaries - wrap around screen
        if (newState.rocket.x < -50) newState.rocket.x = window.innerWidth + 50;
        if (newState.rocket.x > window.innerWidth + 50) newState.rocket.x = -50;

        // Prevent going too high off screen
        if (newState.rocket.y < -100) {
          newState.rocket.y = -100;
          newState.vy = Math.max(0, newState.vy);
        }

        return newState;
      });
    }, 20); // Faster update rate

    return () => clearInterval(gameLoop);
  }, [controls]);

  const handleReset = () => {
    const groundLevel = window.innerHeight - 150;
    setGameState({
      rocket: { x: window.innerWidth / 2, y: groundLevel },
      angle: 90,
      thrust: 0,
      vx: 0,
      vy: 0,
      isLaunched: false,
      altitude: 0,
      maxAltitude: 0,
      fuel: 100,
    });
    setControls({ angle: 90, thrust: 0 });
    setGameOver(false);
  };

  // Angle adjustment buttons (mobile support)
  const adjustAngle = (delta) => {
    setControls((prev) => ({
      ...prev,
      angle: Math.max(0, Math.min(180, prev.angle + delta)),
    }));
  };

  return (
    <div className="rocket-game-container" ref={gameCanvasRef}>
      <div className="game-canvas">
        {/* Ground line */}
        <div className="ground-line" />

        {/* Rocket */}
        <div className="rocket-game-wrapper">
          <Rocket
            x={gameState.rocket.x - 30}
            y={gameState.rocket.y - 40}
            size={60}
            rotation={180 - gameState.angle}
            variant="game"
          />
        </div>

        {/* Game info display */}
        <div className="game-info">
          <div className="info-item">
            <span className="info-label">ANGLE:</span>
            <span className="info-value">{gameState.angle}°</span>
          </div>
          <div className="info-item">
            <span className="info-label">ALTITUDE:</span>
            <span className="info-value">{Math.floor(gameState.altitude)}m</span>
          </div>
          <div className="info-item">
            <span className="info-label">MAX ALT:</span>
            <span className="info-value">{Math.floor(gameState.maxAltitude)}m</span>
          </div>
          <div className="info-item">
            <span className="info-label">FUEL:</span>
            <div className="fuel-bar">
              <div className="fuel-fill" style={{ width: `${gameState.fuel}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Controls section */}
      <div className="game-controls">
        <div className="control-info">
          <h3>🎮 How to Play Rocket Game</h3>
          <div className="instructions">
            <p><strong>🎯 Goal:</strong> Launch your rocket and maximize altitude with limited fuel!</p>
            <p><strong>🖥️ Desktop Controls:</strong></p>
            <ul>
              <li>⬅️ ➡️ <strong>Arrow keys</strong> to adjust launch angle (0-180°)</li>
              <li>🚀 <strong>Spacebar</strong> to apply thrust (hold for more power)</li>
              <li>🎮 Use angle to aim, thrust to launch!</li>
            </ul>
            <p><strong>📱 Mobile Controls:</strong> Use the buttons below</p>
          </div>
        </div>

        <div className="mobile-controls">
          <button className="angle-btn" onClick={() => adjustAngle(-5)}>
            ⬅️ Left
          </button>
          <button className="angle-btn" onClick={() => adjustAngle(5)}>
            Right ➡️
          </button>
          <button
            className="thrust-btn"
            onMouseDown={() => setControls((prev) => ({ ...prev, thrust: 100 }))}
            onMouseUp={() => setControls((prev) => ({ ...prev, thrust: 0 }))}
            onTouchStart={() => setControls((prev) => ({ ...prev, thrust: 100 }))}
            onTouchEnd={() => setControls((prev) => ({ ...prev, thrust: 0 }))}
          >
            🔥 THRUST
          </button>
        </div>

        <button className="reset-button" onClick={handleReset}>
          {gameOver ? '🔄 Try Again' : '🔄 Reset'}
        </button>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="game-over-modal">
          <div className="modal-content">
            <h2>🎯 Mission Complete!</h2>
            <div className="result-stats">
              <div className="stat">
                <span className="stat-label">Maximum Altitude Reached:</span>
                <span className="stat-value">{Math.floor(gameState.maxAltitude)}m</span>
              </div>
              <div className="stat">
                <span className="stat-label">Performance:</span>
                <span className="stat-value">
                  {gameState.maxAltitude > 500
                    ? '⭐⭐⭐ Excellent!'
                    : gameState.maxAltitude > 300
                    ? '⭐⭐ Good!'
                    : '⭐ Nice try!'}
                </span>
              </div>
            </div>
            <button className="modal-btn" onClick={handleReset}>
              🚀 Launch Another Rocket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RocketGame;
