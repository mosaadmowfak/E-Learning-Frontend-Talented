import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import api from "../api/axiosInstance";

export default function CourseLearn() {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  const [sessions, setSessions] = useState([]);
  const [unlockedSessions, setUnlockedSessions] = useState([]);
  const [fullAccess, setFullAccess] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const resSessions = await api.get(`/Sessions/course/${id}`);
        setSessions(resSessions.data);

        // Get which sessions are unlocked
        const accessRes = await api.get(`/Enrollment/access?courseId=${id}`);
        setFullAccess(accessRes.data.fullAccess);
        setUnlockedSessions(accessRes.data.unlockedSessions || []);

        const allowed =
          accessRes.data.fullAccess ||
          accessRes.data.unlockedSessions?.includes(Number(lessonId));

        // If no lessonId → go to first allowed session
        if (!lessonId) {
          const firstAllowed = accessRes.data.fullAccess
            ? resSessions.data[0]
            : resSessions.data.find((s) =>
                accessRes.data.unlockedSessions.includes(s.id)
              );

          if (firstAllowed) {
            navigate(`/course/${id}/learn/${firstAllowed.id}`);
          }
          return;
        }

        // If lessonId exists but locked → redirect
        if (!allowed) {
          const firstAllowed = accessRes.data.fullAccess
            ? resSessions.data[0]
            : resSessions.data.find((s) =>
                accessRes.data.unlockedSessions.includes(s.id)
              );

          if (firstAllowed) {
            navigate(`/course/${id}/learn/${firstAllowed.id}`);
          }
          return;
        }

        // Set current session normally
        const selected =
          resSessions.data.find((s) => s.id === Number(lessonId)) ||
          resSessions.data[0];

        setCurrentSession(selected);
      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, [id, lessonId]);

  const openLesson = (sid, isLocked) => {
    if (isLocked) return;
    navigate(`/course/${id}/learn/${sid}`);
  };

  if (!currentSession)
    return (
      <h1 style={{ color: "white", textAlign: "center", marginTop: 100 }}>
        Loading lesson...
      </h1>
    );

  return (
    <div style={{ display: "flex", height: "100vh", color: "white" }}>
      
      {/* VIDEO SECTION */}
      <div style={{ flex: 3, padding: 30 }}>
        <h2>{currentSession.title}</h2>

        <iframe
          width="100%"
          height="500"
          src={
            currentSession.videoUrl
              ?.replace("watch?v=", "embed/")
              ?.replace("youtu.be/", "youtube.com/embed/")
          }
          style={{ border: "none", borderRadius: 10, marginTop: 20 }}
          allowFullScreen
        ></iframe>
      </div>

      {/* SIDEBAR SESSIONS */}
      <div
        style={{
          flex: 1.2,
          background: "#111",
          borderLeft: "1px solid #222",
          padding: 20,
          overflowY: "scroll",
        }}
      >
        <h3 style={{ color: "var(--cyan)" }}>Course Content</h3>

        {sessions.map((s) => {
          const isUnlocked = fullAccess || unlockedSessions.includes(s.id);

          return (
            <div
              key={s.id}
              onClick={() => openLesson(s.id, !isUnlocked)}
              style={{
                padding: 15,
                borderRadius: 6,
                marginBottom: 10,
                cursor: isUnlocked ? "pointer" : "not-allowed",
                background:
                  s.id == lessonId ? "#0a0a0a" : "#181818",
                border:
                  s.id == lessonId
                    ? "2px solid var(--cyan)"
                    : "1px solid #222",
                opacity: isUnlocked ? 1 : 0.4,
              }}
            >
              <strong>
                {s.title} {isUnlocked ? "" : " 🔒"}
              </strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}
