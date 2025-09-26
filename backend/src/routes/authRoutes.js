const express = require('express');
const authController = require('../controllers/authController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
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

module.exports = router;