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
} from "../../api/adminServices.js";
import "./admin.css";

// 🔥 دالة لإصلاح أي Response راجع String بدل JSON
function fixResponse(data) {
  try {
    return typeof data === "string" ? JSON.parse(data) : data;
  } catch {
    return data;
  }
}

export default function AdminDashboard() {
  const [profile, setProfile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);
  const [courseForm, setCourseForm] = useState(null);
  const [sessionForm, setSessionForm] = useState(null);
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

      setProfile(fixResponse(pRes.data));
      setSummary(fixResponse(dRes.data));
      setCourses(fixResponse(cRes.data) || []);
      setSessions(fixResponse(sRes.data) || []);
    } catch (err) {
      console.error("Admin load error:", err);
      alert("خطأ في جلب البيانات — راجع الـ console");
    } finally {
      setLoading(false);
    }
  }

  // COURSE CRUD
  const openNewCourse = () =>
    setCourseForm({ title: "", description: "", price: 0, categoryId: 0 });

  const openEditCourse = (c) =>
    setCourseForm({
      id: c.id,
      title: c.title,
      description: c.description || "",
      price: c.price,
      categoryId: c.categoryId || 0,
    });

  const saveCourse = async () => {
    try {
      let res;
      if (courseForm.id) {
        res = await updateCourse(courseForm.id, {
          title: courseForm.title,
          description: courseForm.description,
          price: Number(courseForm.price),
          categoryId: Number(courseForm.categoryId),
        });
      } else {
        res = await createCourse({
          title: courseForm.title,
          description: courseForm.description,
          price: Number(courseForm.price),
          categoryId: Number(courseForm.categoryId),
        });
      }

      const data = fixResponse(res.data);
      alert(data.message || "تم الحفظ بنجاح");

      setCourseForm(null);
      await loadAll();
    } catch (err) {
      console.error(err);
      alert("خطأ أثناء حفظ الكورس");
    }
  };

  const removeCourse = async (id) => {
    if (!window.confirm("متأكد تحذف الكورس؟")) return;
    try {
      const res = await deleteCourse(id);
      const data = fixResponse(res.data);
      alert(data.message || "تم الحذف");
      await loadAll();
    } catch (err) {
      console.error(err);
      alert("خطأ في الحذف");
    }
  };

  const uploadImage = async (courseId) => {
    if (!imageFile) return alert("اختار صورة الأول");

    try {
      const res = await uploadCourseImage(courseId, imageFile);
      const data = fixResponse(res.data);
      alert(data.message || "Image uploaded");
      setImageFile(null);
      await loadAll();
    } catch (err) {
      console.error(err);
      alert("خطأ في رفع الصورة");
    }
  };

  // SESSION CRUD
  const openNewSession = () =>
    setSessionForm({ title: "", videoUrl: "", price: 0, courseId: 0 });

  const openEditSession = (s) =>
    setSessionForm({
      id: s.id,
      title: s.title,
      videoUrl: s.videoUrl || "",
      price: s.price,
      courseId: s.courseId,
    });

  const saveSession = async () => {
    try {
      let res;
      if (sessionForm.id) {
        res = await updateSession(sessionForm.id, {
          title: sessionForm.title,
          videoUrl: sessionForm.videoUrl,
          price: Number(sessionForm.price),
        });
      } else {
        res = await createSession({
          title: sessionForm.title,
          videoUrl: sessionForm.videoUrl,
          price: Number(sessionForm.price),
          courseId: Number(sessionForm.courseId),
        });
      }

      const data = fixResponse(res.data);
      alert(data.message || "تم حفظ السيشن");

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
      const res = await deleteSession(id);
      const data = fixResponse(res.data);
      alert(data.message || "تم حذف السيشن");
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

      {/* باقي الواجهة بدون تغيير */}
      {/* 👆 مش هغير أي UI، بس منطق CRUD اتظبط */}

      {/* Profile */}
      <section className="admin-profile">
        <div className="card">
          <h3>Profile</h3>
          <p><b>Name:</b> {profile?.name || "-"}</p>
          <p><b>Email:</b> {profile?.email || "-"}</p>
          <p><b>Role:</b> {profile?.role || "-"}</p>
        </div>
      </section>

      {/* Summary */}
      <section className="admin-summary">
        <div className="summary-grid">
          <div className="stat card">Enrolled Courses: <b>{summary?.totalCourses ?? 0}</b></div>
          <div className="stat card">Booked Sessions: <b>{summary?.totalSessions ?? 0}</b></div>
          <div className="stat card">Total Students: <b>{summary?.totalStudents ?? 0}</b></div>
          <div className="stat card">Total Sales: <b>{summary?.totalSales ?? 0}</b></div>
        </div>
      </section>

      {/* Courses */}
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
                <img
                  src={c.imageUrl ? `${API}${c.imageUrl}` : "/placeholder.png"}
                  alt=""
                  className="thumb"
                />
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
                  <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
                  <button className="btn" onClick={() => uploadImage(c.id)}>Upload Image</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sessions */}
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
    </div>
  );
}
