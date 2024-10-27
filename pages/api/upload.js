// pages/api/upload.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable Next.js body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  // Set the directory where files will be saved
  const uploadDir = path.join(process.cwd(), 'public/uploads');

  // Ensure the upload directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  form.uploadDir = uploadDir;

  form.on('file', (field, file) => {
    // Move the file to the upload directory
    const newPath = path.join(uploadDir, file.name);
    fs.renameSync(file.path, newPath);
  });

  form.on('end', () => {
    res.status(200).json({ message: 'File uploaded successfully' });
  });

  form.on('error', (err) => {
    console.error(err);
    res.status(500).json({ error: 'File upload failed' });
  });

  form.parse(req);
      }
