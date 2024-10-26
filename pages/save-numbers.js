// pages/save-number.js
import { useState } from 'react';

export default function SaveNumber() {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    const formattedNumber = `${number.trim()}@s.whatsapp.net`;
    const response = await fetch('/api/save-number', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number: formattedNumber }),
    });

    if (response.ok) {
      setMessage('Number saved successfully!');
      setNumber(''); // Clear input after saving
    } else {
      const errorData = await response.json();
      setMessage(errorData.message || 'Error saving number');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Save WhatsApp Number</h1>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <button onClick={handleSave}>Save</button>
      {message && <p>{message}</p>}
    </div>
  );
  }
