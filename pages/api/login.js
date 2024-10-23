
export default function handler(req, res) {
  const { username, password } = req.body;

  // Simple authentication check (replace with real logic)
  if (username === 'admin' && password === 'admin') {
    return res.status(200).json({ success: true, token: 'fake-jwt-token' });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
}
