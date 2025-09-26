import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
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

  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          {isAuthenticated()
            ? <Dashboard user={user} setUser={setUser} onLogout={handleLogout} />
            : <Redirect to="/auth" />}
        </Route>

        <Route path="/auth" exact>
            <AuthPage setUser={setUser} />
        </Route>

        <Redirect to="/auth" />
      </Switch>
    </Router>
  );
};

export default App;

