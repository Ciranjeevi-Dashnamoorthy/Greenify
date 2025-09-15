import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './TaskDetails.css';

function SubmittedSuccessfully() {
  const navigate = useNavigate();
  const location = useLocation();
  const { points = 0 } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="task-details-root">
      <div className="task-details-container">
        <motion.div
          className="eco-success-motion"
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 40 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <span className="eco-success-emoji">🎉</span>
          <h3 className="eco-success-title">Success!</h3>
          <p className="eco-success-points">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="eco-points-badge"
            >
              +{points} Eco Points
            </motion.span>
          </p>
          <p className="eco-success-desc">
            You just made a positive impact!<br />
            <span style={{ color: "#43a047" }}>Nature is Healing</span>
          </p>
          <p className="eco-success-redirect">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    </div>
  );
}

export default SubmittedSuccessfully;