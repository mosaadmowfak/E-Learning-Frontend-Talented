import React, { createContext, useState, useContext } from "react";
import api from "../api/axiosInstance";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (email, password) => {
    const res = await api.post("/Auth/login", { email, password });
    const tokenFromServer = res.data.token;

    if (!tokenFromServer) {
      throw new Error("Invalid email or password");
    }

    localStorage.setItem("token", tokenFromServer);
    setToken(tokenFromServer);

    return res;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
