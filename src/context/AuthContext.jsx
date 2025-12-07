// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api/axiosInstance";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const isAuthenticated = !!token;

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    // fetch profile
    api.get("/Auth/profile")
      .then(res => setUser(res.data))
      .catch(err => {
        console.error("profile err", err);
        setUser(null);
      });
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post("/Auth/login", { email, password });
    const tokenFromServer = res.data.token;
    if (!tokenFromServer) throw new Error("Invalid email or password");
    localStorage.setItem("token", tokenFromServer);
    setToken(tokenFromServer);
    const p = await api.get("/Auth/profile");
    setUser(p.data);
    return res;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){ return useContext(AuthContext); }
