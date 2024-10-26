import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1a1a1a;
  color: #fff;
  padding: 50px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #00e676;
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`;

const Description = styled.p`
  font-size: 1.8rem;
  margin-top: 30px;
  text-align: center;
  max-width: 600px;
  line-height: 1.6;
  color: #b3b3b3;
`;

const UptimeDisplay = styled.p`
  font-size: 1.5rem;
  margin-top: 20px;
  color: #b3b3b3;
`;

const IpAddressDisplay = styled.p`
  font-size: 1.5rem;
  margin-top: 20px;
  color: #b3b3b3;
`;

const BatteryStatus = styled.p`
  font-size: 1.5rem;
  margin-top: 20px;
  color: #b3b3b3;
`;

const Button = styled.a`
  background-color: #00e676;
  color: #000;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1.2rem;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #00c853;
    transform: scale(1.05);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  color: #000;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
`;

const PremiumSection = styled.div`
  margin-top: 50px;
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const PremiumButton = styled.button`
  background-color: #00e676;
  color: #000;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  font-size: 1rem;

  &:hover {
    background-color: #00c853;
  }
`;

// Main component
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
    if (!batteryStatus) return <BatteryStatus>Battery status information is not available.</BatteryStatus>;

    const { level, charging } = batteryStatus;

    return (
      <BatteryStatus>
        Battery Level: {Math.round(level * 100)}% <br />
        Status: {charging ? 'Charging' : 'Not Charging'}
      </BatteryStatus>
    );
  };

  return (
    <Container>
      <Title>Welcome To Toxxic Tecg API</Title>
      <Description>Your one-stop shop for APIs Endpoints!</Description>
      <UptimeDisplay>
        Uptime: {uptime.days} days, {uptime.hours} hours, {uptime.minutes} minutes, {uptime.seconds} seconds
      </UptimeDisplay>
      <IpAddressDisplay>
        Your IP address: <strong>{ipAddress}</strong>
      </IpAddressDisplay>
      {renderBatteryStatus()}

      <ButtonContainer>
        <Link href="/api-list" passHref>
          <Button>View APIs</Button>
        </Link>
      </ButtonContainer>

      <PremiumSection>
        <h2 style={{ margin: '0 0 10px', color: '#00e676' }}>Buy Premium API Key</h2>
        <p style={{ margin: '0 0 20px', color: '#b3b3b3' }}>
          Unlock more features and higher limits by purchasing a premium API key.
        </p>
        <Link href="/pricing" passHref>
          <PremiumButton>View Pricing</PremiumButton>
        </Link>
      </PremiumSection>

      {/* Modal for API Key Information */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2 style={{ margin: 0 }}>API Key Giveaway</h2>
            <p style={{ margin: '10px 0' }}>
              Yo Since we Are Launching Use Our Free Apikey: <strong>toxxicboy</strong> and get 500 requests on all endpoints.
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
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
    }
