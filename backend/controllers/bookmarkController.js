// backend/controllers/bookmarkController.js
const { readData, writeData } = require("../utils/dataStore");

exports.getBookmarks = async (req, res) => {
  const users = await readData();
  const user = users.find((u) => u.id === req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user.bookmarks || []);
};

exports.addBookmark = async (req, res) => {
  const { article } = req.body;
  if (!article || !article.url)
    return res.status(400).json({ message: "Invalid article" });

  const users = await readData();
  const user = users.find((u) => u.id === req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.bookmarks.find((b) => b.url === article.url))
    return res.status(400).json({ message: "Already bookmarked" });

  user.bookmarks.push(article);
  await writeData(users);
  res.json(user.bookmarks);
};

exports.removeBookmark = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: "Missing url" });

  const users = await readData();
  const user = users.find((u) => u.id === req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.bookmarks = user.bookmarks.filter((b) => b.url !== url);
  await writeData(users);
  res.json(user.bookmarks);
};
