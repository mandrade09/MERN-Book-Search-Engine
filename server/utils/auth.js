const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = process.env.SECRET_KEY || 'mysecretsshhhhh'; // Use environment variable or fallback
const expiration = '2h';

const authMiddleware = ({ req }) => {
  // Check for token in header
  let token = req.headers.authorization || '';
  if (token.startsWith('Bearer ')) {
    token = token.split(' ').pop().trim();
  }

  // Initialize user as an empty object
  let user = null;

  if (token) {
    try {
      // Verify token and get user data
      const decoded = jwt.verify(token, secret, { expiresIn: expiration });
      user = decoded.data; // Extract user data from the token
    } catch (err) {
      console.log('Invalid token:', err);
    }
  }

  // Return the user object to the context
  return { user };
};

module.exports = authMiddleware;
