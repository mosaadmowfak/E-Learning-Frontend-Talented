import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [dashboard, setDashboard] = useState({
    myCourses: [],
    mySessions: [],
    payments: [],
  });

  useEffect(() => {
    if (!token) return;

    async function loadData() {
      try {
        // 1️⃣ Load Profile
        const p = await fetch("http://localhost:5083/api/Auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => res.json());

        setProfile(p);

        // 2️⃣ Load Dashboard Data
        const d = await fetch("http://localhost:5083/api/Dashboard/student", {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => res.json());

        setDashboard(d);
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [token]);

  return (
    <DashboardContext.Provider value={{ loading, profile, dashboard }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
