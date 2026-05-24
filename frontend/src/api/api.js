// frontend/src/api/api.js
import axios from "axios";
const api = axios.create({ baseURL: "https://full-stack-news-application.onrender.com/api" });

export function setAuthToken(token) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}

export default api;
