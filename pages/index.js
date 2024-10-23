import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#1a1a1a',
      color: '#fff',
      padding: '50px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{
        fontSize: '4rem',
        color: '#00e676',
        fontWeight: 'bold',
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
      }}>
        Welcome To Toxxic API
      </h1>

      <p style={{
        fontSize: '1.8rem',
        marginTop: '30px',
        textAlign: 'center',
        maxWidth: '600px',
        lineHeight: '1.6',
        color: '#b3b3b3',
      }}>
        Your one-stop shop for free APIs!
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '40px',
      }}>
        {/** Button to view APIs **/}
        <Link href="/api-list">
          <a style={{
            backgroundColor: '#00e676',
            color: '#000',
            padding: '14px 28px',
            borderRadius: '8px',
            fontSize: '1.2rem',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          }}
          onMouseOver={e => {
            e.target.style.backgroundColor = '#00c853';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={e => {
            e.target.style.backgroundColor = '#00e676';
            e.target.style.transform = 'scale(1)';
          }}>
            View APIs
          </a>
        </Link>
      </div>
    </div>
  );
}
