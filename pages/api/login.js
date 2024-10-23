
export default function handler(req, res) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  // Simple authentication check (replace with real logic)
  const validCredentials = {
    username: 'toxxic',
    password: 'riasadmin',
  };

  // Input validation
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  // Check credentials
  if (username === validCredentials.username && password === validCredentials.password) {
    return res.status(200).json({ success: true, token: 'fake-jwt-token' });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
}