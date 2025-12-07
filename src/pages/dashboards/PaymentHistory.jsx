import { useDashboard } from "../../context/DashboardContext";

export default function PaymentHistory() {
  const { dashboard } = useDashboard();

  return (
    <div>
      <h1>Payment History</h1>

      {dashboard.myPayments.map((p) => (
        <div key={p.paymentId} className="payment-card">
          <p><strong>Order ID:</strong> {p.orderId}</p>
          <p><strong>Amount:</strong> {p.amount} EGP</p>
          <p><strong>Status:</strong> {p.isPaid ? "Paid" : "Pending"}</p>

          {p.courseTitle && <p><strong>Course:</strong> {p.courseTitle}</p>}
          {p.sessionTitle && <p><strong>Session:</strong> {p.sessionTitle}</p>}

          <p><strong>Date:</strong> {p.paidAt ?? "Not Paid Yet"}</p>
        </div>
      ))}
    </div>
  );
}
