import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getCurrentUser } from '../utils/authUtils';
import './Dashboard.css';

const Dashboard = ({ user, setUser, onLogout }) => {
  const history = useHistory();

  useEffect(() => {
    let cancelled = false;
    if (!user) {
      (async () => {
        const u = await getCurrentUser();
        if (u && !cancelled) setUser(u);
      })();
    }
    return () => { cancelled = true; };
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

      <div style={{ margin: '2rem 0', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          className="dashboard-nav-btn"
          onClick={() => history.push('/admin')}
        >
          Navigate to Admin Page
        </button>
        <button
          className="dashboard-nav-btn"
          onClick={() => history.push('/user')}
        >
          Navigate to User Page
        </button>
      </div>

      {/* Admin Section */}
      {user.role === 'admin' && (
        <div className="dashboard-panel admin-panel">
          <h3>Admin Panel</h3>
          <p>You have access to admin features.</p>
        </div>
      )}

      {/* User Section */}
      {user.role === 'user' && (
        <div className="dashboard-panel user-panel">
          <h3>User Panel</h3>
          <p>You have access to user features.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;