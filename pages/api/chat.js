import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { query, body } = req;
  const question = req.method === 'GET' ? query.question : body.question;

  if ((req.method === 'GET' || req.method === 'POST') && question) {
    try {
      // Construct the URL for the chatbot API
      const apiUrl = `https://itzpire.com/ai/hercai-chat?model=v3&q=${encodeURIComponent(question)}`;

      // Make a request to the chatbot API
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

      const answer = data.answer; // Adjust based on the actual structure of the response
      res.status(200).json({ answer });

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
