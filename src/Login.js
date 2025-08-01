import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    // If login is successful, redirect:
    navigate('/dashboard'); // Change '/dashboard' to your desired route
  };



  return (
    <div className="login-page-bg">
      <video
      autoPlay
      loop
      muted
      playsInline
      className="bg-video"
      src="/green-bg.mp4"
      type="video/mp4"
    />
      <div className="login-flex-wrapper">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>

        <div className="why-join-section">
          <h3>Why Join Us?</h3>
          <p className="why-join-para">
            Greenify is more than just an app—it's a movement! By joining, you become part of a vibrant community dedicated to making the world greener, one action at a time. Track your eco-journey, earn badges, compete in challenges, and inspire others. Every small step counts—let's create a sustainable future together!
          </p>
          <div className="why-join-boxes">
            <div className="why-join-box">
              <span role="img" aria-label="badge">🏅</span>
              <div className="why-join-title">Earn Badges & Eco Points</div>
              <div className="why-join-desc">Get rewarded for every green action you take.</div>
            </div>
            <div className="why-join-box">
              <span role="img" aria-label="community">🤝</span>
              <div className="why-join-title">Join a Community</div>
              <div className="why-join-desc">Connect with others who care about the planet.</div>
            </div>
            <div className="why-join-box">
              <span role="img" aria-label="challenge">🌍</span>
              <div className="why-join-title">Take on Challenges</div>
              <div className="why-join-desc">Participate in fun eco-challenges and events.</div>
            </div>
            <div className="why-join-box">
              <span role="img" aria-label="impact">📊</span>
              <div className="why-join-title">See Your Impact</div>
              <div className="why-join-desc">Track your progress and real-world environmental impact.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default Login;