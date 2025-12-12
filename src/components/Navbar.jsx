import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/courses?search=${search}`);
    setOpen(false); // يقفل القائمة في الموبايل بعد البحث
  };

  return (
    <>
      <nav className="navbar">

        {/* LEFT / LOGO */}
        <div className="nav-left">
          <span className="logo-text">TALENTED</span>
        </div>

        {/* DESKTOP SEARCH */}
        <form onSubmit={handleSearch} className="nav-search">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for course"
          />
        </form>

        {/* DESKTOP LINKS */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>

          {token && user?.role === "student" && (
            <Link to="/dashboard" className="profile-link">Profile</Link>
          )}

          {token && user?.role === "admin" && (
            <Link to="/admin" className="profile-link">Admin Panel</Link>
          )}

          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={logout} className="btn-purple">Logout</button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="mobile-menu-btn" onClick={() => setOpen(true)}>
          ☰
        </button>
      </nav>

      {/* ===== MOBILE MENU ===== */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>✕</button>

        {/* MOBILE SEARCH */}
        <form onSubmit={handleSearch} className="mobile-search">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for course"
          />
        </form>

        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/courses" onClick={() => setOpen(false)}>Courses</Link>

        {token && user?.role === "student" && (
          <Link to="/dashboard" onClick={() => setOpen(false)}>Profile</Link>
        )}

        {token && user?.role === "admin" && (
          <Link to="/admin" onClick={() => setOpen(false)}>Admin Panel</Link>
        )}

        {!token ? (
          <>
            <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
          </>
        ) : (
          <button
            onClick={() => { logout(); setOpen(false); }}
            className="logout-mobile"
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
}
