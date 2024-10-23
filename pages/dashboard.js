
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [data, setData] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/dashboard', {
        headers: { 'token': token }
      });

      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        router.push('/login');
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Dashboard</h1>
      <p>{data}</p>
    </div>
  );
}
