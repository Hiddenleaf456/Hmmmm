import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://toxicmd:toxicmd@toxic1239.04ozxeb.mongodb.net/?retryWrites=true&w=majority&appName=Toxic1239";
const client = new MongoClient(uri);

async function connectToMongo() {
  if (!client.isConnected()) {
    await client.connect();
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectToMongo();
      const database = client.db('apiKeyDatabase');
      const collection = database.collection('apiKeys');

      const apiKeys = await collection.find({}).toArray();
      return res.status(200).json(apiKeys);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}