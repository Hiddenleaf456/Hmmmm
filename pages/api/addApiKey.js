import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://toxicmd:toxicmd@toxic1239.04ozxeb.mongodb.net/?retryWrites=true&w=majority&appName=Toxic1239";
const client = new MongoClient(uri);

async function connectToMongo() {
  if (!client.isConnected()) {
    await client.connect();
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { apikey, requests_per_day, unlimited } = req.body;

    if (!apikey || typeof apikey !== 'string' || !requests_per_day) {
      return res.status(400).json({ error: 'Invalid API key data' });
    }

    try {
      await connectToMongo();
      const database = client.db('apiKeyDatabase');
      const collection = database.collection('apiKeys');

      const newApiKeyData = {
        apikey,
        requests_per_day,
        requests_today: 0,
        unlimited: unlimited || false,
      };

      const result = await collection.insertOne(newApiKeyData);
      return res.status(201).json({ message: 'API key added successfully', id: result.insertedId });
    } catch (error) {
      console.error('Error inserting API key data:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}