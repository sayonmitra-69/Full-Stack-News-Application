const express = require("express");
const {
  addBookmark,
  removeBookmark,
  getBookmarks,
} = require("../controllers/bookmarkController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// protected routes
router.post("/", authMiddleware, addBookmark);
router.delete("/:id", authMiddleware, removeBookmark);
router.get("/", authMiddleware, getBookmarks);

module.exports = router;
