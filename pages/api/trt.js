// pages/api/translate.js
import { apiKeyMiddleware } from '../../lib/apiKeyMiddleware';

export default async function handler(req, res) {
  // Middleware for API key validation
  apiKeyMiddleware(req, res, async () => {
    const { text, lang } = req.query;

    // Validate input
    if (!text || !lang) {
      return res.status(400).json({ error: 'Please provide both text and lang parameters' });
    }

    try {
      // Fetch translation from the PopCat API
      const response = await fetch(`https://api.popcat.xyz/translate?to=${lang}&text=${encodeURIComponent(text)}`);
      const data = await response.json();

      // Format response with pretty print and author
      res.status(200).json({
        author: "toxxic",
        translatedText: data.translated,
      }, null, 2);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch translation' });
    }
  });
}
