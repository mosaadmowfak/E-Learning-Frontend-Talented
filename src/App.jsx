import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Register from "./pages/Register";
import CourseDetails from "./pages/CourseDetails";
import CourseLearn from "./pages/CourseLearn";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  return (
    <>
      <Navbar />

      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />

          {/* صفحة التعليم (الكورس نفسه) */}
          <Route path="/course/:id/learn" element={<CourseLearn />} />
          <Route path="/course/:id/learn/:lessonId" element={<CourseLearn />} />

          <Route
            path="/course/:id"
            element={
              <ProtectedRoute>
                <CourseDetails />
              </ProtectedRoute>
            }
          />

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


        </Routes>
      </div>
    </>
  );
}
