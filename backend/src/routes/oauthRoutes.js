const express = require('express');
const passport = require('passport');
const { issueToken } = require('../controllers/authController');
const cors = require('cors');
const router = express.Router();

router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:3000/auth?error=oauth' }),
  (req, res) => {
    const user = {
      id: req.user.id,
      username: req.user.displayName,
      email: req.user.email,
      role: req.user.role || 'user',
      provider: 'google'
    };
    const token = issueToken(user);

    // Set JWT as HttpOnly cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false, // For local development
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 1000
    });

    // Redirect to frontend WITHOUT token in URL
    res.redirect('http://localhost:3000/auth');
  }
);

module.exports = router;