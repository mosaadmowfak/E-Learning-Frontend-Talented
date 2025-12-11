import { useLocation, Navigate } from "react-router-dom";

export default function PaymentSuccess() {
  const query = new URLSearchParams(useLocation().search);
  const success = query.get("success");

  if (success === "false") {
    return <Navigate to="/payment-failed" />;
  }

  return (
    <div style={{textAlign:"center", marginTop:"80px"}}>
      <h1>Payment Completed 🎉</h1>
      <p>Your course/session is now unlocked.</p>
      <a href="/">Return Home</a>
    </div>
  );
}
