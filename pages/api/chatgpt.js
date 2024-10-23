// ./pages/api/chat.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { query } = req; // Get the query parameters

  if (req.method === 'GET' && query.question) {
    const question = query.question;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-proj-pBksWDImP6VuvvJTvqDsT3BlbkFJ2E8GhbpzjyRFkFaBI9Aj`, // Your API key
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: question }],
        }),
      });

      const data = await response.json();
      const answer = data.choices[0]?.message?.content;

      res.status(200).json({ answer });
    } catch (error) {
      console.error('Error fetching from OpenAI API:', error);
      res.status(500).json({ error: 'Failed to fetch answer' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
