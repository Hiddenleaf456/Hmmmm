import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'badboi.json');
const ENTRY_KEY = 'badboi6'; // Define the required entry key

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Read the JSON file
        const jsonData = fs.readFileSync(dataPath);
        const data = JSON.parse(jsonData);
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

        // Read current data
        const jsonData = fs.readFileSync(dataPath);
        const data = JSON.parse(jsonData);

        // Add the new entry
        data.push(newEntry);

        // Write the updated data back to the file
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

        res.status(201).json(newEntry);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
