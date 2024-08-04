const { verifyToken } = require('./jwtUtils');

// checks header for valid jwt token
const jwtAuth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');
  const decoded = verifyToken(token);
  if (decoded) {
    req.user = decoded;
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = jwtAuth;

