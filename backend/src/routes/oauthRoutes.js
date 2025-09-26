const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/auth' }),
  (req, res) => {
    // Successful authentication, redirect to dashboard
    res.redirect('http://localhost:3000/dashboard');
  }
);

module.exports = router;