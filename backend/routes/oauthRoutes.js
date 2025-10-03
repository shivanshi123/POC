const express = require('express');
const axios = require('axios');
const { verifyJWT } = require('../utils/tokenUtils');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const passport = require('passport');
const router = express.Router();

console.log('OAuth routes loaded');

// POST /api/auth/google/callback
router.post('/google/callback', async (req, res) => {
  const { code, code_verifier } = req.body;

  if (!code || !code_verifier) {
    return res.status(400).json({ message: 'Missing code or code_verifier' });
  }

  try {
    // Exchange authorization code for tokens using PKCE
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000/api/auth/google/callback',
        grant_type: 'authorization_code',
        code_verifier,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, id_token, refresh_token } = tokenResponse.data;

    // TODO: Find or create user, issue your own JWT, set cookies, etc.
    // After successful token exchange and user authentication:
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true, // Set to true in production (requires HTTPS)
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Send access token and id token in response body
    res.json({ access_token, id_token });
  } catch (err) {
    res.status(500).json({ message: 'Token exchange failed', error: err.message });
  }
});

router.post('/google/token', async (req, res) => {
  const { appToken } = req.body;

  if (!appToken) {
    return res.status(400).json({ message: 'Missing appToken' });
  }

  try {
    // Here you would typically verify the appToken and extract user information
    // For example, using a library like jsonwebtoken to verify a JWT

    // If valid, set the access token as a cookie
    res.cookie('access_token', appToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Token processing failed', error: err.message });
  }
});

router.get('/admin', verifyJWT, rbacMiddleware(['admin']), (req, res) => {
    res.send('Welcome to the admin area');
});

router.get('/user', verifyJWT, rbacMiddleware(['user', 'admin']), (req, res) => {
    res.send('Welcome to the user area');
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

module.exports = router;