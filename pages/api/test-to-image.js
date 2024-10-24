// pages/api/text-to-image.js

import axios from 'axios';

export default async function handler(req, res) {
    // Handle GET requests
    if (req.method === 'GET') {
        const { prompt, width, height, n } = req.query;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        try {
            const response = await axios.post(
                `https://${process.env.RAPIDAPI_HOST}/texttoimage2`,
                {
                    prompt,
                    width: width || 512, // Default width
                    height: height || 512, // Default height
                    n: n || 1 // Default number of images
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
                    }
                }
            );

            res.status(200).json(response.data); // Send generated images data as response
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while generating images' });
        }
    }

    // Handle POST requests
    else if (req.method === 'POST') {
        const { prompt, width, height, n } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        try {
            const response = await axios.post(
                `https://${process.env.RAPIDAPI_HOST}/texttoimage2`,
                {
                    prompt,
                    width: width || 512, // Default width
                    height: height || 512, // Default height
                    n: n || 1 // Default number of images
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
                    }
                }
            );

            res.status(200).json(response.data); // Send generated images data as response
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while generating images' });
        }
    } else {
        // Method Not Allowed
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
