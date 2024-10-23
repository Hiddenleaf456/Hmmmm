import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { query, body } = req;
  const question = req.method === 'GET' ? query.question : body.question;

  if ((req.method === 'GET' || req.method === 'POST') && question) {
    try {
      // Construct the URL for the chatbot API
      const apiUrl = `https://itzpire.com/ai/hercai-chat?model=v3&q=${encodeURIComponent(question)}`;

      // Make a request to the external chatbot API
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch from chatbot API');
      }

      // Relay the external API's response but modify the author field
      res.status(200).json({
        status: data.status,
        author: "Toxxic",  // Changing the author to "Toxxic"
        code: data.code,
        data: {
          model: v1,    // Use the same model
          response: data.data.response  // Relay the chatbot's response
        }
      });

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        status: "error",
        author: "Toxxic",
        code: 500,
        message: error.message || 'Internal Server Error'
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({
      status: "error",
      author: "Toxxic",
      code: 405,
      message: `Method ${req.method} Not Allowed`
    });
  }
}
