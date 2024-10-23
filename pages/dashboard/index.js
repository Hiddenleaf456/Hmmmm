 import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Check if user is authenticated
    if (!token) {
      router.push('/auth'); // Redirect if not authenticated
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    router.push('/auth');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard. You have access to the API.</p>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h2>API Access</h2>
        <p>
          You can access the API at: <a href="/api/chatgpt" target="_blank" rel="noopener noreferrer">/api/data</a>
        </p>
      </div>
    </div>
  );
}
