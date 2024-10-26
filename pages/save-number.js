// pages/save-number.js
import { useState } from 'react';

export default function SaveNumber() {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true); // Show loading state
    setMessage('');

    const formattedNumber = `${number.trim()}`;
    
    try {
      const response = await fetch('/api/save-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: formattedNumber }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Number saved successfully!');
        setNumber(''); // Clear input after saving
      } else {
        setMessage(result.message || 'Error saving number');
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
    }

    setLoading(false); // Hide loading state
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Save WhatsApp Number</h1>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter phone number"
        disabled={loading}
      />
      <button onClick={handleSave} disabled={loading || !number.trim()}>
        {loading ? 'Saving...' : 'Save'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
      }
