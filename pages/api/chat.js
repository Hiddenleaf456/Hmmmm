import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { query, body } = req;
  const question = req.method === 'GET' ? query.question : body.question;

  if ((req.method === 'GET' || req.method === 'POST') && question) {
    try {
      // Fetch API key from environment variables
      const apiKey = sk-TGhX2mUrViSyAzqhOoVCzgmV1tpUdj2Jkn9_WWnyTUT3BlbkFJiji_I9fH_riCLebSs3V2lXPJPYUrFOLvoLGg4-MHQA;

      if (!apiKey) {
        throw new Error('Missing OpenAI API key in environment variables');
      }

      // Make a request to the OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: question }],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch from OpenAI API');
      }

      const answer = data.choices[0]?.message?.content;
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
