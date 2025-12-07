import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axiosInstance";
import "../styles/Checkout.css";

export default function Checkout() {
  const { state } = useLocation();

  if (!state) return <Navigate to="/courses" replace />;

  const price = state.price;
  const courseId = state.courseId || null;
  const sessionId = state.sessionId || null;

  const [billingEmail, setBillingEmail] = useState("");
  const [billingName, setBillingName] = useState("");
  const [billingPhone, setBillingPhone] = useState("");
  const [method, setMethod] = useState("card");

  const handlePay = async () => {
    try {
      const res = await api.post("/Payments/create", {
        courseId,
        sessionId,
        billingEmail,
        billingName,
        billingPhone,
        method,
      });

      if (res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      }
    } catch (err) {
      alert("Payment failed");
      console.log(err);
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <p className="checkout-price">
        You are paying: <span>{price} EGP</span>
      </p>

      <div className="checkout-form">
        <label>Email</label>
        <input 
          type="email" 
          value={billingEmail} 
          onChange={(e) => setBillingEmail(e.target.value)} 
        />

        <label>Full Name</label>
        <input 
          type="text" 
          value={billingName} 
          onChange={(e) => setBillingName(e.target.value)} 
        />

        <label>Phone Number</label>
        <input 
          type="text" 
          value={billingPhone} 
          onChange={(e) => setBillingPhone(e.target.value)} 
        />

        <label>Payment Method</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="card">Card</option>
          <option value="wallet">Wallet</option>
          <option value="kiosk">Kiosk</option>
        </select>

        <button className="pay-btn" onClick={handlePay}>
          Pay {price} EGP
        </button>
      </div>
    </div>
  );
}
