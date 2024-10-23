
import React from 'react';
import './Home.css'; // Import the CSS file

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="title">Welcome to the TOXXIC TECH API Site</h1>
      <p className="description">Your gateway to seamless API integration.</p>
      <div className="button-container">
        <a href="/login" className="button">Login</a>
      </div>
    </div>
  );
}