const express = require('express');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const router = express.Router();

router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Missing refresh token' });
  }

  // TODO: Validate refresh token (e.g., check DB, verify JWT, etc.)
  try {
    // Example: verify JWT refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // Issue new access token
    const accessToken = jwt.sign(
      {
        sub: decoded.sub,
        roles: decoded.roles,
        iss: 'unified-security-app',
        aud: 'unified-security-client',
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m', algorithm: 'HS256' }
    );

    // Optionally rotate refresh token
    const newRefreshToken = jwt.sign(
      {
        sub: decoded.sub,
        roles: decoded.roles,
        iss: 'unified-security-app',
        aud: 'unified-security-client',
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d', algorithm: 'HS256' }
    );
    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ access_token: accessToken });
  } catch (err) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

// Protect admin route
router.get('/admin', jwtMiddleware, rbacMiddleware(['admin']), (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});

// Protect user route
router.get('/profile', jwtMiddleware, rbacMiddleware(['user', 'admin']), (req, res) => {
  res.json({ message: 'Welcome, user!' });
});

// Logout route: revoke refresh token and clear cookie
router.post('/logout', (req, res) => {
  // If you store refresh tokens in a DB, delete it here using user info
  // Example: await RefreshToken.deleteOne({ token: req.cookies.refresh_token });

  res.clearCookie('refresh_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  });
  res.json({ message: 'Logged out and refresh token revoked' });
});

router.post('/login', async (req, res) => {
  // ...existing login logic...
  const token = generateJWT(user); // however you generate your JWT

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000
  });
  res.json({ success: true });
});

module.exports = router;