import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://toxicmd:riasadmin12@toxic1239.04ozxeb.mongodb.net/?retryWrites=true&w=majority&appName=Toxic1239";
let client;

// Function to connect to MongoDB
async function connectToMongo() {
  if (!client) {
    client = new MongoClient(uri);
  }
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client;
}

// Helper function to get today's date in YYYY-MM-DD format
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

// Handler for adding new API keys via GET method
export default async function handler(req, res) {
  const { apikey, requests_per_day } = req.query;

  // Validate query parameters
  if (!apikey || !requests_per_day) {
    return res.status(400).json({ error: 'apikey and requests_per_day are required parameters' });
  }

  try {
    // Connect to MongoDB
    await connectToMongo();
    const database = client.db('apiKeyDatabase');
    const collection = database.collection('apiKeys');

    // Check if API key already exists
    const existingApiKey = await collection.findOne({ apikey });
    if (existingApiKey) {
      return res.status(400).json({ error: 'API key already exists' });
    }

    // Insert new API key
    const newApiKeyData = {
      apikey,
      requests_per_day: parseInt(requests_per_day, 10),
      requests_today: 0,
      last_request_date: getCurrentDate(), // Set current date
      unlimited: false, // You can set this based on your logic
    };

    await collection.insertOne(newApiKeyData);
    return res.status(201).json({ message: 'API key added successfully', apiKey: newApiKeyData });
  } catch (error) {
    console.error('Error adding API key:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Middleware to check API key and requests per day
export async function checkApiKey(apikey) {
  try {
    await connectToMongo();
    const database = client.db('apiKeyDatabase');
    const collection = database.collection('apiKeys');

    // Find the API key in the database
    const apiKeyData = await collection.findOne({ apikey });
    if (!apiKeyData) {
      return { status: 400, message: 'Invalid API key' };
    }

    // Get the current date
    const today = getCurrentDate();

    // If it's a new day, reset the requests_today counter
    if (apiKeyData.last_request_date !== today) {
      await collection.updateOne(
        { apikey },
        { $set: { requests_today: 0, last_request_date: today } }
      );
      apiKeyData.requests_today = 0;
    }

    // Check if the API key has exceeded the request limit
    if (!apiKeyData.unlimited && apiKeyData.requests_today >= apiKeyData.requests_per_day) {
      return { status: 429, message: 'API key has exceeded the daily request limit' };
    }

    // Increment the request count for the API key
    await collection.updateOne(
      { apikey },
      { $inc: { requests_today: 1 } }
    );

    return { status: 200, message: 'API key is valid', apiKeyData };
  } catch (error) {
    console.error('Error checking API key:', error.message);
    return { status: 500, message: 'Internal server error' };
  }
}
