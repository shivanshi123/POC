import React from 'react';
import './AdminPage.css';

const AdminPage = ({ user }) => {
    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin Dashboard</h1>
            <h2 className="admin-welcome">Welcome, {user.username}!</h2>
            <p>This page is only accessible to admin users.</p>
            <h3>Admin Actions</h3>
            <ul className="admin-actions">
                <li>Manage Users</li>
                <li>View Reports</li>
                <li>Settings</li>
            </ul>
        </div>
    );
};

export default AdminPage;