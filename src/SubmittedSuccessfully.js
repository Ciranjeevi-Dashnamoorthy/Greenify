import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskDetails.css';

const BG_VIDEO_URL = process.env.PUBLIC_URL + '/bg-green.mp4';

function SubmittedSuccessfully() {
  const navigate = useNavigate();

  return (
    <div className="task-details-root">
      <video
        className="bg-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={BG_VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="task-details-container" style={{ maxWidth: 420 }}>
  <div className="success-icon">✅</div>
  <h2 className="success-title">Proof Submitted!</h2>
  <p className="success-desc">
    Thank you for making an impact.<br />
    Your proof has been received successfully.
  </p>
  <button
    className="success-btn"
    onClick={() => navigate('/dashboard')}
  >
    Go to Dashboard
  </button>
</div>
    </div>
  );
}

export default SubmittedSuccessfully;