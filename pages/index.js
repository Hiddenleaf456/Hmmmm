import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [uptime, setUptime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [ipAddress, setIpAddress] = useState('');
  const [batteryStatus, setBatteryStatus] = useState(null);
  const [showModal, setShowModal] = useState(true); // State to control modal visibility

  useEffect(() => {
    const fetchUptime = async () => {
      const response = await fetch('/api/uptime');
      const data = await response.json();
      setUptime(data);
    };

    const fetchIpAddress = async () => {
      const response = await fetch('/api/get-ip');
      const data = await response.json();
      setIpAddress(data.ip);
    };

    // Fetch uptime and IP address initially
    fetchUptime();
    fetchIpAddress();

    const interval = setInterval(fetchUptime, 10000); // Update uptime every 10 seconds

    // Battery Status API
    const getBatteryStatus = async () => {
      if ('getBattery' in navigator) {
        const battery = await navigator.getBattery();
        setBatteryStatus(battery);
      } else {
        console.warn('Battery Status API not supported in this browser.');
      }
    };

    getBatteryStatus();

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  // Display battery information if available
  const renderBatteryStatus = () => {
    if (!batteryStatus) return <p>Battery status information is not available.</p>;

    const { level, charging } = batteryStatus;

    return (
      <p style={{ fontSize: '1.5rem', marginTop: '20px', color: '#b3b3b3' }}>
        Battery Level: {Math.round(level * 100)}% <br />
        Status: {charging ? 'Charging' : 'Not Charging'}
      </p>
    );
  };

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

      {/* Uptime Display */}
      <p style={{
        fontSize: '1.5rem',
        marginTop: '20px',
        color: '#b3b3b3',
      }}>
        Uptime: {uptime.days} days, {uptime.hours} hours, {uptime.minutes} minutes, {uptime.seconds} seconds
      </p>

      {/* IP Address Display */}
      <p style={{
        fontSize: '1.5rem',
        marginTop: '20px',
        color: '#b3b3b3',
      }}>
        Your IP address: <strong>{ipAddress}</strong>
      </p>

      {/* Battery Status Display */}
      {renderBatteryStatus()}

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '40px',
      }}>
        {/* Button to view APIs */}
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

      {/* New Button to Buy Premium API Key */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
      }}>
        <Link href="/pricing">
          <a style={{
            backgroundColor: '#ff1744',
            color: '#fff',
            padding: '14px 28px',
            borderRadius: '8px',
            fontSize: '1.2rem',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          }}
          onMouseOver={e => {
            e.target.style.backgroundColor = '#d50000';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={e => {
            e.target.style.backgroundColor = '#ff1744';
            e.target.style.transform = 'scale(1)';
          }}>
            Buy Premium API Key
          </a>
        </Link>
      </div>

      {/* Modal for API Key Information */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            width: '300px',
          }}>
            <h2 style={{ margin: 0 }}>API Key Giveaway</h2>
            <p style={{ margin: '10px 0' }}>
              Yo Since we Are Launching Use Our Free Apikey: <strong>toxxicboy</strong> and get 100 requests on all endpoints.
            </p>
            <button onClick={closeModal} style={{
              backgroundColor: '#00e676',
              color: '#000',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '15px',
              fontSize: '1rem',
            }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
