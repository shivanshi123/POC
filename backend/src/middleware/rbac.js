module.exports = function(requiredRole) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === requiredRole) {
      return next();
    }
    res.status(403).json({ message: 'Forbidden' });
  };
};