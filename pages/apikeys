import { useEffect, useState } from 'react';

export default function ApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [newApiKey, setNewApiKey] = useState('');
  const [requestsPerDay, setRequestsPerDay] = useState(0);
  const [unlimited, setUnlimited] = useState(false);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    const response = await fetch('/api/getApiKeys');
    const data = await response.json();
    setApiKeys(data);
  };

  const addApiKey = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/addApiKey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apikey: newApiKey,
        requests_per_day: requestsPerDay,
        unlimited,
      }),
    });

    if (response.ok) {
      setNewApiKey('');
      setRequestsPerDay(0);
      setUnlimited(false);
      fetchApiKeys();
    } else {
      console.error('Error adding API key');
    }
  };

  const deleteApiKey = async (apikey) => {
    const response = await fetch('/api/deleteApiKey', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apikey }),
    });

    if (response.ok) {
      fetchApiKeys();
    } else {
      console.error('Error deleting API key');
    }
  };

  const updateApiKey = async (apikey) => {
    const requestsPerDay = prompt("Enter new requests per day:", "0");
    const unlimited = confirm("Is this API key unlimited?");

    const response = await fetch('/api/updateApiKey', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apikey,
        requests_per_day: Number(requestsPerDay),
        unlimited,
      }),
    });

    if (response.ok) {
      fetchApiKeys();
    } else {
      console.error('Error updating API key');
    }
  };

  return (
    <div>
      <h1>API Key Management</h1>
      <form onSubmit={addApiKey}>
        <input
          type="text"
          placeholder="API Key"
          value={newApiKey}
          onChange={(e) => setNewApiKey(e.target
