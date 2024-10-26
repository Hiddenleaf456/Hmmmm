import { apiKeyMiddleware } from '../../lib/apiKeyMiddleware';

export default async function handler(req, res) {
  // Call the middleware to check the API key
  apiKeyMiddleware(req, res, async () => {
    try {
      const response = await fetch('https://api.popcat.xyz/pickuplines');
      const data = await response.json();

      // Create a response similar to the old JSON format
      const responseWithCreator = {
        pickupline: data.pickupline,  // Rename 'pickup' field to 'pickupline'
        creator: 'Toxxic'         // Replace contributor field with creator
      };

      // Respond with pretty-printed JSON
      res.status(200).json(JSON.parse(JSON.stringify(responseWithCreator, null, 2)));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch pickup line' });
    }
  });
}
