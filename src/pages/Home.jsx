import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import "../styles/Home.css";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoriesRef = useRef(null);

  // 🔥 API الصحيح للصور
  const API = import.meta.env.VITE_API_URL.replace("/api", "");

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
      {/* HERO */}
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

      {/* COURSES */}
      <h2 className="section-title courses-title">Courses</h2>

      <div className="courses-grid">
        {courses.map((c) => (
          <div className="course-card" key={c.id}>
            <img
              src={c.imageUrl ? `https://talented-academy.space${c.imageUrl}` : "/placeholder.png"}
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

      {/* CATEGORIES */}
      <h2 className="section-title categories-title">Categories</h2>

      <div className="categories-grid" ref={categoriesRef}>
        {categories.map((cat) => (
          <div className="category-card" key={cat.id}>{cat.name}</div>
        ))}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <span className="footer-brand">TALENTED</span>

          <div className="footer-section">
            <a href="https://facebook.com" target="_blank">Facebook</a>
            <a href="https://instagram.com" target="_blank">Instagram</a>
          </div>

          <div className="footer-section">
            <a href="/privacy-policy">سياسة الخصوصية</a>
            <a href="/refund-policy">سياسة الاسترجاع</a>
          </div>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} TALENTED — جميع الحقوق محفوظة
        </p>
      </footer>
    </div>
  );
}
