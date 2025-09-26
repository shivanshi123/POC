function rbacMiddleware(requiredRoles = []) {
  return (req, res, next) => {
    const user = req.user;
    if (!user || !user.roles) {
      return res.status(403).json({ message: 'Access denied: No roles found' });
    }

    // Check if user has at least one required role
    const hasRole = requiredRoles.some(role => user.roles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ message: 'Access denied: Insufficient role' });
    }

    next();
  };
}

module.exports = rbacMiddleware;