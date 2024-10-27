import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://toxicmd:toxxictech@toxic1239.04ozxeb.mongodb.net/?retryWrites=true&w=majority&appName=Toxic1239";
let client;

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(uri);
  }
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client;
}

// Middleware to handle API key validation and request counting
export const apiKeyMiddleware = async (req, res, next) => {
  const { apikey } = req.query;

  // Validate API key presence
  if (!apikey) {
    return res.status(400).json({ error: 'API key is required' });
  }

  try {
    // Connect to MongoDB
    await connectToMongo();
    const database = client.db('apiKeyDatabase');
    const collection = database.collection('apiKeys');

    // Fetch API key data from MongoDB
    const apiKeyData = await collection.findOne({ apikey });

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // If API key does not exist, create a new entry
    if (!apiKeyData) {
      const newApiKeyData = {
        apikey,
        requests_per_day: 500,  // Default value
        requests_today: 1,
        last_request_date: today,
        unlimited: false,
      };
      await collection.insertOne(newApiKeyData);
      return res.status(201).json({ message: 'API key created successfully', apiKey: newApiKeyData });
    }

    // Reset request count if last request was on a different day
    if (apiKeyData.last_request_date !== today) {
      apiKeyData.requests_today = 0;
      apiKeyData.last_request_date = today;
    }

    // Check if the user has reached their request limit
    if (!apiKeyData.unlimited && apiKeyData.requests_today >= apiKeyData.requests_per_day) {
      return res.status(429).json({ error: 'Request limit reached for today' });
    }

    // Update request count
    apiKeyData.requests_today += 1;

    // Update the database with the new request count and date
    await collection.updateOne(
      { apikey },
      { $set: { requests_today: apiKeyData.requests_today, last_request_date: today } }
    );

    // Proceed to the next middleware/handler
    next();
  } catch (error) {
    console.error('Error in API key middleware:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
