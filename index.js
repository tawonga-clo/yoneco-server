const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'yoneco_db',
  password: 'tawonga',   // use your postgres password
  port: 5432
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send("Server is running!");
});

// Save case data
app.post('/api/cases', async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO cases (payload) VALUES ($1) RETURNING id",
      [req.body]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
