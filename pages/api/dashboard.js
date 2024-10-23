
export default function handler(req, res) {
  const { token } = req.headers;

  // Check if token exists and is valid (replace with real validation)
  if (token === 'fake-jwt-token') {
    return res.status(200).json({ success: true, data: 'Welcome to the Dashboard!' });
  }

  return res.status(403).json({ success: false, message: 'Access Denied' });
}
