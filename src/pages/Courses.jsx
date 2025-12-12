import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const fixImage = (url) => {
    if (!url) return "/placeholder.png";
    return `https://talented-academy.space${url.replace("uploads", "Uploads")}`;
  };

  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    api.get("/Categories").then((res) => setCategories(res.data));
    api.get("/Courses").then((res) => setCourses(res.data));
  }, []);

  // فلترة حسب البحث
  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(search)
  );

  // Grouping الكورسات حسب الكاتيجوري
  const grouped = {};
  filteredCourses.forEach(course => {
    const cat = course.categoryName || "Other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(course);
  });

  return (
    <div className="courses-wrapper">
      <h1 className="courses-title">Categories</h1>

      {Object.keys(grouped).map((cat) => (
        <div key={cat} className="category-block">

          <h2 className="category-title">{cat}</h2>

          <div className="courses-grid">
            {grouped[cat].map((c) => (
              <div className="course-card" key={c.id}>
                <img
                  src={`${fixImage(c.imageUrl)}?v=${Date.now()}`}
                  alt={c.title}
                  className="course-img"
                />

                <div className="course-info">
                  <h3 className="course-name">{c.title}</h3>
                  <p className="course-price">{c.price} EGP</p>

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
        </div>
      ))}

      {filteredCourses.length === 0 && (
        <p className="no-results">No matched result! 🔍</p>
      )}
    </div>
  );
}
