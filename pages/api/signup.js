
import bcrypt from 'bcryptjs';

const users = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    users.push({ username, password: hashedPassword });
    res.status(201).json({ success: true });
  }
}
