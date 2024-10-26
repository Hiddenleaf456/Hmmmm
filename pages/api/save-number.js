// pages/api/save-number.js
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'numbers.json');

// Helper function to read numbers from the file
const readNumbersFromFile = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write numbers to the file
const writeNumbersToFile = (numbers) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(numbers, null, 2));
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { number } = req.body;

    // Validate the input
    if (!number || !/^\d{12}@s\.whatsapp\.net$/.test(number)) {
      return res.status(400).json({ message: 'Invalid number format' });
    }

    // Read existing numbers
    const existingNumbers = readNumbersFromFile();

    // Save the new number
    existingNumbers.push(number);
    writeNumbersToFile(existingNumbers);

    return res.status(200).json({ message: 'Number saved successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
      }
