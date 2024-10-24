// lib/rateLimiter.js

const rateLimit = (limit, timeWindow) => {
  const requests = new Map(); // Store requests for each API key

  return (req, res, next) => {
    const apiKey = req.query.apikey;
    const currentTime = Date.now();

    // Initialize requests array for the API key if it doesn't exist
    if (!requests.has(apiKey)) {
      requests.set(apiKey, []);
    }

    const timestamps = requests.get(apiKey);

    // Clean up old requests beyond the time window
    const validTimestamps = timestamps.filter((time) => currentTime - time < timeWindow);
    requests.set(apiKey, validTimestamps);

    // If requests exceed the limit, block the request
    if (validTimestamps.length >= limit) {
      return res.status(429).json({ error: 'Too many requests, please try again later.' });
    }

    // Log the current request time
    validTimestamps.push(currentTime);

    // Proceed with the request if it's within the rate limit
    next();
  };
};

export default rateLimit;
