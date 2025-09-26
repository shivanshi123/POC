// frontend/src/utils/ProtectedRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, allowedRoles, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!user) {
        // Not logged in
        return <Redirect to="/auth" />;
      }
      if (!allowedRoles.includes(user.role)) {
        // Logged in but not authorized
        return (
          <div
            style={{
              padding: '3rem',
              textAlign: 'center',
              color: '#c0392b',
              background: '#fff6f6',
              border: '1px solid #e0b4b4',
              borderRadius: '8px',
              margin: '3rem auto',
              maxWidth: '400px',
              boxShadow: '0 2px 8px rgba(192,57,43,0.07)'
            }}
          >
            <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Access Denied</h2>
            <p style={{ fontSize: '1.1rem' }}>You do not have permission to view this page.</p>
          </div>
        );
      }
      // Authorized
      return <Component {...props} user={user} {...rest} />;
    }}
  />
);

export default ProtectedRoute;