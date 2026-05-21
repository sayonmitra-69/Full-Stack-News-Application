// frontend/src/pages/Home.js
import React, { useState, useEffect, useContext } from "react";
import api from "../api/api";
import NewsCard from "../components/NewsCard";
import AuthContext from "../context/AuthContext";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("");
  const { user, addBookmark } = useContext(AuthContext);

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line
  }, []);

  const fetchNews = async () => {
    try {
      const res = await api.get("/news", {
        params: { query: query || undefined, source: source || undefined },
      });
      setArticles(res.data);
    } catch (err) {
      console.error(err);
      alert(
        "Failed to fetch news. Make sure backend is running and NEWS_API_KEY is set."
      );
    }
  };

  const handleBookmark = async (article) => {
    if (!user) return alert("Please login to bookmark.");
    try {
      await addBookmark(article);
      alert("Bookmarked!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Bookmark failed");
    }
  };

  return (
    <div className="container">
      {/* Search and filter section */}
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        <input
          className="search-input"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          className="search-input"
          placeholder="Source (e.g., cnn)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <button onClick={fetchNews} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* News articles display section */}
      <div className="bookmark-list">
        {articles.length === 0 ? (
          <p>No articles found. Try a different search.</p>
        ) : (
          articles.map((a, idx) => (
            <NewsCard
              key={a.url || idx}
              article={a}
              onBookmark={handleBookmark}
            />
          ))
        )}
      </div>
    </div>
  );
}
