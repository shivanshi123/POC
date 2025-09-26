import React from 'react';
import './UserPage.css';

const UserPage = ({ user }) => (
  <div className="user-container">
    <h1 className="user-title">User Dashboard</h1>
    <h2 className="user-welcome">Welcome, {user.username}!</h2>
    <p>This page is only accessible to regular users.</p>
    <h3>User Actions</h3>
    <ul className="user-actions">
      <li>View Profile</li>
      <li>Update Settings</li>
      <li>Contact Support</li>
    </ul>
  </div>
);

export default UserPage;