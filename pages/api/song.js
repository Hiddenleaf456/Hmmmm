// /pages/api/song.js
import { apiKeyMiddleware } from '../../lib/apiKeyMiddleware';

export default async function handler(req, res) {
  // Run the API key middleware first
  await apiKeyMiddleware(req, res, async () => {
    try {
      const { song } = req.query;

      if (!song) {
        return res.status(400).json({ error: 'Song query parameter is required' });
      }

      // Fetch song data from the external API
      const response = await fetch(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(song)}`);
      if (!response.ok) {
        return res.status(500).json({ error: 'Failed to fetch song data' });
      }

      const songData = await response.json();

      // Define the response format with pretty print
      const result = {
        title: songData.title ,
        author: "Toxxic",
        image: songData.image,
        artist: songData.artist, 
        lyrics: songData.lyrics, 
        
      };

      // Return the result with pretty print
      res.status(200).json(result);

    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
}
