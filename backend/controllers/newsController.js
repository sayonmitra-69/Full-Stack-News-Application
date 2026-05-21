// backend/controllers/newsController.js
const axios = require("axios");

exports.getNews = async (req, res) => {
  try {
    const { query, source } = req.query;
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey)
      return res.status(500).json({ message: "NEWS_API_KEY not set in .env" });

    let url;
    if (query) {
      // broader search
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&pageSize=30&apiKey=${apiKey}`;
    } else if (source) {
      url = `https://newsapi.org/v2/top-headlines?sources=${encodeURIComponent(
        source
      )}&pageSize=30&apiKey=${apiKey}`;
    } else {
      // default: top headlines (country US)
      url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=30&apiKey=${apiKey}`;
    }

    const response = await axios.get(url);
    res.json(response.data.articles || []);
  } catch (err) {
    console.error(err.message || err);
    res
      .status(500)
      .json({ message: "Failed to fetch news", error: err.message });
  }
};
