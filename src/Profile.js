import React, { useState } from "react";
import "./Profile.css";

const initialUser = {
  name: "Eco Hero",
  avatar: "https://ui-avatars.com/api/?name=Eco+Hero&background=43a047&color=fff",
  ecoPoints: 1280,
  rank: "Eco Hero",
  nextRank: "Eco Legend",
  progress: 76,
  completedTasks: 27,
  recentTasks: [
    { title: "Beach Cleanup", desc: "Collected 3kg of plastic waste", date: "2025-07-30" },
    { title: "Planted a Tree", desc: "Planted a sapling in city park", date: "2025-07-28" },
    { title: "Used Public Transport", desc: "Reduced carbon footprint", date: "2025-07-25" },
  ],
  badges: [
    { name: "Cleanup Champion", icon: "🧹" },
    { name: "Tree Planter", icon: "🌳" },
    { name: "Transit Star", icon: "🚌" },
  ],
};

function Profile() {
  const [user, setUser] = useState(initialUser);
  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editAvatar, setEditAvatar] = useState(user.avatar);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditAvatar(url);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      name: editName,
      avatar: editAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(editName)}&background=43a047&color=fff`,
    });
    setShowEdit(false);
  };

  return (
    
    
    <div className="profile-bg">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <img
            src={user.avatar}
            alt="Profile"
            className="profile-avatar-img"
          />
          <div className="profile-header-info">
            <h2 className="profile-name">{user.name}</h2>
            <div className="profile-stats">
              <span className="profile-rank">{user.rank}</span>
              <span className="profile-points">{user.ecoPoints} Eco Points</span>
              <span className="profile-tasks">{user.completedTasks} Tasks</span>
            </div>
            <button className="profile-edit-btn" onClick={() => setShowEdit(true)}>
              Edit Profile
            </button>
          </div>
        </div>


        {/* Progress Bar to Next Level */}
        <div className="profile-progress-section">
          <div className="profile-progress-labels">
            <span>{user.rank}</span>
            <span>{user.nextRank}</span>
          </div>
          <div className="profile-progress-bar-bg">
            <div
              className="profile-progress-bar"
              style={{ width: `${user.progress}%` }}
            ></div>
          </div>
          <div className="profile-progress-text">{user.progress}% to next level</div>
        </div>

        {/* Badges / Achievements */}
        <div>
          <h3 className="profile-section-title">Badges & Achievements</h3>
          <div className="profile-badges">
            {user.badges.map((badge) => (
              <div key={badge.name} className="profile-badge">
                <span className="profile-badge-icon">{badge.icon}</span>
                <span className="profile-badge-name">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Eco Tasks */}
        <div>
          <h3 className="profile-section-title">Recently Completed Tasks</h3>
          <ul className="profile-tasks-list">
            {user.recentTasks.map((task, idx) => (
              <li key={idx} className="profile-task-row">
                <span className="profile-task-title">{task.title}</span>
                <span className="profile-task-desc">{task.desc}</span>
                <span className="profile-task-date">{task.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="profile-edit-modal">
          <form className="profile-edit-form" onSubmit={handleSave}>
            <h3>Edit Profile</h3>
            <label>
              Name:
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </label>
            <label>
              Profile Picture:
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
            {editAvatar && (
              <img
                src={editAvatar}
                alt="Preview"
                className="profile-avatar-img"
                style={{ width: 60, height: 60, margin: "0 auto" }}
              />
            )}
            <div className="profile-edit-actions">
              <button type="submit" className="profile-edit-btn">Save</button>
              <button type="button" className="profile-edit-btn" style={{ background: "#b2dfdb", color: "#2e7d32" }} onClick={() => setShowEdit(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Profile;