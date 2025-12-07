import { useDashboard } from "../../context/DashboardContext";

export default function MySessions() {
  const { dashboard } = useDashboard();

  return (
    <div>
      <h1>My Sessions</h1>

      {dashboard.mySessions.map((s, i) => (
        <div key={i} className="session-card">
          <h2>{s.title}</h2>
          <p>Course: {s.courseTitle}</p>
          <p>Price: {s.price} EGP</p>
        </div>
      ))}
    </div>
  );
}
