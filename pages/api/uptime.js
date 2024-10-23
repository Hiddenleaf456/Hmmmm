// pages/api/uptime.js
import { getUptime } from '../../lib/uptime';

const handler = (req, res) => {
  const { days, hours, minutes, seconds } = getUptime();
  res.status(200).json({ days, hours, minutes, seconds });
};

export default handler;
