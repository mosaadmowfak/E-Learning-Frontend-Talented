import { Link, NavLink, Outlet } from "react-router-dom";
import "../styles/UserDashboard.css";

export default function UserDashboardLayout() {
  return (
    <div className="dashboard-wrapper">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h2 className="dash-logo">My Account</h2>

        <NavLink to="/dashboard/courses" className="dash-link">
          My Courses
        </NavLink>

        <NavLink to="/dashboard/sessions" className="dash-link">
          My Sessions
        </NavLink>

        <NavLink to="/dashboard/payments" className="dash-link">
          Payments
        </NavLink>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}
