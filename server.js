const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 8080;

const pool = new Pool({
  host: process.env.POSTGRESQL_HOST || 'postgresql',
  port: process.env.POSTGRESQL_PORT || 5432,
  user: process.env.POSTGRESQL_USER || 'testuser',
  password: process.env.POSTGRESQL_PASSWORD || '123456',
  database: process.env.POSTGRESQL_DATABASE || 'testdb',
});

app.get('/dbcheck', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`✅ Connected to DB. Time: ${result.rows[0].now}`);
  } catch (err) {
    console.error('❌ DB error:', err);
    res.status(500).send('❌ Failed to connect to DB');
  }
});

app.get('/', (req, res) => {
  res.send('🌐 Hello from OpenShift + Node.js + PostgreSQL!');
});

app.listen(port, () => {
  console.log(`🚀 App running on port ${port}`);
});
