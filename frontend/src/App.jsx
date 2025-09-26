import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import { getCurrentUser, isAuthenticated, logoutUser } from './utils/authUtils';
import "./App.css"

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated()) {
        const u = await getCurrentUser();
        setUser(u);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  console.log("App Loaded");
  return (
    <Router>
      <div>App Loaded</div>
      <Switch>
        <Route path="/auth">
          <AuthPage setUser={setUser} />
        </Route>
        <Route path="/dashboard">
          {isAuthenticated() ? (
            <Dashboard user={user} onLogout={handleLogout} />
          ) : (
            <Redirect to="/auth" />
          )}
        </Route>
        <Route path="/">
          <Redirect to={isAuthenticated() ? "/dashboard" : "/auth"} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

