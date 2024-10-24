import axios from 'axios';
import { apiKeyMiddleware } from '../../lib/apiKeyMiddleware';

// Create a wrapper to apply the middleware
const withApiKeyMiddleware = (handler) => {
  return (req, res) => {
    apiKeyMiddleware(req, res, () => {
      handler(req, res);
    });
  };
};
    if (req.method === 'GET') {
        const { prompt } = req.query;

        // Validate prompt presence
        if (!prompt) {
            return res.status(400).json({ message: 'Prompt is required' });
        }

        try {
            // Fetch data from the external API
            const response = await axios.get(`https://itzpire.com/ai/photoleap?prompt=${encodeURIComponent(prompt)}`);

            // Modify the response data to include "Toxxic" as the author
            const modifiedData = {
                ...response.data,
                author: 'Toxxic'
            };

            // Send the modified data as the response
            return res.status(200).json(modifiedData);
        } catch (error) {
            console.error('Error fetching data from external API:', error);

            // Handle different error scenarios
            if (error.response) {
                // Client received an error response (5xx, 4xx)
                return res.status(error.response.status).json({ message: error.response.data.message || 'Error retrieving data' });
            } else if (error.request) {
                // Client never received a response, or request never left
                return res.status(503).json({ message: 'Service unavailable. Please try again later.' });
            } else {
                // Anything else
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
