import { useDashboard } from "../../context/DashboardContext";

export default function DashboardOverview() {
  const { loading, profile, dashboard } = useDashboard();

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1>My Account</h1>

      <div className="overview-box">
        <p><strong>Name:</strong> {profile?.name}</p>
        <p><strong>Email:</strong> {profile?.email}</p>
      </div>

      <h2>Summary</h2>

      <div className="overview-stats">
        <div className="stat-box">
          Enrolled Courses: <strong>{dashboard.myCourses.length}</strong>
        </div>
        <div className="stat-box">
          Booked Sessions: <strong>{dashboard.mySessions.length}</strong>
        </div>
        <div className="stat-box">
          Payments Done: <strong>{dashboard.myPayments.length}</strong>
        </div>
      </div>
    </div>
  );
}
