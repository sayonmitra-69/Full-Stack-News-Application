// frontend/src/components/Navbar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">NewsApp</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/profile">{user.username}</Link>
            <button
              onClick={() => {
                logout();
                nav("/");
              }}
              className="btn btn-danger"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login / Register
          </Link>
        )}
      </div>
    </nav>
  );
}
