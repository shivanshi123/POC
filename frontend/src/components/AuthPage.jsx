import React, { useEffect, useState } from 'react';
import pkceChallenge from 'pkce-challenge';
import passport from 'passport';
import { GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';

const cardStyle = {
  maxWidth: '400px',
  margin: '40px auto',
  padding: '32px',
  borderRadius: '18px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
  background: 'rgba(255,255,255,0.95)',
  textAlign: 'center',
  position: 'relative',
};

const buttonStyle = {
  padding: '14px 28px',
  margin: '16px 0',
  borderRadius: '10px',
  border: 'none',
  background: 'linear-gradient(90deg,#4285F4 0%,#34A853 100%)',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '17px',
  cursor: 'pointer',
  boxShadow: '0 2px 12px rgba(66,133,244,0.18)',
  transition: 'background 0.2s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
};

const adminButtonStyle = {
  ...buttonStyle,
  background: 'linear-gradient(90deg,#34A853 0%,#4285F4 100%)',
};

const userButtonStyle = {
  ...buttonStyle,
  background: 'linear-gradient(90deg,#FABB05 0%,#4285F4 100%)',
  color: '#333',
};

const iconStyle = {
  fontSize: '22px',
  verticalAlign: 'middle',
};

const AuthPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Example: decode JWT from localStorage (replace with your logic)
    const token = localStorage.getItem('access_token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    }
  }, []);

  const handleGoogleLogin = () => {
    // Generate PKCE challenge
    const { code_verifier, code_challenge } = pkceChallenge();

    // Store code_verifier in localStorage for later use
    localStorage.setItem('pkce_code_verifier', code_verifier);

    // Build Google OAuth URL with PKCE parameters
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      redirect_uri: 'http://localhost:3000/api/auth/google/callback',
      scope: 'profile email',
      code_challenge_method: 'S256',
      code_challenge,
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  // Simple SVG icons for demo
  const googleIcon = (
    <svg style={iconStyle} viewBox="0 0 24 24">
      <path fill="#fff" d="M21.35 11.1h-9.18v2.98h5.27c-.23 1.22-1.39 3.58-5.27 3.58-3.17 0-5.76-2.62-5.76-5.85s2.59-5.85 5.76-5.85c1.81 0 3.02.77 3.72 1.43l2.54-2.47C16.36 3.7 14.38 2.7 12.17 2.7 6.97 2.7 2.7 6.97 2.7 12.17s4.27 9.47 9.47 9.47c5.47 0 9.09-3.84 9.09-9.26 0-.62-.07-1.22-.18-1.78z"/>
    </svg>
  );
  const adminIcon = (
    <svg style={iconStyle} viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" fill="#fff"/>
      <rect x="6" y="16" width="12" height="4" rx="2" fill="#fff"/>
    </svg>
  );
  const userIcon = (
    <svg style={iconStyle} viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" fill="#333"/>
      <rect x="6" y="16" width="12" height="4" rx="2" fill="#333"/>
    </svg>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg,#e3ffe8 0%,#f9f9f9 50%,#4285F4 100%)',
      padding: '40px 0'
    }}>
      <div style={cardStyle}>
        <h1 style={{
          color: '#4285F4',
          marginBottom: '24px',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}>
          <span style={{fontSize: '32px', verticalAlign: 'middle'}}>🔒</span> Unified Security App
        </h1>
        {user && user.roles && user.roles.includes('admin') && (
          <button style={adminButtonStyle} onClick={() => { /* admin action */ }}>
            {adminIcon} Admin Panel
          </button>
        )}
        {user && user.roles && user.roles.includes('user') && (
          <button style={userButtonStyle} onClick={() => { /* user action */ }}>
            {userIcon} User Dashboard
          </button>
        )}
        {!user && (
          <button style={buttonStyle} onClick={handleGoogleLogin}>
            {googleIcon} Login with Google
          </button>
        )}
        {user && (
          <div style={{
            marginTop: '28px',
            color: '#555',
            background: '#f3f7fa',
            borderRadius: '8px',
            padding: '16px 0'
          }}>
            <p style={{margin: 0}}>Welcome, <strong>{user.name || 'User'}</strong>!</p>
            <p style={{margin: 0}}>Role: <strong>{user.roles.join(', ')}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
};

passport.use(new GoogleStrategy({
  // ... your config ...
}, async (accessToken, refreshToken, profile, done) => {
  // Find or create user in DB
  const user = await User.findOrCreate({ googleId: profile.id });
  return done(null, user); // user must be a valid object
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default AuthPage;

const session = require('express-session');
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());