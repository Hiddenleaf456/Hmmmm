
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Mocked ChatGPT response for the demo
    const response = `You said: ${message}`;
    
    return res.status(200).json({ response });
  } else {
    res.status(405).json({ error: 'Only POST requests are allowed' });
  }
}
