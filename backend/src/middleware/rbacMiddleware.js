const rbacMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming user info is attached to req
        if (allowedRoles.includes(userRole)) {
            return next();
        }
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    };
};

module.exports = rbacMiddleware;