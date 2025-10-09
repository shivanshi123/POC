const express = require('express');
const passport = require('passport');
const { issueToken } = require('../controllers/authController');
const cors = require('cors');
const crypto = require('crypto');
const User = require('../models/user');
const router = express.Router();

router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:3000/auth?error=oauth' }),
  async (req, res) => {
    // Find or create user in user store
    let user = await User.findById(req.user.id);
    if (!user) {
      user = await User.create({
        id: req.user.id,
        username: req.user.displayName,
        email: req.user.email,
        role: req.user.role || 'user',
        provider: 'google'
      });
    }
    console.log(user)
    const token = issueToken(user);

    // Generate and store refresh token
    const refreshToken = crypto.randomBytes(64).toString('hex');
    await User.saveRefreshToken(user.id, refreshToken);

    // Set JWT as HttpOnly cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 1000
    });

    // Set refresh token as HttpOnly cookie
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Redirect to frontend
    res.redirect('http://localhost:3000/auth');
  }
);

module.exports = router;