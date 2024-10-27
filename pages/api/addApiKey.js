import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://toxicmd:toxxictech@toxic1239.04ozxeb.mongodb.net/?retryWrites=true&w=majority&appName=Toxic1239";
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
      last_request_date: new Date().toISOString().split('T')[0], // Set current date
      unlimited: false, // You can set this based on your logic
    };

    await collection.insertOne(newApiKeyData);
    return res.status(201).json({ message: 'API key added successfully', apiKey: newApiKeyData });
  } catch (error) {
    console.error('Error adding API key:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
