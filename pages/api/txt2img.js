import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { prompt } = req.query;

        if (!prompt) {
            return res.status(400).json({ message: 'Prompt is required' });
        }

        try {
            const response = await axios.get(`https://itzpire.com/ai/photoleap?prompt=${encodeURIComponent(prompt)}`);

            // Modify the response data to include "Toxxic" as the author
            const modifiedData = {
                ...response.data,
                author: 'Toxxic'
            };

            res.status(200).json(modifiedData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
