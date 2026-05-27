const { error } = require("console");
const express = require("express");
const { application, json } = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8564;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// If data.json is missing, it creates an empty data.json file. Main use is for a fresh close of the app.
if (!fs.existsSync("data.json")) {
  fs.writeFileSync("data.json", "[]");
}

if (!fs.existsSync("images")) {
  fs.mkdirSync("images");
}

// GET request -> Get all Levels
app.get("/data", (req, res) => {
  const data = fs.readFileSync("data.json", "utf-8");
  res.json(JSON.parse(data));
});

// POST request -> Add new Level
app.post("/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  data.push(req.body);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// PUT request -> Update Level
app.put("/data", (req, res) => {
  const updateData = req.body;
  const updateId = updateData.game_id;

  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  const index = data.findIndex((data) => data.game_id === updateId);

  if (index < 0) {
    return res.status(404).json({ error: "Level not found" });
  }

  data[index] = updateData;
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// DELETE request
app.delete("/data", (req, res) => {
  const deleteId = req.body.game_id;

  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  const index = data.findIndex((data) => data.game_id === deleteId);

  if (index < 0) {
    return res.status(404).json({ error: "Level not found" });
  }

  data.splice(index, 1);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// Confirmation message on Server start
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
