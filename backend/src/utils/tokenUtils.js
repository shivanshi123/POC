const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
const EXPIRATION_TIME = '1h'; // Token expiration time

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        roles: user.roles,
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken,
};