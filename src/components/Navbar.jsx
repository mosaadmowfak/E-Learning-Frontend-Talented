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
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <span className="logo-text">TALENTED</span>
        </div>

        <form onSubmit={handleSearch} className="nav-search">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for course"
          />
        </form>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>

          {/* USER PROFILE */}
          {token && user?.role === "student" && (
            <Link to="/dashboard" className="profile-link">Profile</Link>
          )}

          {/* ADMIN PANEL */}
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

        <button className="mobile-menu-btn" onClick={() => setOpen(true)}>
          ☰
        </button>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>✕</button>

        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/courses" onClick={() => setOpen(false)}>Courses</Link>

        {/* Mobile student profile */}
        {token && user?.role === "student" && (
          <Link to="/dashboard" onClick={() => setOpen(false)}>Profile</Link>
        )}

        {/* Mobile admin panel */}
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
