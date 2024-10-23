// lib/logger.js

const logs = [];

export const logRequest = (req) => {
  const logEntry = {
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  };
  logs.push(logEntry);
};

export const getLogs = () => {
  return logs;
};
