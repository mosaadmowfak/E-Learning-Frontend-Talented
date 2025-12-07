import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./styles/index.css";
import { DashboardProvider } from "./context/DashboardContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <DashboardProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DashboardProvider>
    </AuthProvider>
  </React.StrictMode>
);
