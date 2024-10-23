// pages/api/download.js

import axios from 'axios';

export default async function handler(req, res) {
    const { url } = req.query;

    // Check if the URL parameter is provided
    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        // Make a request to the external URL
        const response = await axios.get(`https://itzpire.com/download/aio?url=${url}`);

        // Create a custom response including the original data and the author
        const customResponse = {
            author: 'Toxxic',
          status: response.status,
            data: response.data,
            
        };

        // Return the custom response
        res.status(response.status).json(customResponse);
    } catch (error) {
        // Handle errors and send back the error response
        if (error.response) {
            // If there's a response from the server
            res.status(error.response.status).json({ 
                author: 'Toxxic',
                error: error.response.data 
            });
        } else {
            // If there's no response, return a generic error
            res.status(500).json({ 
                author: 'Toxxic',
                error: 'An error occurred while fetching the links.' 
            });
        }
    }
}
