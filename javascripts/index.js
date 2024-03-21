
const jwt = require('jsonwebtoken');
const decodeToken = (token) => {
  try {
    const decoded = jwt_decode(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return null;
  }
};

// Example usage:
const token = localStorage.getItem('token');
const decodedToken = decodeToken(token);
console.log(decodedToken);