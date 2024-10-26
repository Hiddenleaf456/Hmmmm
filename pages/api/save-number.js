// pages/api/save-number.js
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'numbers.json');

// Helper function to read numbers from the file
const readNumbersFromFile = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      // If the file doesn't exist, return an empty array
      return [];
    }
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
};

// Helper function to write numbers to the file
const writeNumbersToFile = (numbers) => {
  try {
    // Ensure the directory exists
    const directory = path.dirname(dataFilePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(numbers, null, 2));
  } catch (error) {
    console.error('Error writing to file:', error);
  }
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { number } = req.body;

    // Validate the input
    if (!number || !/^\d{12}@s\.whatsapp\.net$/.test(number)) {
      return res.status(400).json({ message: 'Invalid number format. Expected 12 digits.' });
    }

    try {
      // Read existing numbers
      const existingNumbers = readNumbersFromFile();

      // Check if the number already exists
      if (existingNumbers.includes(number)) {
        return res.status(409).json({ message: 'Number already exists' });
      }

      // Save the new number
      existingNumbers.push(number);
      writeNumbersToFile(existingNumbers);

      return res.status(200).json({ message: 'Number saved successfully' });
    } catch (error) {
      console.error('Error handling request:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
