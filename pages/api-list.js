import React from 'react';
import Link from 'next/link';

export default function ApiList() {
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
        fontSize: '3rem',
        color: '#00e676',
        fontWeight: 'bold',
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
        marginBottom: '20px',
      }}>
        Available APIs
      </h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/** GPT-3 API **/}
        <Link href="/api/chat?question=hello">
          <a style={{
            backgroundColor: '#00e676',
            color: '#000',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1.2rem',
            textDecoration: 'none',
            marginBottom: '30px', // Small space between buttons
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

        {/** Upload Image API **/}
        <Link href="/api/upload-image">
          <a style={{
            backgroundColor: '#00e676',
            color: '#000',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1.2rem',
            textDecoration: 'none',
            marginBottom: '30px',
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

        {/** YouTube Download API **/}
        <Link href="/api/ytdl?query=">
          <a style={{
            backgroundColor: '#00e676',
            color: '#000',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1.2rem',
            textDecoration: 'none',
            marginBottom: '30px',
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

      <Link href="/">
        <a style={{
          color: '#00e676',
          textDecoration: 'underline',
          marginTop: '20px',
        }}>
          Back to Dashboard
        </a>
      </Link>
    </div>
  );
}
