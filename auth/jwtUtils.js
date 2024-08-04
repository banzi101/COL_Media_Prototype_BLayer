const jwt = require('jsonwebtoken');

// function to generate an access token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// function to generate a refresh token
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};



// function to verify an access token
const verifyToken = (token) => {
  try {
    // verify the token
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// function to verify a refresh token
const verifyRefreshToken = (token) => {
  try {
    // verify the refresh token
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.error('Invalid Refresh Token', error);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
  generateRefreshToken,
  verifyRefreshToken,
};
