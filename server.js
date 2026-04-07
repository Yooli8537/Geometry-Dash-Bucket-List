const express = require('express');
const { application, json } = require("express");
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/data', (req, res) => {
  const data = fs.readFileSync('data.json', 'utf-8');
  res.json(JSON.parse(data));
});

app.post('/data', (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  data.push(req.body);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});