import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Register from "./pages/Register";
import CourseDetails from "./pages/CourseDetails";
import CourseLearn from "./pages/CourseLearn";
import ProtectedRoute from "./components/ProtectedRoute";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentPage from "./pages/Payment";

// Dashboard imports
import UserDashboardLayout from "./pages/UserDashboardLayout";
import DashboardOverview from "./pages/dashboards/DashboardOverview";
import MyCourses from "./pages/dashboards/MyCourses";
import MySessions from "./pages/dashboards/MySessions";
import PaymentHistory from "./pages/dashboards/PaymentHistory";

// ⭐ ADMIN PAGE (هنربطه بعدين)
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* USER Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="sessions" element={<MySessions />} />
          <Route path="payments" element={<PaymentHistory />} />
        </Route>

        {/* ADMIN Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Course Details */}
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          }
        />

        {/* Course Learning Pages */}
        <Route
          path="/course/:id/learn"
          element={
            <ProtectedRoute>
              <CourseLearn />
            </ProtectedRoute>
          }
        />

        <Route
          path="/course/:id/learn/:lessonId"
          element={
            <ProtectedRoute>
              <CourseLearn />
            </ProtectedRoute>
          }
        />


        <Route
          path="/pay"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}
