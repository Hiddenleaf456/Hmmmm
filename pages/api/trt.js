// /pages/api/translate.js
import { apiKeyMiddleware } from '../../lib/apiKeyMiddleware';

export default async function handler(req, res) {
  // Call the middleware
  apiKeyMiddleware(req, res, async () => {
    const { text, lang, apikey } = req.query;

    // Validate input parameters
    if (!text || !lang) {
      return res.status(400).json({ error: 'Please provide both text and lang parameters' });
    }

    try {
      // Make the request to the translation API
      const response = await fetch(`https://api.popcat.xyz/translate?to=${lang}&text=${encodeURIComponent(text)}`);
      const data = await response.json();

      // Send the response with pretty print and author
      res.status(200).json({
        author: "toxxic",
        translatedText: data.translated,
      }, null, 2);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch translation' });
    }
  });
}
