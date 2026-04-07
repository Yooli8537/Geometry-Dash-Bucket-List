const express = require('express');
const { application, json } = require("express");
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// If data.json is missing, it creates an empty data.json file. Main use is for a fresh close of the app.
if (!fs.existsSync("data.json")) {
  fs.writeFileSync("data.json", "[]");
}

// GET request
app.get('/data', (req, res) => {
  const data = fs.readFileSync('data.json', 'utf-8');
  res.json(JSON.parse(data));
});

// POST request
app.post('/data', (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  data.push(req.body);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// Confirmation message
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});