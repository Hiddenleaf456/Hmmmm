import { useEffect, useState } from 'react';

export default function Home() {
    const [entries, setEntries] = useState([]);
    const [numberInput, setNumberInput] = useState('');
    const [entryKey, setEntryKey] = useState('');

    useEffect(() => {
        fetch('/api/numbers')
            .then((response) => response.json())
            .then((data) => setEntries(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEntry = `${numberInput}@s.whatsapp.net`;

        const response = await fetch('/api/numbers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key: entryKey, entry: newEntry }),
        });

        if (response.ok) {
            setEntries((prev) => [...prev, newEntry]);
            setNumberInput('');
            setEntryKey('');
        } else {
            const errorData = await response.json();
            alert(errorData.error);
        }
    };

    return (
        <div>
            <h1>Numbers List</h1>
            <ul>
                {entries.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </ul>
            <h2>Add New Entry</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Number"
                    value={numberInput}
                    onChange={(e) => setNumberInput(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Entry Key"
                    value={entryKey}
                    onChange={(e) => setEntryKey(e.target.value)}
                    required
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
                             }
