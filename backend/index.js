const express = require("express");
const db = require("./db");

// Define express app
const app = express();
const port = 4000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));
app.get("/api/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

// Start the server
app.listen(port, () => console.log(`App running on port ${port}`));

app.get('/greet', (req, res) => {
  const name = req.query.name || 'desconocido';
  res.json({ message: `¡Hola, ${name}!` });
});


//para agregar estudiantes 

app.post("/api/students", async (req, res) => {
  try {
    const { name } = req.body;
    const result = await db.query(
      "INSERT INTO students (name) VALUES ($1) RETURNING id, name",
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});
