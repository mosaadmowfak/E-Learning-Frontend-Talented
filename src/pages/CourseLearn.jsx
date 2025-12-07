import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import api from "../api/axiosInstance";
import "../styles/CourseLearn.css";

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

        const accessRes = await api.get(`/Enrollment/access?courseId=${id}`);
        setFullAccess(accessRes.data.fullAccess);
        setUnlockedSessions(accessRes.data.unlockedSessions || []);

        const allowed =
          accessRes.data.fullAccess ||
          accessRes.data.unlockedSessions?.includes(Number(lessonId));

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
      <h1 className="learn-loading">Loading lesson...</h1>
    );

  return (
    <div className="learn-wrapper">

      {/* VIDEO SECTION */}
      <div className="video-section">
        <h2 className="lesson-title">{currentSession.title}</h2>

        <iframe
          className="lesson-video"
          src={
            currentSession.videoUrl
              ? currentSession.videoUrl
                .replace("watch?v=", "embed/")
                .replace("youtu.be/", "youtube.com/embed/")
              : ""
          }
          allowFullScreen
        ></iframe>
      </div>

      {/* SIDEBAR */}
      <div className="sidebar">
        <h3 className="sidebar-title">Course Content</h3>

        {sessions.map((s) => {
          const isUnlocked = fullAccess || unlockedSessions.includes(s.id);

          return (
            <div
              key={s.id}
              className={`sidebar-item ${s.id == lessonId ? "active-lesson" : ""
                } ${!isUnlocked ? "locked" : ""}`}
              onClick={() => openLesson(s.id, !isUnlocked)}
            >
              <span>
                {s.title} {!isUnlocked && "🔒"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
