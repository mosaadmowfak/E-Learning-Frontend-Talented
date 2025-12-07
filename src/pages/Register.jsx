import { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: res.data,
        timer: 1800,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/login"), 1500);

    } catch (e) {
  let msg = "Registration failed";

  if (e.response?.data?.errors) {
    // لو الرسائل Array من الـ backend
    msg = e.response.data.errors.join("\n");
  } else if (typeof e.response?.data === "string") {
    msg = e.response.data;
  } else if (e.response?.data?.message) {
    msg = e.response.data.message;
  }

  setErr(msg);

  Swal.fire({
    icon: "error",
    title: "Error",
    text: msg
  });
}

finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Create a new account</h1>

        <form onSubmit={handleRegister} className="auth-form">

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

          {err && <p className="auth-error">{String(err)}</p>}


          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
}
