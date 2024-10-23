// pages/api/upload-image.js
import formidable from 'formidable';
import fetch from 'node-fetch';
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
      const apiKey = process.env.IMGBB_API_KEY;

      if (!apiKey) {
        throw new Error('Missing ImgBB API key in environment variables');
      }

      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append('image', fs.createReadStream(image.filepath));

      // Make a request to the ImgBB API
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to upload image to ImgBB');
      }

      const imageUrl = data.data.url; // The URL of the uploaded image
      res.status(200).json({ 
        success: true, 
        imageUrl, 
        author: 'Toxxic' // Include the author field
      });

    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });
}
