const apiKeyAuth = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    const validApiKey = process.env.API_KEY;

 
    if (apiKey && apiKey === validApiKey) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized api-key' });
    }
  };
  
  module.exports = apiKeyAuth;
  