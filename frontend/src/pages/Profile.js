// frontend/src/pages/Profile.js
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Profile() {
  const { user, removeBookmark } = useContext(AuthContext);

  // Use the container class for the main wrapper
  return (
    <div className="container">
      {user ? (
        <>
          <h2 className="form-header">{user.username}'s Profile</h2>
          <h3>Bookmarks</h3>
          {user.bookmarks && user.bookmarks.length > 0 ? (
            // Use the bookmark-list class for the grid layout
            <div className="bookmark-list">
              {user.bookmarks.map((b, i) => (
                // Use the news-card class for each bookmark item
                <div key={b.url || i} className="news-card">
                  <a href={b.url} target="_blank" rel="noreferrer">
                    <strong>{b.title || "No Title"}</strong>
                  </a>
                  {/* The button class gives a professional look */}
                  <button
                    onClick={() => removeBookmark(b.url)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No bookmarks yet.</p>
          )}
        </>
      ) : (
        <p>Please login to view your profile and bookmarks.</p>
      )}
    </div>
  );
}
