const express = require('express');
const authController = require('../controllers/authController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', jwtMiddleware, authController.getProfile);
router.get('/admin', jwtMiddleware, rbacMiddleware('admin'), authController.admin);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Get current user info from JWT
router.get('/current', jwtMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      username: user.username,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;