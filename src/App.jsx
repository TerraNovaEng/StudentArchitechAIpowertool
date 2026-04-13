import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Workshops from './pages/Workshops';
import Rockets from './pages/Rockets';
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/rockets" element={<Rockets />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
