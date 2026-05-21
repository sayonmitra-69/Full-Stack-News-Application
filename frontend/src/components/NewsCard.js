// frontend/src/components/NewsCard.js
import React from "react";

export default function NewsCard({ article, onBookmark }) {
  return (
    // Use the 'news-card' class from app.css
    <div className="news-card">
      {article.urlToImage && (
        // The image styles are now handled by the .news-card img selector in CSS
        <img src={article.urlToImage} alt={article.title} />
      )}
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      {/* Use a flexbox container with a gap for buttons */}
      <div style={{ display: "flex", gap: "1rem" }}>
        {/* Add the 'btn' and 'btn-primary' classes */}
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
        >
          Read More
        </a>
        {/* Add the 'btn' and 'btn-danger' classes for the bookmark button */}
        <button onClick={() => onBookmark(article)} className="btn btn-danger">
          Bookmark
        </button>
      </div>
    </div>
  );
}
