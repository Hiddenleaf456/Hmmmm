
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process the request body here
    res.status(200).json({ message: 'API data stored successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
