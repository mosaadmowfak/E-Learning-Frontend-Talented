import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/Courses")
      .then(res => {
        console.log("Courses loaded:", res.data);
        setCourses(res.data);
      })
      .catch(err => {
        console.log("Error loading courses:", err);
      });
  }, []);

  return (
    <div style={{ padding: 40, color: "white" }}>
      <h1 style={{ color: "var(--cyan)" }}>Courses</h1>

      <div style={{ 
        marginTop: 30,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 20
      }}>
        {courses.map((c) => (
          <div key={c.id} 
            style={{
              background: "#fff",
              borderRadius: 10,
              overflow: "hidden",
              paddingBottom: 20
            }}
          >
            <img 
              src={c.imageUrl} 
              alt={c.title}
              style={{ width: "100%", height: 180, objectFit: "cover" }}
            />

            <div style={{ padding: 15 }}>
              <h3 style={{ color: "black", marginBottom: 10 }}>{c.title}</h3>

              <button
                onClick={() => {
                  console.log("Navigating to:", `/course/${c.id}`);
                  navigate(`/course/${c.id}`);
                }}
                style={{
                  background: "black",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: 6,
                  marginTop: 10,
                  cursor: "pointer",
                }}
              >
                Open
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
