const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../auth/jwtUtils');

const dummyUser = {
  id: 1,
  username: 'test',
  password: 'password',
};

// login function to authenticate the user and generate tokens
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // check if provided credentials match
  if (username === dummyUser.username && password === dummyUser.password) {
    // generate access token
    const token = generateToken({ id: dummyUser.id, username: dummyUser.username }); // add application ID & Secret
    // generate refresh token
    const refreshToken = generateRefreshToken({ id: dummyUser.id, username: dummyUser.username });
    res.json({ token, refreshToken });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// function to handle refresh token requests and generate a new access token
exports.refreshToken = (req, res) => {
  const { token } = req.body;

  // verify the provided refresh token
  const decoded = verifyRefreshToken(token);
  if (!decoded) {
    return res.status(403).json({ message: 'Invalid Refresh Token' });
  }

  // generate a new access token
  const newToken = generateToken({ id: decoded.id, username: decoded.username });
  res.json({ token: newToken });
};
