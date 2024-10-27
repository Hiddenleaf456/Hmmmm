// lib/db.js
import { Pool } from 'pg';

// Create a pool of connections
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
});

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}
