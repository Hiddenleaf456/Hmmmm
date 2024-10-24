//.lib/rateLimiter.js

const requests = []; // Store all requests globally as timestamps

const rateLimit = (limit, timeWindow) => {
  return (req, res, next) => {
    const currentTime = Date.now();

    // Clean up old requests beyond the time window
    requests = requests.filter((time) => currentTime - time < timeWindow);

    // If requests exceed the limit, block the request
    if (requests.length >= limit) {
      return res.status(429).json({ error: 'Too many requests, please try again later.' });
    }

    // Log the current request time
    requests.push(currentTime);

    // Proceed with the request if it's within the rate limit
    next();
  };
};

export default rateLimit;
