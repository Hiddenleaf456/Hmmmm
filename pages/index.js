import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5', paddingTop: '50px' }}>
      <h1 style={{ fontSize: '4rem', color: '#0070f3' }}>Welcome To Toxxic API</h1>
      <p style={{ fontSize: '1.5rem', marginTop: '20px', textAlign: 'center' }}>
        Access Our Free Unlimited APIs<br />
        To use GPT-3 API{' '}
        <Link href="/api/chat?question=hello">
          <a style={{ color: '#0070f3', textDecoration: 'underline' }}>click here</a>
        </Link>
      </p>
      <p style={{ fontSize: '1.5rem', marginTop: '20px', textAlign: 'center' }}>
        To upload an image and get its URL{' '}
        <Link href="/api/upload-image">
          <a style={{ color: '#0070f3', textDecoration: 'underline' }}>click here</a>
        </Link>
      </p>
    </div>
  );
}
