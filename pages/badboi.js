import { useEffect, useState } from 'react';

export default function Home() {
    const [entries, setEntries] = useState([]);
    const [numberInput, setNumberInput] = useState('');
    const [entryKey, setEntryKey] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch('/api/numbers');
                if (!response.ok) throw new Error('Failed to fetch entries');
                const data = await response.json();
                setEntries(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEntry = `${numberInput}@s.whatsapp.net`;

        setSubmitting(true);
        try {
            const response = await fetch('/api/numbers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ key: entryKey, entry: newEntry }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            setEntries((prev) => [...prev, newEntry]);
            setNumberInput('');
            setEntryKey('');
        } catch (err) {
            alert(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Numbers List</h1>
            <ul>
                {entries.map((entry) => (
                    <li key={entry}>{entry}</li>  // Assuming 'entry' is unique
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
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Adding...' : 'Add'}
                </button>
            </form>
        </div>
    );
}
