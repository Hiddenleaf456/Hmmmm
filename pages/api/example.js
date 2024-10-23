// pages/api/example.js
import { logRequest } from '../../lib/logger';

const handler = (req, res) => {
  logRequest(req); // Log the request

  // Your existing API logic
  res.status(200).json({ message: 'Request successful' });
};

export default handler;
