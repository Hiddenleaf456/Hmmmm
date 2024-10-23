// pages/api/upload-image.js
import formidable from 'formidable';
import fetch from 'node-fetch';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  api: {
    bodyParser: false,
  },
};

// Image upload handler
export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ error: 'Failed to parse form data.' });
    }

    const { image } = files;

    if (!image) {
      return res.status(400).json({ error: 'No image uploaded.' });
    }

    try {
      // Fetch API key from environment variables
      const apiKey = process.env.IMBUR_API_KEY;

      if (!apiKey) {
        throw new Error('Missing Imbur API key in environment variables');
      }

      const fileStream = fs.createReadStream(image.filepath);
      const response = await fetch('https://api.imbur.com/v1/image/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'multipart/form-data',
        },
        body: fileStream,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to upload image to Imbur');
      }

      const imageUrl = data.url; // Adjust based on the API response structure
      res.status(200).json({ 
        success: true, 
        imageUrl, 
        author: 'Toxxic' // Add author field here
      });

    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });
}
