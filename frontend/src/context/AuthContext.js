// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import api, { setAuthToken } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const login = async (username, password) => {
    const res = await api.post("/auth/login", { username, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    return user;
  };

  const register = async (username, password) => {
    const res = await api.post("/auth/register", { username, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setAuthToken(null);
  };

  const addBookmark = async (article) => {
    const res = await api.post("/bookmarks", { article });
    const bookmarks = res.data;
    const updatedUser = { ...user, bookmarks };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return bookmarks;
  };

  const removeBookmark = async (url) => {
    const res = await api.post("/bookmarks/remove", { url });
    const bookmarks = res.data;
    const updatedUser = { ...user, bookmarks };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return bookmarks;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
