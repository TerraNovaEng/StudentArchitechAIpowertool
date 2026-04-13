import React, { useState } from 'react';
import RocketAnimation from '../components/RocketAnimation';
import RocketGame from '../components/RocketGame';
import RocketParticleSystem from '../components/RocketParticleSystem';
import RocketShowcase from '../components/RocketShowcase';
import LaunchCounter from '../components/LaunchCounter';
import RocketBackground from '../components/RocketBackground';
import '../styles/Rockets.css';

const Rockets = () => {
  const [activeTab, setActiveTab] = useState('animation');
  const [launchCount, setLaunchCount] = useState(0);

  const tabs = [
    { id: 'animation', label: '🚀 Launch Animation', icon: '↑' },
    { id: 'game', label: '🎮 Rocket Game', icon: '🎯' },
    { id: 'particles', label: '✨ Particle System', icon: '💥' },
    { id: 'showcase', label: '🌟 Workshop Showcase', icon: '📊' },
    { id: 'counter', label: '🏆 Achievements', icon: '👑' },
  ];

  const handleMilestone = (count) => {
    setLaunchCount(count);
  };

  const handleAnimationLaunch = () => {
    setLaunchCount(prev => prev + 1);
  };

  const handleGameLaunch = () => {
    setLaunchCount(prev => prev + 1);
  };

  return (
    <div className="rockets-page">
      <RocketBackground />

      <div className="rockets-container">
        <header className="rockets-header">
          <h1>🚀 Welcome to Rocket World 🚀</h1>
          <p>Experience the awesome power of interactive rockets!</p>
        </header>

        <div className="tab-navigation">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              title={tab.label}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'animation' && (
            <section className="content-section">
              <RocketAnimation onLaunch={handleAnimationLaunch} />
            </section>
          )}

          {activeTab === 'game' && (
            <section className="content-section">
              <RocketGame onLaunch={handleGameLaunch} />
            </section>
          )}

          {activeTab === 'particles' && (
            <section className="content-section">
              <RocketParticleSystem />
            </section>
          )}

          {activeTab === 'showcase' && (
            <section className="content-section">
              <RocketShowcase />
            </section>
          )}

          {activeTab === 'counter' && (
            <section className="content-section">
              <LaunchCounter onMilestone={handleMilestone} totalLaunches={launchCount} />
            </section>
          )}
        </div>

        <footer className="rockets-footer">
          <p>✨ Total Launches Tracked: <span className="launch-count">{launchCount}</span> 🚀</p>
          <p>Have fun launching rockets and exploring the cosmos!</p>
        </footer>
      </div>
    </div>
  );
};

export default Rockets;
