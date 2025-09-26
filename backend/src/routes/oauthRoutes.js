const express = require('express');
const passport = require('passport');
const { issueToken } = require('../controllers/authController');
const router = express.Router();

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
    console.log('[OAuth] Redirecting with token for', user.username);
    res.redirect(`http://localhost:3000/auth?token=${token}`);
  }
);

module.exports = router;