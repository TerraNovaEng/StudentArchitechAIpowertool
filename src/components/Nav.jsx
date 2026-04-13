import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav style={{
      backgroundColor: '#f8f9fa',
      padding: '10px 20px',
      borderBottom: '1px solid #dee2e6',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#282c34', fontWeight: 'bold', fontSize: '1.2em' }}>
          TerraNova Engineering Lab
        </Link>
        <div>
          <Link to="/" style={{ margin: '0 10px', textDecoration: 'none', color: '#007bff' }}>Home</Link>
          <Link to="/workshops" style={{ margin: '0 10px', textDecoration: 'none', color: '#007bff' }}>Workshops</Link>
          <Link to="/rockets" style={{ margin: '0 10px', textDecoration: 'none', color: '#FF6347', fontWeight: 'bold' }}>🚀 Rockets</Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;