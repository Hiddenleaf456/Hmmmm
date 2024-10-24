// pages/api/animeQuotes.js
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  try {
    // Get the file path of the JSON file
    const filePath = path.join(process.cwd(), 'data', 'animeQuotes.json');
    
    // Read the JSON file
    const fileContents = await fs.readFile(filePath, 'utf8');
    
    // Parse the JSON data
    const quotes = JSON.parse(fileContents);
    
    // Check if a query for a specific number of quotes is provided
    const { count = 1 } = req.query; // Default to 1 quote if no count is provided
    const numQuotes = Math.min(Number(count), 1000); // Limit to max 1000 quotes

    // Shuffle the quotes and pick the first 'numQuotes' quotes
    const randomQuotes = quotes.sort(() => 0.5 - Math.random()).slice(0, numQuotes);

    // Return the quotes as a response
    res.status(200).json(randomQuotes);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch anime quotes.' });
  }
}
