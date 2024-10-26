import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100vh;
  background-color: #121212;
  color: #fff;
  padding: 50px 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #00e676;
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
`;

const Button = styled.a`
  background-color: #00e676;
  color: #000;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 1.3rem;
  text-decoration: none;
  text-align: left;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background-color: #00c853;
    transform: scale(1.05);
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px; // Space between buttons
`;

const BackLink = styled.a`
  color: #00e676;
  text-decoration: underline;
  margin-top: auto;
`;

// Main component
export default function ApiList() {
  return (
    <Container>
      <Title>Explore Our APIs</Title>
      <ButtonContainer>
        {/** List of APIs **/}
        <Link href="/api/chat?question=hello&apikey=toxxicboy" passHref>
          <Button>GPT-4 API</Button>
        </Link>
        <Link href="/api/animeQuotes" passHref>
          <Button>ANIME QUOTES</Button>
        </Link>
        <Link href="/api/txt2img?prompt=goku&apikey=toxxicboy" passHref>
          <Button>TXT2IMG API</Button>
        </Link>
        <Link href="/api/ytdl?query=oseba" passHref>
          <Button>YT SEARCH</Button>
        </Link>
        <Link href="/api/ytdl2?title=oseba&apikey=toxxicboy" passHref>
          <Button>YTMP3 AND YTMP4</Button>
        </Link>
        <Link href="/api/get-ip" passHref>
          <Button>IP API</Button>
        </Link>
        <Link href="/api/song?apikey=toxxicboy&song=believer" passHref>
          <Button>LYRICS API</Button>
        </Link>
        <Link href="/api/line?apikey=toxxicboy" passHref>
          <Button>PICKUP LINES</Button>
        </Link>
      </ButtonContainer>
      <Link href="/" passHref>
        <BackLink>Back to Dashboard</BackLink>
      </Link>
    </Container>
  );
    }
