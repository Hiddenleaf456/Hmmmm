// pages/api/get-numbers.js
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'numbers.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      const numbers = JSON.parse(data);
      return res.status(200).json(numbers);
    } catch (error) {
      return res.status(500).json({ message: 'Error reading numbers' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
