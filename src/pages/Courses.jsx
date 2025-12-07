import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    api.get("/Courses")
      .then(res => setCourses(res.data))
      .catch(err => console.log("Error loading courses:", err));
  }, []);

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search)
  );

  return (
    <div className="courses-wrapper">

      <h1 className="courses-title">Courses</h1>

      <div className="courses-grid">
        {filtered.map((c) => (
          <div className="course-card" key={c.id}>

            <img
              src={`http://localhost:5083${c.imageUrl}`}
              alt={c.title}
              className="course-img"
            />

            <div className="course-info">
              <h3 className="course-name">{c.title}</h3>
              <p className="course-price">{c.price} EGP</p>

              {/* ← هنا نغير اسم الكلاس */}
              <button
                className="details-btn"
                onClick={() => navigate(`/course/${c.id}`)}
              >
                Details
              </button>
            </div>

          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="no-results">No matched result!!🔍</p>
      )}
    </div>
  );
}
