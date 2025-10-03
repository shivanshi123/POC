const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
const EXPIRATION_TIME = '1h'; // Token expiration time

function generateJWT(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role || 'user',
      provider: user.provider || 'local'
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateJWT,
    verifyToken,
};