import React from 'react';
import '../styles/Rocket.css';

const Rocket = ({ x = 0, y = 0, size = 50, rotation = 0, variant = 'default' }) => {
  return (
    <svg
      className={`rocket rocket-${variant}`}
      width={size}
      height={size * 1.5}
      viewBox="0 0 100 150"
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Flame */}
      <g className="flame">
        <ellipse cx="50" cy="140" rx="20" ry="30" fill="#FF4500" opacity="0.8" />
        <ellipse cx="45" cy="135" rx="12" ry="20" fill="#FFD700" opacity="0.9" />
        <ellipse cx="55" cy="135" rx="12" ry="20" fill="#FFD700" opacity="0.9" />
        <polygon points="40,130 50,120 60,130" fill="#FF8C00" opacity="0.7" />
      </g>

      {/* Body */}
      <rect x="35" y="30" width="30" height="80" fill="#FF6347" rx="5" />

      {/* Window */}
      <circle cx="50" cy="45" r="8" fill="#87CEEB" />
      <circle cx="50" cy="45" r="6" fill="#E0FFFF" opacity="0.5" />

      {/* Fins */}
      <polygon points="35,80 20,100 35,90" fill="#FFD700" />
      <polygon points="65,80 80,100 65,90" fill="#FFD700" />
      <polygon points="35,100 20,120 35,110" fill="#FF8C00" />
      <polygon points="65,100 80,120 65,110" fill="#FF8C00" />

      {/* Nose cone */}
      <polygon points="50,5 35,30 65,30" fill="#DC143C" />
    </svg>
  );
};

export default Rocket;
