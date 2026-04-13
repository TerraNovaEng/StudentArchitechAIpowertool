import React from 'react';

function Home() {
  return (
    <div>
      <header style={{ textAlign: 'center', padding: '20px', backgroundColor: '#282c34', color: 'white' }}>
        <h1>TerraNova Engineering Lab</h1>
        <p>Aerospace & STEM Excellence in Milford</p>
      </header>

      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Welcome to TerraNova Engineering Lab</h2>
        <p>Discover our exciting workshops and programs designed to inspire the next generation of engineers and innovators.</p>
        
        <div style={{ margin: '30px 0' }}>
          <h3>Explore Our Programs</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', margin: '20px 0' }}>
            <a href="/rockets" style={{
              display: 'inline-block',
              padding: '15px 25px',
              backgroundColor: '#ff6b35',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}>
              🚀 Rocket Experiences
            </a>
            <a href="/workshops" style={{
              display: 'inline-block',
              padding: '15px 25px',
              backgroundColor: '#4ecdc4',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}>
              🔬 STEM Workshops
            </a>
          </div>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
            Interactive rocket simulations and hands-on science workshops for all ages
          </p>
        </div>
      </main>
    </div>
  );
}

export default Home;