// lib/uptime.js
let startTime = new Date();

const getUptime = () => {
  const now = new Date();
  const uptime = now - startTime; // Calculate uptime in milliseconds
  const seconds = Math.floor((uptime / 1000) % 60);
  const minutes = Math.floor((uptime / (1000 * 60)) % 60);
  const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
};

export { getUptime };
