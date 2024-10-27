import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://toxicmd:toxicmd@toxic1239.04ozxeb.mongodb.net/?retryWrites=true&w=majority&appName=Toxic1239";
const client = new MongoClient(uri);

async function connectToMongo() {
  if (!client.isConnected()) {
    await client.connect();
  }
}

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { apikey } = req.body;

    if (!apikey) {
      return res.status(400).json({ error: 'API key is required' });
    }

    try {
      await connectToMongo();
      const database = client.db('apiKeyDatabase');
      const collection = database.collection('apiKeys');

      const result = await collection.deleteOne({ apikey });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'API key not found' });
      }

      return res.status(200).json({ message: 'API key deleted successfully' });
    } catch (error) {
      console.error('Error deleting API key:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}