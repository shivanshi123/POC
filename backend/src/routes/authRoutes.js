const express = require('express');
const authController = require('../controllers/authController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const { generateJWT } = require('../utils/tokenUtils');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

router.post('/register', authController.register);
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateJWT(user);
    const refreshToken = crypto.randomBytes(64).toString('hex');

    await User.saveRefreshToken(user.id, refreshToken);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
});
router.get('/profile', jwtMiddleware, authController.getProfile);
router.get('/admin', jwtMiddleware, rbacMiddleware('admin'), authController.admin);

// Simplified current user (no DB lookup for POC)
router.get('/current', jwtMiddleware, (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'No user' });
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
    provider: req.user.provider
  });
});

router.post('/logout', async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (refreshToken) {
    const user = await User.findByRefreshToken(refreshToken);
    if (user) await User.deleteRefreshToken(user.id);
  }
  res.clearCookie('access_token', { path: '/' });
  res.clearCookie('refresh_token', { path: '/' });
  res.json({ message: 'Logged out and tokens revoked' });
});
router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) return res.status(401).json({ error: 'Missing refresh token' });

  const user = await User.findByRefreshToken(refreshToken);
  console.log(user,"user")
  if (!user) return res.status(401).json({ error: 'Invalid refresh token' });

  // Issue new access token
  const accessToken = generateJWT(user);
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: false, // true in production
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 1000 // 1 hour
  });
  res.json({ success: true });
});

module.exports = router;