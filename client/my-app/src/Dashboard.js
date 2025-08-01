//import React, { useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
// const [completed, setCompleted] = useState({ 1: false, 2: false, 3: false });

  const navigate = useNavigate();

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
            <h2>Good Morning, <span className="user-name">Eco Hero</span></h2>
            <p>75% Eco Tasks Completed</p>
          </div>
          <img
  src="https://ui-avatars.com/api/?name=Eco+Hero&background=43a047&color=fff"
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
            {/* Example tasks, you can replace/add more */}
            <div className="task-row">
              <span className="task-num one">1</span>
              <span className="task-title">Recycle Bottles</span>
              <span className="task-desc">Collected and recycled 5 plastic bottles</span>
              <span className="task-status done">✔️ Done</span>
            </div>
            <div className="task-row">
              <span className="task-num two">2</span>
              <span className="task-title">Plant a Tree</span>
              <span className="task-desc">Planted a sapling in the local park</span>
              <span className="task-status done">✔️ Done</span>
            </div>
            <div className="task-row">
              <span className="task-num three">3</span>
              <span className="task-title">Public Transport</span>
              <span className="task-desc">Used bus instead of car for commute</span>
              <span className="task-status done">✔️ Done</span>
            </div>
            <div className="task-row">
              <span className="task-num four">4</span>
              <span className="task-title">Energy Saving</span>
              <span className="task-desc">Turned off unused lights and devices</span>
              <span className="task-status done">✔️ Done</span>
            </div>
            <div className="task-row">
              <span className="task-num five">5</span>
              <span className="task-title">Water Conservation</span>
              <span className="task-desc">Fixed a leaking tap at home</span>
              <span className="task-status done">✔️ Done</span>
            </div>
            <div className="task-row">
              <span className="task-num six">6</span>
              <span className="task-title">Community Clean-Up</span>
              <span className="task-desc">Joined a local clean-up drive</span>
              <span className="task-status done">✔️ Done</span>
            </div>
            <div className="task-row">
              <span className="task-num seven">7</span>
              <span className="task-title">Composting</span>
              <span className="task-desc">Started composting kitchen waste</span>
              <span className="task-status done">✔️ Done</span>
            </div>
            <div className="task-row">
              <span className="task-num eight">8</span>
              <span className="task-title">Eco Shopping</span>
              <span className="task-desc">Bought eco-friendly products</span>
              <span className="task-status done">✔️ Done</span>
            </div>
            <div className="task-row">
              <span className="task-num nine">9</span>
              <span className="task-title">Reusable Bags</span>
              <span className="task-desc">Used reusable bags for shopping</span>
              <span className="task-status done">✔️ Done</span>
            </div>
            <div className="task-row">
              <span className="task-num ten">10</span>
              <span className="task-title">Bike to Work</span>
              <span className="task-desc">Cycled to work instead of driving</span>
              <span className="task-status done">✔️ Done</span>
            </div>
          </div>
        </section>


      </main>

      {/* Right Sidebar */}
      <aside className="rightbar">
        
<div className="upcoming-schedule">
  <h4>Upcoming Eco Schedule</h4>
  <div
    className="schedule-card green"
    style={{ cursor: 'pointer' }}
    onClick={() => navigate('/event/1')}
  >
    <div>Community Clean-Up Drive</div>
    <div>10:00 AM</div>
  </div>
  <div
    className="schedule-card green"
    style={{ cursor: 'pointer' }}
    onClick={() => navigate('/event/2')}
  >
    <div>Tree Plantation Event</div>
    <div>2:30 PM</div>
  </div>
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