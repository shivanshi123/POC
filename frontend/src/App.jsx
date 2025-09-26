import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage'; // Import your AdminPage component
import UserPage from './pages/UserPage'; // Import your UserPage component
import ProtectedRoute from './utils/ProtectedRoute'; // Import the ProtectedRoute component
import { isAuthenticated, getCurrentUser } from './utils/authUtils';
import "./App.css"

const App = () => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log('[Route] React location:', location.pathname, 'window:', window.location.pathname);
  }, [location]);

  useEffect(() => {
    // Bootstrap user once on app load if token exists
    const boot = async () => {
      if (isAuthenticated()) {
        const u = await getCurrentUser();
        console.log('[App] Bootstrapped user:', u);
        if (u) setUser(u);
      }
      setAuthReady(true);
    };
    boot();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setUser(null);
  };

  if (!authReady) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Initializing...</div>;
  }

  console.log('[App] Rendering with user:', user);

  return (
    <Router>
      <Switch>
        {/* Protected Route for Dashboard */}
        <ProtectedRoute 
          path="/dashboard" 
          component={Dashboard} 
          allowedRoles={['user', 'admin']} 
          user={user} 
          setUser={setUser} 
          onLogout={handleLogout} 
        />

        {/* Protected Route for Admin Page */}
        <ProtectedRoute 
          path="/admin" 
          component={AdminPage} 
          allowedRoles={['admin']} 
          user={user} 
        />

        {/* Protected Route for User Page */}
        <ProtectedRoute 
          path="/user"
          component={UserPage}
          allowedRoles={['user']}
          user={user}
        />

        {/* Public Route for Authentication */}
        <Route path="/auth" exact>
          <AuthPage setUser={setUser} />
        </Route>

        {/* Redirect to Auth Page if no match */}
        <Redirect to="/auth" />
      </Switch>
    </Router>
  );
};

export default App;

