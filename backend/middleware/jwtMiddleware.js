const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const EXPECTED_ISSUER = 'unified-security-app'; // Set this to your app name
const EXPECTED_AUDIENCE = 'unified-security-client'; // Set this to your client name

function jwtMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Strict claim validation
    if (
      decoded.iss !== EXPECTED_ISSUER ||
      decoded.aud !== EXPECTED_AUDIENCE ||
      !decoded.exp ||
      decoded.exp < Math.floor(Date.now() / 1000)
    ) {
      return res.status(401).json({ message: 'Token claims validation failed' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = jwtMiddleware;