import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import api from "../api/axiosInstance";
import "../styles/CourseDetails.css";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  const [course, setCourse] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fullAccess, setFullAccess] = useState(false);
  const [unlockedSessions, setUnlockedSessions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const courseRes = await api.get(`/Courses/${id}`);
        setCourse(courseRes.data);

        const sessionsRes = await api.get(`/Sessions/course/${id}`);
        setSessions(sessionsRes.data);

        const accessRes = await api.get(`/Enrollment/access?courseId=${id}`);
        setFullAccess(accessRes.data.fullAccess);
        setUnlockedSessions(accessRes.data.unlockedSessions || []);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  // 🔥 BUY WHOLE COURSE
  const handleEnroll = () => {
  navigate("/pay", {
    state: {
      courseId: Number(id),
      price: course.price,
    }
  });
};


  // 🔥 BUY SESSION ONLY
  const handleBuySession = (sessionId, price) => {
  navigate("/pay", {
    state: {
      sessionId: Number(sessionId),
      price: price,
    }
  });
};


  if (loading) return <h1 className="loading-text">Loading...</h1>;
  if (!course) return <h1 className="loading-text">Course not found</h1>;

  const formattedDate = course.createdAt
    ? new Date(course.createdAt).toLocaleDateString()
    : null;

  return (
    <div className="course-details-page">
      <div className="course-top">
        <div className="course-cover">
          <img
            src={`http://localhost:5083${course.imageUrl}`}
            alt="cover"
            loading="lazy"
          />
        </div>

        <div className="course-info">
          <h1 className="course-title">{course.title}</h1>

          {course.categoryName && (
            <div className="meta-row">
              <span className="chip category-chip">{course.categoryName}</span>
              {formattedDate && (
                <span className="muted">Created: {formattedDate}</span>
              )}
            </div>
          )}

          <p className="course-desc">{course.description}</p>

          <h2 className="course-price">Price: {course.price} EGP</h2>

          {!fullAccess && (
            <button className="enroll-btn" onClick={handleEnroll}>
              Enroll Now
            </button>
          )}
        </div>
      </div>

      <h2 className="content-title">Course Content</h2>

      <div className="sessions-list">
        {sessions.length === 0 ? (
          <p className="no-sessions">No sessions available yet.</p>
        ) : (
          sessions.map((s, i) => {
            const unlocked = fullAccess || unlockedSessions.includes(s.id);

            return (
              <div className="session-card" key={s.id}>
                <div className="session-left">
                  <h3 className="session-title">
                    {i + 1}. {s.title}
                  </h3>
                  <p className="session-price">{s.price} EGP</p>
                </div>

                <div className="session-right">
                  {unlocked ? (
                    <button
                      onClick={() => navigate(`/course/${id}/learn/${s.id}`)}
                      className="watch-btn"
                    >
                      Watch
                    </button>
                  ) : (
                    <button
                      className="buy-btn"
                      onClick={() => handleBuySession(s.id, s.price)}
                    >
                      Buy for {s.price} EGP
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
