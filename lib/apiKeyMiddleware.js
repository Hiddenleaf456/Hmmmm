import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://toxicmd:toxicmd@toxic1239.04ozxeb.mongodb.net/?retryWrites=true&w=majority&appName=Toxic1239";
const client = new MongoClient(uri);

async function connectToMongo() {
  if (!client.isConnected()) {
    await client.connect();
  }
}

// Middleware to handle API key validation and request counting
export const apiKeyMiddleware = async (req, res, next) => {
  const { apikey } = req.query;

  if (!apikey) {
    return res.status(400).json({ error: 'API key is required' });
  }

  try {
    // Connect to MongoDB
    await connectToMongo();
    const database = client.db('apiKeyDatabase');  // Your database name
    const collection = database.collection('apiKeys');  // Your collection name

    // Fetch API key data from MongoDB
    const apiKeyData = await collection.findOne({ apikey });

    // If API key does not exist, create a new entry
    if (!apiKeyData) {
      const newApiKeyData = {
        apikey,
        requests_per_day: 500,  // Default value or modify as needed
        requests_today: 0,
        unlimited: false,
      };
      await collection.insertOne(newApiKeyData);
      return res.status(201).json({ message: 'API key created successfully', apiKey: newApiKeyData });
    }

    // Check if the user has reached their request limit
    if (!apiKeyData.unlimited && apiKeyData.requests_today >= apiKeyData.requests_per_day) {
      return res.status(429).json({ error: 'Request limit reached for today' });
    }

    // Update request count
    apiKeyData.requests_today += 1;

    // Update the database with the new request count
    await collection.updateOne(
      { apikey },
      { $set: { requests_today: apiKeyData.requests_today } }
    );

    // Call the next handler
    next();
  } catch (error) {
    console.error('Error in API key middleware:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
