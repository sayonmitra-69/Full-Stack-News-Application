// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { readData, writeData } = require("../utils/dataStore");

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

// register controller
const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Missing username or password" });
    }

    const users = await readData();
    if (users.find((u) => u.username === username)) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = { id: uuidv4(), username, password: hashed, bookmarks: [] };
    users.push(newUser);
    await writeData(users);

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        bookmarks: newUser.bookmarks,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// login controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await readData();
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        bookmarks: user.bookmarks,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ proper export
module.exports = { register, login };
