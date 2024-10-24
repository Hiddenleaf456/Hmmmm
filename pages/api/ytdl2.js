import axios from 'axios';
import { apiKeyMiddleware } from '../../lib/apiKeyMiddleware';

export default async function handler(req, res) {
  // Apply API key middleware
  apiKeyMiddleware(req, res, async () => {
    const { title } = req.query; // Get title from the query params

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    try {
      // Fetch data from the external API
      const response = await axios.get(`https://itzpire.com/download/play-youtube?title=${encodeURIComponent(title)}`);

      // Modify the response to include the author
      const dataWithAuthor = {
        ...response.data, // Spread the original data
        author: 'Toxxic' // Add the author property
      };

      // Return the modified data
      res.status(200).json(dataWithAuthor);
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: 'Failed to fetch data from the external API', details: error.message });
    }
  });
}
