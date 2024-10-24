// /lib/apiKeyMiddleware.js
export const apiKeyMiddleware = (req, res, next) => {
  const { apikey } = req.query;

  // Fetch API key data from a database or a static file
  const apiKeyData = getApiKeyData(apikey);

  if (!apiKeyData) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  // Check if the user has reached their request limit
  if (!apiKeyData.unlimited && apiKeyData.requests_today >= apiKeyData.requests_per_day) {
    return res.status(429).json({ error: 'Request limit reached for today' });
  }

  // Update request count
  apiKeyData.requests_today += 1;
  updateApiKeyData(apiKeyData);

  // Call the next handler
  next();
};

// Fetch API key data from a data source
function getApiKeyData(apikey) {
  const apiKeys = [
    {
      apikey: 'toxxicboy',
      requests_per_day: 500,
      requests_today: 0,
      unlimited: false,
    },
    {
      apikey: 'riasadmin',
      requests_per_day: -1,
      requests_today: 0,
      unlimited: true,
    },{
      apikey: 'cyrilsolo',
      requests_per_day: -1,
      requests_today: 0,
      unlimited: true,
    },
  ];
  return apiKeys.find((key) => key.apikey === apikey);
}

// Simulate updating the request count in a database
function updateApiKeyData(apiKeyData) {
  // Logic to update the key's request count in the database
}
