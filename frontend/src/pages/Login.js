// frontend/src/pages/Login.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const [mode, setMode] = useState("login"); // or 'register'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, register } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        await login(username, password);
      } else {
        await register(username, password);
      }
      nav("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="container">
      <form onSubmit={submit} className="form-container">
        <h2 className="form-header">
          {mode === "login" ? "Login" : "Register"}
        </h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          {mode === "login" ? "Login" : "Register"}
        </button>
        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="form-toggle-button"
          type="button" // Important: Prevents this button from submitting the form
        >
          {mode === "login" ? "Switch to Register" : "Switch to Login"}
        </button>
      </form>
    </div>
  );
}
