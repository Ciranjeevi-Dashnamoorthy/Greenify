import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';
import Login from './Login.js';
import Dashboard from './Dashboard';
import TaskDetails from './TaskDetails';
import SubmittedSuccessfully from './SubmittedSuccessfully';
import CreateEcoTask from './CreateEcoTask';
import Profile from './Profile.js';
import EcoEventPage from './EcoEventPage';
import NewEcoTaskPage from './NewEcoTaskPage';


function LandingPage() {
  const navigate = useNavigate();

  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.7 }
    })
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i = 1) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.08, duration: 0.5 }
    })
  };

  const ecoInitiatives = [
    { icon: "♻️", title: "Recycling", desc: "Recycle plastic, paper, and more" },
    { icon: "🧹", title: "Cleanup Drives", desc: "Beach & park cleanups" },
    { icon: "🌳", title: "Tree Plantation", desc: "Plant and care for saplings" },
    { icon: "💡", title: "Energy Conservation", desc: "Turn off unused devices" },
    { icon: "🚿", title: "Water Saving", desc: "Fix leaks, use bucket showers" },
    { icon: "🚲", title: "Sustainable Transport", desc: "Cycle or use public transport" },
    { icon: "🍃", title: "Composting", desc: "Turn food waste into fertilizer" },
    { icon: "🛒", title: "Eco-Friendly Shopping", desc: "Choose sustainable products" }
  ];

  const features = [
    { icon: "🏅", title: "Earn Eco Points & Badges" },
    { icon: "🤝", title: "Community Challenges" },
    { icon: "📸", title: "Upload Proof (Photos/Videos)" },
    { icon: "🌍", title: "Track Environmental Impact", desc: "(CO₂ saved, waste reduced)" },
    { icon: "📍", title: "Geo-tagging & Real-Time Feed" },
    { icon: "📊", title: "Personal Progress Dashboard" },
    { icon: "🔔", title: "Reminders & Notifications" }
  ];

  const impacts = [
    { number: "5,000+", label: "Tasks Completed" },
    { number: "2.5 Tons", label: "Plastic Recycled" },
    { number: "300", label: "Trees Planted" },
    { number: "50+", label: "Cleanup Events" },
    { number: "1,200+", label: "Active Users" },
    { number: "15", label: "Cities Reached" }
  ];

  return (
    <div className="landing-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="title"
      >
        Civic Audit
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
        Join Civic Audit and turn your daily actions into eco-missions. Earn GreenCoins, evolve your avatar, and make a real-world environmental impact.
      </motion.p>

      <motion.div
        className="cta-buttons"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <button className="join-btn">Join the Movement</button>
        <button className="login-btn" onClick={() => navigate('/login')}>Login / Sign Up</button>
      </motion.div>

      <motion.div
        className="avatar-progress"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="evolution">🌱 Seedling → 🌿 Planter → ♻ Recycler → 🛡 Guardian → 🌟 EcoLegend</p>
      </motion.div>

      {/* Animated Eco Initiatives Section */}
      <motion.div
        className="landing-section"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
      >
        <h3>Featured Eco Initiatives</h3>
        <div className="landing-cards">
          {ecoInitiatives.map((item, idx) => (
            <motion.div
              className="landing-card"
              key={item.title}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx}
            >
              <span>{item.icon}</span>
              <div className="card-title">{item.title}</div>
              <div className="card-desc">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Animated Features Section */}
      <motion.div
        className="landing-section"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
      >
        <h3>Features</h3>
        <div className="landing-cards">
          {features.map((item, idx) => (
            <motion.div
              className="landing-card"
              key={item.title}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx}
            >
              <span>{item.icon}</span>
              <div className="card-title">{item.title}</div>
              {item.desc && <div className="card-desc">{item.desc}</div>}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Animated Impact Section */}
      <motion.div
        className="landing-section"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
      >
        <h3>Our Impact</h3>
        <div className="landing-impact">
          {impacts.map((item, idx) => (
            <motion.div
              className="impact-card"
              key={item.label}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx}
            >
              <div className="impact-number">{item.number}</div>
              <div className="impact-label">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ...rest of your App component remains unchanged...

function App() {
  return (
     <>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="bg-video"
        src="/green-bg.mp4"
        type="video/mp4"
      />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task/:taskId" element={<TaskDetails />} />
          <Route path="/submitted-successfully" element={<SubmittedSuccessfully />} />
          <Route path="/create-eco-task" element={<CreateEcoTask />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/event/:eventId" element={<EcoEventPage />} />
          <Route path="/new-eco-task" element={<NewEcoTaskPage />} />
          
          
        </Routes>
      </Router>
    </>
  );
}

export default App;