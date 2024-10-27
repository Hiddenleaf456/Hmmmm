import { apiKeyMiddleware } from '../../lib/apiKeyMiddleware';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Call the middleware to check the API key
  apiKeyMiddleware(req, res, async () => {
    try {
      // Construct the path to the JSON file
      const filePath = path.join(process.cwd(), 'data', 'pickuplines.json');
      
      // Read the file asynchronously
      const fileContents = await fs.promises.readFile(filePath, 'utf8');
      
      // Parse the JSON content
      const data = JSON.parse(fileContents);

      // Select a random pickupline from the array
      const randomPickupline = data.pickuplines[Math.floor(Math.random() * data.pickuplines.length)];

      // Create a response similar to the old JSON format
      const responseWithCreator = {
        pickupline: randomPickupline,
        creator: 'Toxxic'
      };

      // Respond with pretty-printed JSON
      res.status(200).json(JSON.parse(JSON.stringify(responseWithCreator, null, 2)));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to load pickup line from file' });
    }
  });
}
