// ./pages/api/chat.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { query, body } = req; // Get the query parameters and body

  // Determine the question based on the method
  const question = req.method === 'GET' ? query.question : body.question;

  if ((req.method === 'GET' || req.method === 'POST') && question) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-TGhX2mUrViSyAzqhOoVCzgmV1tpUdj2Jkn9_WWnyTUT3BlbkFJiji_I9fH_riCLebSs3V2lXPJPYUrFOLvoLGg4-MHQA, // Your API key
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
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
