import fetch from 'node-fetch';
import { apiKeyMiddleware } from '../../lib/apiKeyMiddleware';

// Create a wrapper to apply the middleware
const withApiKeyMiddleware = (handler) => {
  return async (req, res) => {
    await apiKeyMiddleware(req, res, () => {
      handler(req, res);
    });
  };
};

const handler = async (req, res) => {
  const { query, body } = req;
  const question = req.method === 'GET' ? query.question : body.question;

  if ((req.method === 'GET' || req.method === 'POST') && question) {
    try {
      // Construct the URL for the chatbot API
      const apiUrl = ``;

      // Make a request to the external chatbot API
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the external API responded correctly
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || 'Failed to fetch from chatbot API');
      }

      // Parse the response from the chatbot API
      const data = await response.json();

      // Format the response with pretty print
      const prettyPrintResponse = JSON.stringify({
        status: data.status,
        author: "Toxxic",  // Keeping the author as Toxxic
        code: data.code,
        data: {
          response: data.response  // Relay the chatbot's response
        }
      }, null, 2); // 2-space indentation for pretty print

      // Send the pretty-printed JSON response
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(prettyPrintResponse);

    } catch (error) {
      console.error('Error:', error);
      const errorResponse = JSON.stringify({
        status: "error",
        author: "Toxxic",
        code: 500,
        message: error.message || 'Internal Server Error'
      }, null, 2); // Pretty print error

      res.setHeader('Content-Type', 'application/json');
      res.status(500).send(errorResponse);
    }
  } else {
    const errorResponse = JSON.stringify({
      status: "error",
      author: "Toxxic",
      code: 405,
      message: `Method ${req.method} Not Allowed`
    }, null, 2); // Pretty print method error

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).send(errorResponse);
  }
};

// Export the wrapped handler
export default withApiKeyMiddleware(handler);
