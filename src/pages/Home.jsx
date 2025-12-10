import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import "../styles/Home.css";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoriesRef = useRef(null);

  // 🔥 دالة إصلاح الصورة نهائيًا
  const fixImage = (url) => {
    if (!url) return "/placeholder.png";

    // إصلاح Lowercase → Uppercase
    return `https://talented-academy.space${url.replace("uploads", "Uploads")}`;
  };

  useEffect(() => {
    const load = async () => {
      const res1 = await api.get("/Courses");
      const res2 = await api.get("/Categories");
      setCourses(res1.data);
      setCategories(res2.data);
    };
    load();
  }, []);

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-box">
          <h1>Learn skills that can change your life</h1>
          <p>Improve yourself and gain new experiences that will help shape your future</p>

          <div className="hero-buttons">
            <button className="button-primary" onClick={scrollToCategories}>
              Show Categories
            </button>

            <Link to="/courses" className="button-secondary">
              Browse Courses
            </Link>
          </div>
        </div>
      </div>

      <h2 className="section-title courses-title">Courses</h2>

      <div className="courses-grid">
        {courses.map((c) => (
          <div className="course-card" key={c.id}>
            <img
              src={fixImage(c.imageUrl)}
              alt={c.title}
              className="thumb"
            />
            <h3>{c.title}</h3>
            <p className="price">{c.price} EGP</p>

            <Link className="details-btn" to={`/course/${c.id}`}>
              Details
            </Link>
          </div>
        ))}
      </div>

      <h2 className="section-title categories-title">Categories</h2>

      <div className="categories-grid" ref={categoriesRef}>
        {categories.map((cat) => (
          <div className="category-card" key={cat.id}>{cat.name}</div>
        ))}
      </div>
    </div>
  );
}
