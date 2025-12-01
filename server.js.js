const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const db = new Pool({
  connectionString: "postgresql://yoneco_db_qt0v_user:wpUAchzamjzvwaUGh3BWtTj4TeR8lMkk@dpg-d4medtogjchc73b79j0g-a/yoneco_db_qt0v"
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
