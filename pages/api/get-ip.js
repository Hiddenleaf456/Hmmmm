// pages/api/get-ip.js
export default function handler(req, res) {
  const { headers } = req;

  // Retrieve the IP address
  let ip;

  // Check the headers to find the real client IP address
  if (headers['x-forwarded-for']) {
    // If behind a proxy, the IP might be in x-forwarded-for
    ip = headers['x-forwarded-for'].split(',')[0]; // Get the first IP in the list
  } else if (headers['x-real-ip']) {
    // Sometimes, the real IP is in x-real-ip
    ip = headers['x-real-ip'];
  } else {
    // Fallback to req.connection.remoteAddress
    ip = req.connection.remoteAddress;
  }

  res.status(200).json({ ip });
}
