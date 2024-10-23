// pages/api/limiter.js
const rateLimit = (limit, timeWindow) => {
  const requests = {};

  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const currentTime = Date.now();

    if (!requests[ip]) {
      requests[ip] = [];
    }

    // Remove old requests beyond the time window
    requests[ip] = requests[ip].filter((time) => currentTime - time < timeWindow);

    // If requests exceed the limit, block the request
    if (requests[ip].length >= limit) {
      return res.status(429).json({ error: 'Too many requests, please try again later.' });
    }

    // Allow the request and log the current time
    requests[ip].push(currentTime);
    next();
  };
};

export default function handler(req, res) {
  const applyRateLimit = rateLimit(100, 60 * 1000); // 100 requests per minute

  applyRateLimit(req, res, () => {
    res.status(200).json({ message: 'Request successful' });
  });
}
