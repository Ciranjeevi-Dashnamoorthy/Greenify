<<<<<<< HEAD
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          dhamu
        </a>
      </header>
=======
import React from 'react';
import { motion } from 'framer-motion';
import './App.css'; // Add styles here

function App() {
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
        <button className="login-btn">Login / Sign Up</button>
      </motion.div>

      <motion.div
        className="avatar-progress"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="evolution">🌱 Seedling → 🌿 Planter → ♻️ Recycler → 🛡️ Guardian → 🌟 EcoLegend</p>
      </motion.div>
>>>>>>> 6024234 (landing page)
    </div>
  );
}

export default App;
