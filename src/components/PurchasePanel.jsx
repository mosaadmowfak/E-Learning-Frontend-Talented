// src/components/PurchasePanel.jsx
import { useState } from "react";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function PurchasePanel({ course, enrolled, onEnroll }) {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    if (!token) {
      Swal.fire({ icon: "info", title: "Please login", text: "You must be logged in to purchase", timer: 1500, showConfirmButton: false });
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // 1) Create order on backend (your endpoint)
      const res = await api.post("/orders/create", {
        courseId: course.id,
        amount: course.price
      });

      // 2) backend returns paymob redirect/token (assumption)
      const { paymob } = res.data;
      // if backend returned redirect url:
      if (paymob?.redirectUrl) {
        window.location.href = paymob.redirectUrl;
        return;
      }

      // else if returns paymob iframe token:
      if (paymob?.token) {
        // open new window for payment flow or show iframe
        window.open(paymob.paymentUrl, "_blank");
        return;
      }

      // fallback: navigate to checkout page
      navigate(`/checkout/${course.id}`);
    } catch (e) {
      Swal.fire({ icon: "error", title: "Payment Error", text: (e.response?.data?.message) || e.message || "Failed to start payment" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: "#0f0f0f",
      padding: 16,
      borderRadius: 10,
      border: "1px solid #222",
      position: "sticky",
      top: 20
    }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: "var(--cyan)" }}>
        ${course.price ?? "Free"}
      </div>

      <div style={{ color: "#aaa", marginTop: 8 }}>
        {course.studentsCount ? `${course.studentsCount} students` : "0 students"}
      </div>

      {!enrolled ? (
        <>
          <button onClick={handleBuy} disabled={loading} style={{ width: "100%", marginTop: 16 }}>
            {loading ? "Processing..." : `Buy this course`}
          </button>
          <div style={{ marginTop: 10, color: "#999", fontSize: 13 }}>30-day money-back guarantee</div>
        </>
      ) : (
        <div style={{ marginTop: 12 }}>
          <button onClick={() => navigate(`/course/${course.id}/learn`)} style={{ width: "100%" }}>
            Go to course
          </button>
          <div style={{ marginTop: 10, color: "#9f9", fontSize: 13 }}>You are enrolled</div>
        </div>
      )}
    </div>
  );
}
