import { useState } from "react";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await api.post("/Auth/login", form);
      if (res.data?.token) {
        await login(form.email, form.password);

        Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          timer: 1500,
          showConfirmButton: false
        });

        navigate("/");
      }
    } catch (e) {
      const msg =
        e.response?.data?.message ||  // الرسالة اللي راجعة من API
        e.response?.data ||           // لو كان String
        "Invalid email or password";  // fallback

      setErr(msg);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Log in to your account</h1>

        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {err && <p className="auth-error">{err}</p>}




          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
