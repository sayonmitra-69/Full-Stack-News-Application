// backend/utils/dataStore.js
const fs = require("fs").promises;
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "data", "users.json");

async function readData() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeData(data) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

module.exports = { readData, writeData };
