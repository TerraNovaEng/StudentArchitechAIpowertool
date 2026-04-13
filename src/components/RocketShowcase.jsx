import React, { useState } from 'react';
import Rocket from './Rocket';
import ContactForm from './ContactForm';
import '../styles/RocketShowcase.css';

const RocketShowcase = ({ workshops = [] }) => {
  const [launchedRockets, setLaunchedRockets] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const defaultWorkshops = [
    { id: 1, title: 'Rocket Design Basics', description: 'Learn the fundamentals of rocket design and engineering principles' },
    { id: 2, title: 'Space Mission Planning', description: 'Master mission planning and orbital mechanics for space exploration' },
    { id: 3, title: 'Propulsion Systems', description: 'Explore different rocket propulsion technologies and their applications' },
    { id: 4, title: 'Astronaut Training', description: 'Experience astronaut training simulations and space environment challenges' },
  ];

  const workshopList = workshops.length > 0 ? workshops : defaultWorkshops;

  const handleLaunchRocket = (workshop) => {
    if (launchedRockets.has(workshop.id)) {
      // Already launched, reset it
      setLaunchedRockets((prev) => {
        const newSet = new Set(prev);
        newSet.delete(workshop.id);
        return newSet;
      });
    } else {
      // Launch and show form after animation
      setLaunchedRockets((prev) => new Set(prev).add(workshop.id));
      
      // Show form after rocket animation completes
      setTimeout(() => {
        setSelectedWorkshop(workshop);
        setShowForm(true);
      }, 1500);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedWorkshop(null);
    // Reset the rocket
    setLaunchedRockets((prev) => {
      const newSet = new Set(prev);
      newSet.delete(selectedWorkshop.id);
      return newSet;
    });
  };

  const handleFormSubmit = (formData) => {
    console.log('Workshop signup:', selectedWorkshop.title, formData);
    // Here you could send data to a backend
  };

  return (
    <div className="rocket-showcase">
      <h2>🚀 Launch Your Workshop Journey</h2>
      <p className="showcase-subtitle">
        <strong>How to register:</strong> Click "🚀 Launch" on any workshop below.<br/>
        Watch the rocket animation, then fill out the registration form that appears!
      </p>
      
      <div className="showcase-grid">
        {workshopList.map((workshop, index) => (
          <div
            key={workshop.id}
            className={`workshop-card rocket-card ${
              launchedRockets.has(workshop.id) ? 'launched' : ''
            }`}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="rocket-container">
              {launchedRockets.has(workshop.id) && (
                <div className="launch-animation">
                  <Rocket size={40} variant={`card-${index}`} />
                </div>
              )}
            </div>

            <h3>{workshop.title}</h3>
            <p>{workshop.description}</p>

            <button
              className="workshop-launch-btn"
              onClick={() => handleLaunchRocket(workshop)}
            >
              {launchedRockets.has(workshop.id) ? '🛸 Launching...' : '🚀 Launch'}
            </button>
          </div>
        ))}
      </div>

      {showForm && selectedWorkshop && (
        <ContactForm
          workshop={selectedWorkshop}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default RocketShowcase;
