import { postgres } from '@vercel/postgres';

// Middleware to validate API keys and manage request limits
export const apiKeyMiddleware = async (req, res, next) => {
  const { apikey } = req.query;

  // Fetch API key data from the database
  const apiKeyData = await getApiKeyData(apikey);

  if (!apiKeyData) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  // Check if the user has reached their request limit
  if (!apiKeyData.unlimited && apiKeyData.requests_today >= apiKeyData.requests_per_day) {
    return res.status(429).json({ error: 'Request limit reached for today' });
  }

  // Update request count
  await updateApiKeyData(apiKeyData);

  // Call the next handler
  next();
};

// Fetch API key data from the database
async function getApiKeyData(apikey) {
  const { rows } = await postgres.sql`
    SELECT * FROM keys WHERE apikey = ${apikey}
  `;
  return rows[0]; // Return the first row if found
}

// Update the request count in the database
async function updateApiKeyData(apiKeyData) {
  const newRequestCount = apiKeyData.requests_today + 1;

  await postgres.sql`
    UPDATE keys 
    SET requests_today = ${newRequestCount} 
    WHERE apikey = ${apiKeyData.apikey}
  `;
}
