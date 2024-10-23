import React from 'react';
import Link from 'next/link';

export default function ApiList() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start', // Aligning items to the left
      height: '100vh',
      backgroundColor: '#121212',
      color: '#fff',
      padding: '50px 20px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{
        fontSize: '3.5rem',
        color: '#00e676',
        fontWeight: 'bold',
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
        marginBottom: '40px',
      }}>
        Explore Our APIs
      </h1>

      <div style={{
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px', // Space between buttons
      }}>
        {/** GPT-3 API **/}
        <Link href="/api/chat?question=hello">
          <a style={{
            backgroundColor: '#00e676',
            color: '#000',
            padding: '15px 30px',
            borderRadius: '10px',
            fontSize: '1.3rem',
            textDecoration: 'none',
            textAlign: 'left', // Align text to the left
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
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
            padding: '15px 30px',
            borderRadius: '10px',
            fontSize: '1.3rem',
            textDecoration: 'none',
            textAlign: 'left',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
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
            padding: '15px 30px',
            borderRadius: '10px',
            fontSize: '1.3rem',
            textDecoration: 'none',
            textAlign: 'left',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
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
          alignSelf: 'flex-start', // Aligning the back link to the left
        }}>
          Back to Dashboard
        </a>
      </Link>
    </div>
  );
}
