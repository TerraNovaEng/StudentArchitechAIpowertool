import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import WorkshopCard from '../WorkshopCard.jsx';
import ContactForm from '../components/ContactForm.jsx';

function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  useEffect(() => {
    console.log("Firestore Database Object:", db);

    const fetchWorkshops = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'workshops'));
        const workshopData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || data.Title || 'Untitled workshop',
            description: data.description || data.Description || 'No description available',
            date: data.date || data.Date || '',
            price: data.price ?? data.Price ?? 0,
          };
        });
        
        // Add sample workshops if no workshops found
        if (workshopData.length === 0) {
          const sampleWorkshops = [
            {
              id: '1',
              title: 'Introduction to Robotics',
              description: 'Learn the basics of robotics, including sensors, motors, and programming simple robots.',
              date: 'May 15, 2026',
              price: 49
            },
            {
              id: '2',
              title: '3D Printing & Design',
              description: 'Master 3D modeling and printing techniques for creating custom parts and prototypes.',
              date: 'June 10, 2026',
              price: 79
            },
            {
              id: '3',
              title: 'Arduino Electronics',
              description: 'Build electronic circuits and projects using Arduino microcontrollers and sensors.',
              date: 'June 25, 2026',
              price: 59
            },
            {
              id: '4',
              title: 'Coding for STEM',
              description: 'Introduction to programming concepts using Python for scientific computing and data analysis.',
              date: 'July 5, 2026',
              price: 69
            },
            {
              id: '5',
              title: 'Physics of Flight',
              description: 'Explore aerodynamics, propulsion systems, and the physics behind flight and rocketry.',
              date: 'July 20, 2026',
              price: 89
            },
            {
              id: '6',
              title: 'Engineering of Earth Systems',
              description: 'Study ecosystems, climate change, and sustainable technologies through hands-on experiments.',
              date: 'August 3, 2026',
              price: 100
            }
          ];
          setWorkshops(sampleWorkshops);
          console.log("Using sample workshops:", sampleWorkshops);
        } else {
          setWorkshops(workshopData);
          console.log("Fetched workshops:", workshopData);
        }
      } catch (error) {
        console.error("Error fetching workshops:", error);
        setError(error.message || String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  const handleRegister = (workshop) => {
    setSelectedWorkshop(workshop);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedWorkshop(null);
  };

  const handleFormSubmit = (formData) => {
    console.log('Workshop signup:', selectedWorkshop.title, formData);
    // Here you could send data to a backend
  };

  return (
    <div>
      <header style={{ textAlign: 'center', padding: '20px', backgroundColor: '#282c34', color: 'white' }}>
        <h1>Our Workshops</h1>
        <p>Explore our available workshops</p>
      </header>

      <main style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding: '20px' }}>
        {error ? (
          <p style={{ color: '#ff6b6b' }}><strong>Error loading workshops:</strong> {error}</p>
        ) : loading ? (
          <p>Loading workshops...</p>
        ) : workshops.length === 0 ? (
          <p>No workshops found. Check your Firestore collection and config.</p>
        ) : (
          workshops.map(workshop => (
            <WorkshopCard
              key={workshop.id}
              title={workshop.title}
              description={workshop.description}
              date={workshop.date}
              price={workshop.price}
              onRegister={() => handleRegister(workshop)}
            />
          ))
        )}
      </main>

      {showForm && selectedWorkshop && (
        <ContactForm
          workshop={selectedWorkshop}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}

export default Workshops;