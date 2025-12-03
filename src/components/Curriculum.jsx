// src/components/Curriculum.jsx
import React, { useState } from "react";
import { FaLock, FaUnlock, FaPlay } from "react-icons/fa";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Curriculum({ sections = [], enrolled = false, courseId }) {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(null);

  const openLesson = (lesson) => {
    if (lesson.isFreePreview || enrolled) {
      // open inline video page or navigate to learn page
      // for now navigate to learn page (protected)
      navigate(`/course/${courseId}/learn/${lesson.id}`);
    } else {
      // not enrolled — propose buying
      alert("This lesson is locked. Please enroll to watch full content.");
    }
  };

  return (
    <div style={{ marginTop: 8 }}>
      {sections.map((sec) => (
        <div key={sec.sectionId} style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, color: "var(--primary)", marginBottom: 8 }}>{sec.title}</div>

          <div>
            {sec.lessons.map((lesson) => (
              <div key={lesson.id} style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                borderRadius: 8,
                background: "#0f0f0f",
                marginBottom: 8
              }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, background: "rgba(255,255,255,0.02)" }}>
                    {lesson.isFreePreview || enrolled ? <FaPlay /> : <FaLock />}
                  </div>
                  <div>
                    <div style={{ color: "#ddd", fontWeight: 600 }}>{lesson.title}</div>
                    <div style={{ color: "#999", fontSize: 13 }}>{lesson.duration}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {lesson.isFreePreview && !enrolled && <div style={{ color: "var(--cyan)", fontSize: 13 }}>Preview</div>}
                  <button onClick={() => openLesson(lesson)} style={{
                    background: lesson.isFreePreview || enrolled ? "var(--cyan)" : "transparent",
                    color: lesson.isFreePreview || enrolled ? "#000" : "#999",
                    border: lesson.isFreePreview || enrolled ? "none" : "1px solid #333",
                    padding: "6px 10px",
                    borderRadius: 6,
                    cursor: "pointer"
                  }}>
                    {lesson.isFreePreview || enrolled ? "Play" : "Locked"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
