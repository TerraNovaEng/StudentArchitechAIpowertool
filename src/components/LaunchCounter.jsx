import React, { useState, useEffect } from 'react';
import '../styles/LaunchCounter.css';

const LaunchCounter = ({ onMilestone = null, totalLaunches = 0 }) => {
  const [count, setCount] = useState(totalLaunches);
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestone, setMilestone] = useState(0);

  // Update count when totalLaunches changes
  useEffect(() => {
    setCount(totalLaunches);
  }, [totalLaunches]);

  const handleLaunch = () => {
    const newCount = count + 1;
    setCount(newCount);

    // Check for milestones (10, 25, 50, 100, etc.)
    if (newCount % 10 === 0) {
      setMilestone(newCount);
      setShowMilestone(true);
      onMilestone?.(newCount);

      setTimeout(() => setShowMilestone(false), 2000);
    }
  };

  // Animated counter display
  const displayCount = Math.floor(count);

  const getAchievement = () => {
    if (displayCount === 0) return '🤔 Getting Started';
    if (displayCount < 10) return '🚀 Novice Pilot';
    if (displayCount < 25) return '🌟 Learner';
    if (displayCount < 50) return '⭐ Expert';
    if (displayCount < 100) return '👑 Master';
    return '🏆 Legend';
  };

  return (
    <div className="launch-counter-container">
      <div className="counter-main">
        <div className="counter-box">
          <h2>🚀 Launch Statistics</h2>
          <p className="counter-description">
            <strong>How it works:</strong> This counter tracks ALL your rocket launches across the app!<br/>
            Launches from the Animation tab and Game tab are automatically counted here.
          </p>
          
          <div className="counter-display">
            <span className="counter-number">{displayCount}</span>
            <span className="counter-unit">🚀</span>
          </div>
          <p className="counter-label">Total Rockets Launched</p>

          <div className="achievement-badge">
            <span className="achievement-title">{getAchievement()}</span>
          </div>

          <button className="launch-count-btn" onClick={handleLaunch}>
            🚀 Manual Launch +1
          </button>
          <p className="manual-note">Or launch rockets in the Animation & Game tabs above!</p>

          {showMilestone && (
            <div className="milestone-notification">
              <span className="milestone-text">🎉 Milestone Reached! {milestone} Launches! 🎉</span>
            </div>
          )}
        </div>

        {/* Stats and Achievement display */}
        <div className="stats-box">
          <div className="achievement-section">
            <h3>Current Achievement</h3>
            <div className="achievement-badge">
              <span className="achievement-icon">
                {displayCount === 0
                  ? '🤔'
                  : displayCount < 10
                  ? '🚀'
                  : displayCount < 25
                  ? '🌟'
                  : displayCount < 50
                  ? '⭐'
                  : displayCount < 100
                  ? '👑'
                  : '🏆'}
              </span>
              <span className="achievement-name">{getAchievement()}</span>
            </div>
          </div>

          <div className="stats-section">
            <h3>Progress Tracker</h3>
            <div className="stat-item">
              <span className="stat-label">To Next Level:</span>
              <span className="stat-value">
                {displayCount === 0
                  ? '10'
                  : displayCount < 10
                  ? 10 - displayCount
                  : displayCount < 25
                  ? 25 - displayCount
                  : displayCount < 50
                  ? 50 - displayCount
                  : displayCount < 100
                  ? 100 - displayCount
                  : '∞'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Sessions to Legend:</span>
              <span className="stat-value">{Math.max(0, 100 - displayCount)}</span>
            </div>
          </div>

          <div className="achievement-levels">
            <h3>Achievement Levels</h3>
            <div className="level">
              <span className="level-icon">🚀</span>
              <span className="level-name">Novice Pilot</span>
              <span className="level-requires">10 launches</span>
            </div>
            <div className="level">
              <span className="level-icon">🌟</span>
              <span className="level-name">Learner</span>
              <span className="level-requires">25 launches</span>
            </div>
            <div className="level">
              <span className="level-icon">⭐</span>
              <span className="level-name">Expert</span>
              <span className="level-requires">50 launches</span>
            </div>
            <div className="level">
              <span className="level-icon">👑</span>
              <span className="level-name">Master</span>
              <span className="level-requires">100 launches</span>
            </div>
            <div className="level">
              <span className="level-icon">🏆</span>
              <span className="level-name">Legend</span>
              <span className="level-requires">Hero Status!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchCounter;
