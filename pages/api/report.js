// pages/report.js
import React, { useEffect, useState } from 'react';
import { getLogs } from '../lib/logger'; // Import the logger

const ReportPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      // Fetching logs directly from the logger
      const fetchedLogs = getLogs();
      setLogs(fetchedLogs);
    };

    fetchLogs();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Usage Report</h1>
      {logs.length === 0 ? (
        <p>No logs available.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Method</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>URL</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{log.method}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{log.url}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportPage;
