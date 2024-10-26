import fs from 'fs';
import path from 'path';

// Path to the numbers.json file
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

// API handler for saving a number
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { number } = req.body;

    // Validate the input (1-15 digits)
    if (!number || !/^\d{1,15}@s\.whatsapp\.net$/.test(number)) {
      return res.status(400).json({ message: 'Invalid number format. Expected between 1 and 15 digits.' });
    }

    try {
      // Read existing numbers
      const existingNumbers = readNumbersFromFile();

      // Check if the number already exists
      if (existingNumbers.includes(number)) {
        return res.status(409).json({ message: 'Number already exists' });
      }

      // Save the new number
