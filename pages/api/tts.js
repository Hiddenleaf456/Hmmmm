// pages/api/text-to-speech.js
import { NextApiRequest, NextApiResponse } from 'next';
import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs';
import util from 'util';

// Create a Text-to-Speech client
const client = new textToSpeech.TextToSpeechClient();

export default async function handler(req = NextApiRequest, res = NextApiResponse) {
    if (req.method === 'GET') {
        // Extract parameters from query
        const { text, languageCode = 'en-US', voiceName = 'en-US-Wavenet-D', ssmlGender = 'NEUTRAL' } = req.query;

        // Ensure that text is provided
        if (!text) {
            return res.status(400).json({ success: false, message: 'Text is required' });
        }

        // Configure the request for the TTS service
        const request = {
            input: { text: text },
            voice: {
                languageCode: languageCode, // Default to English (US) if not provided
                name: voiceName,  // Default voice
                ssmlGender: ssmlGender,  // Voice gender
            },
            audioConfig: { audioEncoding: 'MP3' },
        };

        try {
            // Perform the text-to-speech request
            const [response] = await client.synthesizeSpeech(request);

            // Write the audio content to a file (optional, for debugging purposes)
            const writeFile = util.promisify(fs.writeFile);
            const filePath = `/tmp/output.mp3`;
            await writeFile(filePath, response.audioContent, 'binary');

            // Return the MP3 file to the client
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Content-Disposition', `attachment; filename="output.mp3"`);
            return res.send(response.audioContent);
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
