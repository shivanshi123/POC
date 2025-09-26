// backend/utils/tokenUtils.js
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'your_secret_key'; // Use a strong secret

const generateJWT = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
};

const verifyJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('Token is required');

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        req.user = decoded; // Attach user info to request
        next();
    });
};

module.exports = { generateJWT, verifyJWT };