// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  getAdminDashboard,
  getProfile,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadCourseImage,
  getSessions,
  createSession,
  updateSession,
  deleteSession,
} from "../../api/adminServices";
import "./admin.css";

export default function AdminDashboard() {
  const [profile, setProfile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [courseForm, setCourseForm] = useState(null); // null | {id?, title, description, price, categoryId}
  const [sessionForm, setSessionForm] = useState(null); // null | {id?, title, videoUrl, price, courseId}
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      const [pRes, dRes, cRes, sRes] = await Promise.all([
        getProfile(),
        getAdminDashboard(),
        getCourses(),
        getSessions(),
      ]);
      setProfile(pRes.data);
      setSummary(dRes.data);
      setCourses(cRes.data || []);
      setSessions(sRes.data || []);
    } catch (err) {
      console.error("Admin load error:", err);
      alert("خطأ في جلب البيانات — شوف console");
    } finally {
      setLoading(false);
    }
  }

  // ---- Courses CRUD ----
  const openNewCourse = () =>
    setCourseForm({ title: "", description: "", price: 0, categoryId: 0 });
  const openEditCourse = (c) =>
    setCourseForm({ id: c.id, title: c.title, description: c.description || "", price: c.price, categoryId: c.categoryId || 0 });

  const saveCourse = async () => {
    try {
      if (courseForm.id) {
        await updateCourse(courseForm.id, {
          title: courseForm.title,
          description: courseForm.description,
          price: Number(courseForm.price),
          categoryId: Number(courseForm.categoryId),
        });
        alert("Course updated");
      } else {
        await createCourse({
          title: courseForm.title,
          description: courseForm.description,
          price: Number(courseForm.price),
          categoryId: Number(courseForm.categoryId),
        });
        alert("Course created");
      }
      setCourseForm(null);
      await loadAll();
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء حفظ الكورس");
    }
  };

  const removeCourse = async (id) => {
    if (!window.confirm("متأكد تحذف الكورس؟")) return;
    try {
      await deleteCourse(id);
      await loadAll();
    } catch (err) {
      console.error(err);
      alert("خطأ في الحذف");
    }
  };

  const uploadImage = async (courseId) => {
    if (!imageFile) return alert("اختار صورة أولاً");
    try {
      await uploadCourseImage(courseId, imageFile);
      alert("Image uploaded");
      setImageFile(null);
      await loadAll();
    } catch (err) {
      console.error(err);
      alert("خطأ في رفع الصورة");
    }
  };

  // ---- Sessions CRUD ----
  const openNewSession = () =>
    setSessionForm({ title: "", videoUrl: "", price: 0, courseId: 0 });
  const openEditSession = (s) =>
    setSessionForm({ id: s.id, title: s.title, videoUrl: s.videoUrl || "", price: s.price, courseId: s.courseId });

  const saveSession = async () => {
    try {
      if (sessionForm.id) {
        await updateSession(sessionForm.id, {
          title: sessionForm.title,
          videoUrl: sessionForm.videoUrl,
          price: Number(sessionForm.price),
        });
        alert("Session updated");
      } else {
        await createSession({
          title: sessionForm.title,
          videoUrl: sessionForm.videoUrl,
          price: Number(sessionForm.price),
          courseId: Number(sessionForm.courseId),
        });
        alert("Session created");
      }
      setSessionForm(null);
      await loadAll();
    } catch (err) {
      console.error(err);
      alert("خطأ أثناء حفظ السيشن");
    }
  };

  const removeSession = async (id) => {
    if (!window.confirm("متأكد تحذف السيشن؟")) return;
    try {
      await deleteSession(id);
      await loadAll();
    } catch (err) {
      console.error(err);
      alert("خطأ في الحذف");
    }
  };

  if (loading) return <div className="admin-page">Loading...</div>;

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <section className="admin-profile">
        <div className="card">
          <h3>Profile</h3>
          <p><b>Name:</b> {profile?.name || "-"}</p>
          <p><b>Email:</b> {profile?.email || "-"}</p>
          <p><b>Role:</b> {profile?.role || "-"}</p>
        </div>
      </section>

      <section className="admin-summary">
        <div className="summary-grid">
          <div className="stat card">Enrolled Courses: <b>{summary?.totalCourses ?? 0}</b></div>
          <div className="stat card">Booked Sessions: <b>{summary?.totalSessions ?? 0}</b></div>
          <div className="stat card">Total Students: <b>{summary?.totalStudents ?? 0}</b></div>
          <div className="stat card">Total Sales: <b>{summary?.totalSales ?? 0}</b></div>
        </div>
      </section>

      <section className="admin-courses">
        <div className="section-header">
          <h2>Courses</h2>
          <div>
            <button className="btn" onClick={openNewCourse}>Add Course</button>
            <button className="btn" onClick={loadAll}>Refresh</button>
          </div>
        </div>

        <div className="list">
          {courses.map((c) => (
            <div className="card list-item" key={c.id}>
              <div className="left">
                <img src={c.imageUrl ? `http://localhost:5083${c.imageUrl}` : "/placeholder.png"} alt="" className="thumb"/>
                <div>
                  <h3>{c.title}</h3>
                  <p className="muted">{c.description}</p>
                  <p className="muted">Price: {c.price} EGP</p>
                </div>
              </div>

              <div className="actions">
                <button className="btn" onClick={() => openEditCourse(c)}>Edit</button>
                <button className="btn danger" onClick={() => removeCourse(c.id)}>Delete</button>
                <div className="upload-row">
                  <input type="file" onChange={(e)=>setImageFile(e.target.files[0])} />
                  <button className="btn" onClick={() => uploadImage(c.id)}>Upload Image</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-sessions">
        <div className="section-header">
          <h2>Sessions</h2>
          <div>
            <button className="btn" onClick={openNewSession}>Add Session</button>
          </div>
        </div>

        <div className="list">
          {sessions.map((s) => (
            <div className="card list-item" key={s.id}>
              <div className="left">
                <div>
                  <h3>{s.title}</h3>
                  <p className="muted">Course: {s.courseTitle}</p>
                  <p className="muted">Price: {s.price} EGP</p>
                </div>
              </div>

              <div className="actions">
                <button className="btn" onClick={() => openEditSession(s)}>Edit</button>
                <button className="btn danger" onClick={() => removeSession(s.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Course Form Modal (simple inline) */}
      {courseForm && (
        <div className="modal">
          <div className="modal-card">
            <h3>{courseForm.id ? "Edit Course" : "Add Course"}</h3>
            <input placeholder="Title" value={courseForm.title} onChange={(e)=>setCourseForm({...courseForm, title:e.target.value})}/>
            <textarea placeholder="Description" value={courseForm.description} onChange={(e)=>setCourseForm({...courseForm, description:e.target.value})}/>
            <input placeholder="Price" type="number" value={courseForm.price} onChange={(e)=>setCourseForm({...courseForm, price:e.target.value})}/>
            <input placeholder="CategoryId" type="number" value={courseForm.categoryId} onChange={(e)=>setCourseForm({...courseForm, categoryId:e.target.value})}/>
            <div className="modal-actions">
              <button className="btn" onClick={saveCourse}>Save</button>
              <button className="btn" onClick={()=>setCourseForm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Session Form Modal */}
      {sessionForm && (
        <div className="modal">
          <div className="modal-card">
            <h3>{sessionForm.id ? "Edit Session" : "Add Session"}</h3>
            <input placeholder="Title" value={sessionForm.title} onChange={(e)=>setSessionForm({...sessionForm, title:e.target.value})}/>
            <input placeholder="Video URL" value={sessionForm.videoUrl} onChange={(e)=>setSessionForm({...sessionForm, videoUrl:e.target.value})}/>
            <input placeholder="Price" type="number" value={sessionForm.price} onChange={(e)=>setSessionForm({...sessionForm, price:e.target.value})}/>
            <input placeholder="CourseId" type="number" value={sessionForm.courseId} onChange={(e)=>setSessionForm({...sessionForm, courseId:e.target.value})}/>
            <div className="modal-actions">
              <button className="btn" onClick={saveSession}>Save</button>
              <button className="btn" onClick={()=>setSessionForm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
