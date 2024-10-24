import rateLimit from '../../lib/rateLimiter';

// Retrieve API keys from environment variables
const API_KEYS = JSON.parse(process.env.API_KEYS);

// Define a shared limit for all users (in this case, based on toxxicboy's limit)
const sharedLimit = 400;

const handler = (req, res) => {
  const apiKey = req.query.apikey;
  const apiDetails = API_KEYS[apiKey];

  // Check if the API key exists
  if (!apiDetails) {
    return res.status(403).json({ error: 'Invalid API key. Get a valid API Key from Toxxic.' });
  }

  const { limit, expiry } = apiDetails;
  const currentTime = new Date().toISOString();

  // Check if the key has an expiration and if it has expired
  if (expiry && currentTime > expiry) {
    return res.status(403).json({ error: 'API key expired. Please contact Toxxic for renewal.' });
  }

  const timeWindow = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  // Apply the rate limiter globally
  rateLimit(sharedLimit, timeWindow)(req, res, () => {
    res.status(200).json({ message: 'Request successful' });
  });
};

export default handler;
