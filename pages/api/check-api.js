// check-api.js

import rateLimit from '../../lib/rateLimiter';

// Retrieve API keys from environment variables
const API_KEYS = JSON.parse(process.env.API_KEYS);

// Define time window and shared limit
const timeWindow = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

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

  // Apply the rate limiter specific to the API key
  rateLimit(limit === 'unlimited' ? Infinity : limit, timeWindow)(req, res, () => {
    res.status(200).json({ message: 'Request successful' });
  });
};

export default handler;
