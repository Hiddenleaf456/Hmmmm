
// ./pages/api/chat.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { query } = req; // Get the query parameters

  if (req.method === 'GET' && query.question) {
    const question = query.question;

    try {
      // Replace this URL with your actual OpenAI API endpoint and add your API key
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_API_KEY`, // Add your OpenAI API key here
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
