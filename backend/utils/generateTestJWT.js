const jwt = require('jsonwebtoken');

const JWT_SECRET = 'MySuperSecretKey123!@#2025'; // Use your .env value

function generateJWT(role = 'user', expiresIn = '15m') {
  const payload = {
    sub: '1234567890',
    name: 'Test User',
    roles: [role],
    iss: 'unified-security-app',
    aud: 'unified-security-client',
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn,
    algorithm: 'HS256',
  });

  return token;
}

// Example usage:
console.log('User JWT:', generateJWT('user'));
console.log('Admin JWT:', generateJWT('admin'));
console.log('Expired JWT:', generateJWT('admin', '-10s')); // Already expired