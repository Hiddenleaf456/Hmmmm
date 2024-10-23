
import { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter(); // Initialize useRouter

    const handleLogin = async (e) => {
        e.preventDefault();
        // Simulate login functionality
        if (username === 'admin' && password === 'password') {
            setMessage('Login successful!');
            // Redirect to dashboard
            router.push('/dashboard'); // Use router to navigate
        } else {
            setMessage('Invalid credentials, please create an account.');
        }
    };

    const handleCreateAccount = async () => {
        // Simulate account creation
        setMessage('Account created! You can now log in.');
        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <button onClick={handleCreateAccount}>Create Account</button>
            {message && <p>{message}</p>}
        </div>
    );
}
