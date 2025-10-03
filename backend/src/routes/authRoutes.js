const express = require('express');
const authController = require('../controllers/authController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const { generateJWT } = require('../utils/tokenUtils');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/register', authController.register);
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateJWT(user);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000
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

router.post('/logout', (req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: false, // use true in production with HTTPS
    sameSite: 'strict',
    path: '/',
  });
  res.clearCookie('refresh_token', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    path: '/',
  });
  res.json({ message: 'Logged out and tokens revoked' });
});

module.exports = router;