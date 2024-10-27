// pages/api/users.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        // Fetch users from the database
        const { rows } = await query('SELECT * FROM users', []);
        res.status(200).json({ users: rows });
      } catch (error) {
        res.status(500).json({ error: 'Error retrieving users', details: error.message });
      }
      break;

    case 'POST':
      try {
        const { name, email } = req.body;
        const { rows } = await query(
          'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
          [name, email]
        );
        res.status(201).json({ user: rows[0] });
      } catch (error) {
        res.status(500).json({ error: 'Error adding user', details: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
