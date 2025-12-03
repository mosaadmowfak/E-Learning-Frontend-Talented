import { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  setErr(null);
  setLoading(true);

  try {
    const res = await api.post("/Auth/register", {
      fullName: form.name,
      email: form.email,
      password: form.password,
    });

    // لو رجع رسالة نجاح من السيرفر
    Swal.fire({
      icon: "success",
      title: "Account Created!",
      text: res.data, // ← هتكون “Registered Successfully”
      timer: 1800,
      showConfirmButton: false
    });

    // بعد التسجيل يروح للّوجين
    setTimeout(() => navigate("/login"), 1500);

  } catch (err) {
    const errorMsg = err.response?.data || "Registration Failed";

    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMsg
    });

    setErr(errorMsg);
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={{ maxWidth: 420, margin: "60px auto", padding: 20, color: "white" }}>
      <h1 style={{ textAlign: "center", color: "var(--cyan)" }}>Create Account</h1>

      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          required
        />

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

        {err && <div style={{ color: "red", fontSize: 14 }}>{JSON.stringify(err)}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>
    </div>
  );
}
