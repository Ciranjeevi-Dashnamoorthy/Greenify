import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onSnapshot } from "firebase/firestore";

function Dashboard() {
  const [userName, setUserName] = useState('');
  const [ecoPoints, setEcoPoints] = useState(0);
  const [recentTasks, setRecentTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const navigate = useNavigate();


useEffect(() => {
  let unsub;
  const listenUser = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      unsub = onSnapshot(userRef, (userSnap) => {
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserName(data.name || user.email);
          setEcoPoints(data.ecoPoints || 0);
          setRecentTasks(Array.isArray(data.recentTasks) ? [...data.recentTasks].reverse() : []);
          setUpcomingTasks(
            Array.isArray(data.upcomingTasks)
              ? [...data.upcomingTasks].sort((a, b) => new Date(a.time) - new Date(b.time))
              : []
          );
        }
      });
    }
  };
  listenUser();
  return () => unsub && unsub();
}, []);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div
          className="sidebar-logo"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img src="/logo.png" alt="Greenify Logo" className="sidebar-logo-img" />
        </div>
        <nav>
          <ul>
            <li title="Home" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>🏠</li>
            <li title="Chat">💬</li>
            <li title="Calendar">📅</li>
            <li title="Tasks">🌱</li>
            <li title="Settings">⚙️</li>
            <li title="Info" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>ℹ️</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Profile Section */}
        <div className="dashboard-header">
          <div>
            <h2>Good Morning, <span className="user-name">{userName || "Eco Hero"}</span></h2>
            <p>Eco Points: <b>{ecoPoints}</b></p>
          </div>
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName || "Eco Hero")}&background=43a047&color=fff`}
            alt="User Avatar"
            className="profile-avatar"
            style={{ cursor: "pointer" }}
            onClick={() => navigate('/profile')}
          />
        </div>

        {/* Task Cards */}
        <div className="task-cards">
          <div className="task-card green" onClick={() => navigate('/task/1')}>
            <h4>Recycle 5 Plastic Bottles</h4>
            <div className="card-meta">♻️</div>
          </div>
          <div className="task-card green" onClick={() => navigate('/task/2')}>
            <h4>Plant a Tree in Your Neighborhood</h4>
            <div className="card-meta">🌳</div>
          </div>
          <div className="task-card green" onClick={() => navigate('/task/3')}>
            <h4>Use Public Transport Today</h4>
            <div className="card-meta">🚌</div>
          </div>
        </div>

        <section className="recent-tasks">
  <h3>Eco Tasks Completed</h3>
  <div className="tasks-list">
    {recentTasks.length === 0 && (
      <div style={{ color: "#888", fontStyle: "italic", padding: "12px" }}>
        No tasks completed yet.
      </div>
    )}
    {recentTasks.map((task, idx) => (
      <div className="task-row" key={idx}>
        <span className="task-num">{recentTasks.length - idx}</span>
        <span className="task-title">{task.title}</span>
        <span className="task-desc">{task.desc}</span>
        <span className="task-status done">+{task.points} pts</span>
  
      </div>
    ))} 
  </div>
</section>
      </main>

      {/* Right Sidebar */}
      <aside className="rightbar">
        <div className="upcoming-schedule">
  <h4>Upcoming Eco Schedule</h4>
  {upcomingTasks.length === 0 ? (
    <div style={{ color: "#888", fontStyle: "i talic", padding: "12px" }}>
      No upcoming tasks scheduled.
    </div>
  ) : (
    upcomingTasks.map((task, idx) => (
      <div
        key={idx}
        className="schedule-card green"
        style={{ cursor: 'pointer', marginBottom: 8 }}
      >
        <div>{task.title}</div>
        <div>{task.time ? new Date(task.time).toLocaleString() : "TBA"}</div>
      </div>
    ))
  )}
</div>
        <div className="new-task">
          <h4>New Eco Task</h4>
          <input type="text" placeholder="Eco Task Title Here" />
          <div className="tags">
            <span>Recycling</span>
            <span>Planting</span>
            <span>Clean-Up</span>
            <span>Transport</span>
            <span>Energy</span>
            <span>Water</span>
          </div>
          <button
            className="create-task-btn"
            onClick={() => navigate('/new-eco-task')}
          >
            Create Eco Task
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Dashboard;
