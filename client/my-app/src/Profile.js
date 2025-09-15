import React, { useState, useEffect } from "react";
import "./Profile.css";
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Profile() {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAvatar, setEditAvatar] = useState("");

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUser({
            ...data,
            avatar: data.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=43a047&color=fff`,
            badges: Array.isArray(data.badges) ? data.badges : [],
            recentTasks: Array.isArray(data.recentTasks) ? data.recentTasks : [],
            rank: data.rank || "Eco Hero",
            nextRank: data.nextRank || "Eco Legend",
            progress: data.progress || 0,
            completedTasks: data.completedTasks || 0,
          });
          setEditName(data.name || "");
          setEditAvatar(data.photoURL || "");
        }
      }
    };
    fetchUser();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditAvatar(url);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        name: editName,
        photoURL: editAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(editName)}&background=43a047&color=fff`
      });
      setUser((prev) => ({
        ...prev,
        name: editName,
        avatar: editAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(editName)}&background=43a047&color=fff`
      }));
      setShowEdit(false);
    }
  };

  if (!user) return <div>Loading profile...</div>;

  // UI for badges
  const badgeColors = [
    "#cd7f32", // Bronze
    "#c0c0c0", // Silver
    "#ffd700", // Gold
    "#b9f2ff", // Platinum
    "#b39ddb"  // Diamond
  ];

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
            <h2 className="profile-name">
              {user.name}
              {user.badges && user.badges.length > 0 && (
                <span style={{ marginLeft: 8, fontSize: 28 }}>
                  {user.badges[user.badges.length - 1].icon}
                </span>
              )}
            </h2>
            <div className="profile-stats">
              <span className="profile-rank">{user.rank}</span>
              <span className="profile-points">{user.ecoPoints || 0} Eco Points</span>
              <span className="profile-tasks">{user.completedTasks || 0} Tasks</span>
            </div>
            <button className="profile-edit-btn" onClick={() => setShowEdit(true)}>
              Edit Profile
            </button>
          </div>
        </div>

        <div className="profile-world-progress-section">
  <h3 className="profile-section-title">Your Impact on the World</h3>
  <div className="world-progress-img-wrapper">
    <div className="world-img-circle-stack">
      <img
        src={process.env.PUBLIC_URL + "/world-grey.png"}
        alt="World Greyscale"
        className="world-img-circle world-img-grey"
      />
   <div
  className="world-img-circle-mask"
  style={{
    clipPath: `inset(${100 - Math.min(100, Math.round((user.ecoPoints || 0) / 10000 * 100))}% 0 0 0 round 50%)`
  }}
>
  <img
    src={process.env.PUBLIC_URL + "/world-color.png"}
    alt="World Colored"
    className="world-img-circle world-img-color"
  />
</div>
    </div>
    <div className="world-progress-label">
      <span style={{ color: "#43a047", fontWeight: 600, fontSize: "1.3rem" }}>
        {Math.min(user.ecoPoints || 0, 10000)} / 10000 Eco Points
      </span>
      <span style={{ marginLeft: 16, color: "#888", fontSize: "1.1rem" }}>
        ({Math.min(100, Math.round((user.ecoPoints || 0) / 10000 * 100))}% colored)
      </span>
    </div>
  </div>
</div>

        {/* Badges / Achievements */}
        <div>
          <h3 className="profile-section-title">Badges & Achievements</h3>
          <div className="profile-badges" style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {(user.badges || []).length === 0 && (
              <div style={{ color: "#888", fontStyle: "italic" }}>No badges yet. Complete more tasks to earn badges!</div>
            )}
            {(user.badges || []).map((badge, idx) => (
              <div
                key={badge.name + badge.level + idx}
                className="profile-badge"
                style={{
                  background: badgeColors[(badge.level - 1) % badgeColors.length],
                  color: "#222",
                  borderRadius: 12,
                  padding: "12px 18px",
                  minWidth: 110,
                  textAlign: "center",
                  boxShadow: "0 2px 8px #43a04722",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <span className="profile-badge-icon" style={{ fontSize: 32 }}>{badge.icon}</span>
                <span className="profile-badge-name" style={{ fontWeight: 600 }}>
                  {badge.name} {badge.level && <span style={{ fontWeight: 400 }}>Lv.{badge.level}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Eco Tasks */}
        <div>
          <h3 className="profile-section-title">Recently Completed Tasks</h3>
          <ul className="profile-tasks-list">
            {(user.recentTasks || []).length === 0 && (
              <li style={{ color: "#888", fontStyle: "italic" }}>No tasks completed yet.</li>
            )}
            {(user.recentTasks || []).map((task, idx) => (
              <li key={idx} className="profile-task-row">
                <span className="profile-task-title">{task.title}</span>
                <span className="profile-task-desc">{task.desc}</span>
                <span className="profile-task-date">{task.date}</span>
                <span className="profile-task-points">+{task.points} pts</span>
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