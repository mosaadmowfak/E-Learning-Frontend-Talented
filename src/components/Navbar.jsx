import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Navbar() {
    const { token, logout } = useAuth();

    return (
        <nav
            style={{
                background: "#111",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #333",
                position: "sticky",
                top: 0,
                zIndex: 100,
            }}
        >
            {/* Logo + Brand */}
            <div style={{ display: "flex", alignItems: "center" }}>
                <img
                    src={logo}
                    alt="Talented Logo"
                    style={{
                        height: 32,
                        marginRight: 12,
                        borderRadius: 4,
                        objectFit: "cover",
                    }}
                />
                <span
                    style={{
                        color: "var(--purple)",
                        fontWeight: "bold",
                        fontSize: 20,
                        letterSpacing: 1,
                    }}
                >
                    TALENTED
                </span>
            </div>

            {/* Navigation links */}
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <Link to="/" style={{ color: "var(--cyan)" }}>
                    Home
                </Link>
                <Link to="/courses" style={{ color: "var(--cyan)" }}>
                    Courses
                </Link>

                {!token ? (
                    <>
                        <Link to="/login" style={{ color: "var(--cyan)" }}>
                            Login
                        </Link>

                        <Link to="/register" style={{ color: "var(--cyan)" }}>
                            Register
                        </Link>

                    </>
                ) : (
                    <button
                        onClick={logout}
                        style={{
                            background: "var(--purple)",
                            color: "white",
                            padding: "6px 14px",
                            borderRadius: 6,
                            cursor: "pointer",
                            border: "none",
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}
