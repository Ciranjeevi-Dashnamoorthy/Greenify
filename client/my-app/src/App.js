import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';
import Login from './Login.js';

function LandingPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="title"
      >
        Greenify
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="tagline"
      >
        Play. Act. Impact.
      </motion.p>

      <motion.p
        className="overview"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Join Greenify and turn your daily actions into eco-missions. Earn GreenCoins, evolve your avatar, and make a real-world environmental impact.
      </motion.p>

      <motion.div
        className="cta-buttons"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <button className="join-btn">Join the Movement</button>
        <button className="login-btn" onClick={handleLoginClick}>Login / Sign Up</button>
      </motion.div>

      <motion.div
        className="avatar-progress"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="evolution">🌱 Seedling → 🌿 Planter → ♻ Recycler → 🛡 Guardian → 🌟 EcoLegend</p>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;