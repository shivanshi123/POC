import React, { useEffect } from 'react';
import { getCurrentUser } from '../utils/authUtils';
import './Dashboard.css';

const Dashboard = ({ user, setUser, onLogout }) => {
  useEffect(() => {
    if (!user) {
      getCurrentUser().then(u => {
        if (u) setUser(u);
      });
    }
  }, [user, setUser]);

  if (!user) return <div className="dashboard-loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <p className="dashboard-welcome">
        Welcome, <strong>{user.username}</strong>!
      </p>
      <p className="dashboard-email">
        Email: <strong>{user.email}</strong>
      </p>
      <p className="dashboard-role">
        Your role: <strong>{user.role}</strong>
      </p>
      <button className="dashboard-logout-btn" onClick={onLogout}>Logout</button>
      {user.role === 'admin' ? (
        <div className="dashboard-panel admin-panel">
          <h3>Admin Panel</h3>
          <p>You have access to admin features.</p>
        </div>
      ) : (
        <div className="dashboard-panel user-panel">
          <h3>User Panel</h3>
          <p>You have access to user features.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;