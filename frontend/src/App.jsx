import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Home />} /> {/* Scroll to services or separate page */}
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/contact" element={<Home />} /> {/* Contact could be a separate page or a scroll */}
      </Routes>
    </Router>
  );
}

export default App;
