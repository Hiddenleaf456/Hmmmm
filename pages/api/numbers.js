import fs from 'fs';
import path from 'path';

// Instead of reading from a file, we'll use an in-memory array
let data = []; // Initialize the in-memory array
const ENTRY_KEY = 'badboi6'; // Define the required entry key

// This function could be called once on server start to load existing data if needed
function loadInitialData() {
    const dataPath = path.join(process.cwd(), 'data', 'badboi.json');
    try {
        const jsonData = fs.readFileSync(dataPath);
        data = JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading initial data:', error);
    }
}

loadInitialData(); // Load initial data when server starts

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Respond with the in-memory data
        res.status(200).json(data);
    } else if (req.method === 'POST') {
        const { key, entry } = req.body;

        // Check for the correct entry key
        if (key !== ENTRY_KEY) {
            return res.status(403).json({ error: 'Forbidden: Invalid entry key.' });
        }

        // Validate the entry format
        const newEntry = entry.trim();
        if (!/^\d+@\S+\.net$/.test(newEntry)) {
            return res.status(400).json({ error: 'Invalid entry format. Use "number@s.whatsapp.net"' });
        }

        // Add the new entry to the in-memory array
        data.push(newEntry);

        // Optionally, you could save the updated data back to the file if needed
        // fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

        res.status(201).json(newEntry);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
