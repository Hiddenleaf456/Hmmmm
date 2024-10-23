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
        Access our free, unlimited APIs for seamless integration into your projects!
      </p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '40px',
      }}>
        {/** Link to GPT-3 API **/}
        <Link href="/api/chat?question=hello">
          <a style={{
            backgroundColor: '#00e676',
            color: '#000',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1.2rem',
            textDecoration: 'none',
            marginBottom: '10px', // Small space between buttons
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
            Use GPT-3 API
          </a>
        </Link>

        {/** Link to Image Upload API **/}
        <Link href="/api/upload-image">
          <a style={{
            backgroundColor: '#00e676',
            color: '#000',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1.2rem',
            textDecoration: 'none',
            marginBottom: '10px', // Small space between buttons
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
            Upload Image
          </a>
        </Link>

        {/** Link to YouTube Download API **/}
        <Link href="/api/ytdl">
          <a style={{
            backgroundColor: '#00e676',
            color: '#000',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1.2rem',
            textDecoration: 'none',
            marginBottom: '10px', // Small space between buttons
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
            Download YouTube Videos
          </a>
        </Link>
      </div>
    </div>
  );
          }
