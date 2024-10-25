import React from 'react';
import Link from 'next/link';

export default function ApiList() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', // To distribute space between elements
      alignItems: 'flex-start',
      height: '100vh', // Ensure the container takes up the full height
      backgroundColor: '#121212',
      color: '#fff',
      padding: '50px 20px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div>
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
          gap: '42px', // Space between buttons
        }}>
          {/** GPT-4 API **/}
          <Link href="/api/chat?question=hello&apikey=toxxicboy">
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
              GPT-4 API
            </a>
          </Link>
{/** Anime API **/}
          <Link href="/api/animeQuotes">
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
              ANIME QUOTES
            </a>
          </Link>
        
          {/** Txt2Img Download API **/}
          <Link href="/api/txt2img?prompt=goku&apikey=toxxicboy">
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
              TXT2IMG API
            </a>
          </Link>
          {/** YouTube Search API **/}
          <Link href="/api/ytdl?query=oseba">
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
              YT SEARCH
            </a>
          </Link>
                {/** YouTube Download API **/}
          <Link href="/api/ytdl2?title=oseba&apikey=toxxicboy">
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
              YTMP3 AND YTMP4
            </a>
          </Link>
                {/** GET IP**/}
          <Link href="/api/get-ip">
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
              IP API
            </a>
          </Link>
        </div>
      </div>

      <Link href="/">
        <a style={{
          color: '#00e676',
          textDecoration: 'underline',
          marginTop: 'auto', // Pushes the link to the bottom
        }}>
          Back to Dashboard
        </a>
      </Link>
    </div>
  );
}
