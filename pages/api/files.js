// pages/api/files.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const uploadDir = path.join(process.cwd(), 'public/uploads');

  // Check if the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    return res.status(404).json({ error: 'No files found' });
  }

  // Read the files in the upload directory
  const files = fs.readdirSync(uploadDir).map((file) => ({
    name: file,
    url: `/uploads/${file}`,
  }));

  res.status(200).json(files);
}
