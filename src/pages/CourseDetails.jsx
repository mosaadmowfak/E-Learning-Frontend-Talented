import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import api from "../api/axiosInstance";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Prevent access if not logged in
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const [course, setCourse] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // NEW:
  const [fullAccess, setFullAccess] = useState(false);
  const [unlockedSessions, setUnlockedSessions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1) course info
        const courseRes = await api.get(`/Courses/${id}`);
        setCourse(courseRes.data);

        // 2) sessions
        const sessionsRes = await api.get(`/Sessions/course/${id}`);
        setSessions(sessionsRes.data);

        // 3) access check (FULL COURSE or SESSIONS)
        const accessRes = await api.get(`/Enrollment/access?courseId=${id}`);

        setFullAccess(accessRes.data.fullAccess);
        setUnlockedSessions(accessRes.data.unlockedSessions || []);

      } catch (err) {
        console.log("Error loading course:", err);
      }

      setLoading(false);
    };

    loadData();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const res = await api.post("/Payments/create", {
        courseId: id,
        amount: course.price,
      });

      window.location.href = res.data.paymentUrl;

    } catch (err) {
      alert("Payment failed");
    }
  };

  if (loading)
    return (
      <h1 style={{ color: "white", textAlign: "center", marginTop: 100 }}>
        Loading...
      </h1>
    );

  return (
    <div style={{ paddingBottom: 50, color: "white" }}>
      
      {/* COVER */}
      {course.imageUrl && (
        <div style={{ width: "100%", height: 320, overflow: "hidden" }}>
          <img
            src={course.imageUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      <div style={{ padding: "40px 50px" }}>
        <h1
          style={{
            fontSize: 40,
            marginBottom: 10,
            color: "var(--cyan)",
            fontWeight: 700,
          }}
        >
          {course.title}
        </h1>

        <p style={{ fontSize: 18, opacity: 0.8 }}>{course.description}</p>

        <h2
          style={{
            marginTop: 20,
            fontSize: 28,
            color: "var(--primary)",
          }}
        >
          Price: {course.price} EGP
        </h2>

        {/* ENROLL FULL COURSE */}
        {!fullAccess && (
          <button
            onClick={handleEnroll}
            style={{
              marginTop: 25,
              padding: "14px 28px",
              background: "linear-gradient(90deg, #8e44ad, #9b59b6)",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 18,
              color: "white",
              fontWeight: 600,
            }}
          >
            Enroll Now
          </button>
        )}

        {fullAccess && (
          <button
            onClick={() => navigate(`/course/${id}/learn`)}
            style={{
              marginTop: 25,
              padding: "14px 28px",
              background: "var(--cyan)",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 18,
              color: "black",
              fontWeight: 700,
            }}
          >
            Continue Learning
          </button>
        )}

        {/* SESSIONS LIST */}
        <h2 style={{ marginTop: 50, fontSize: 26 }}>Course Content</h2>

        <div style={{ marginTop: 20 }}>
          {sessions.length === 0 && (
            <p style={{ opacity: 0.7 }}>No sessions available yet.</p>
          )}

          {sessions.map((s, i) => {
            const isUnlocked =
              fullAccess || unlockedSessions.includes(s.id);

            return (
              <div
                key={s.id}
                style={{
                  background: "#181818",
                  padding: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3 style={{ margin: 0, color: "var(--cyan)" }}>
                    {i + 1}. {s.title}
                  </h3>
                  <p style={{ margin: "4px 0", opacity: 0.7 }}>
                    {s.price} EGP
                  </p>
                </div>

                {isUnlocked ? (
                  <button
                    onClick={() => navigate(`/course/${id}/learn/${s.id}`)}
                    style={{
                      background: "#00eaff",
                      padding: "8px 16px",
                      borderRadius: 6,
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Watch
                  </button>
                ) : (
                  <button
                    style={{
                      background: "#333",
                      padding: "8px 16px",
                      borderRadius: 6,
                      border: "none",
                      color: "#777",
                      cursor: "not-allowed",
                    }}
                    disabled
                  >
                    🔒 Locked
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
