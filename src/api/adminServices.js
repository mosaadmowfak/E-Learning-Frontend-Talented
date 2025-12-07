// src/api/adminService.js
import api from "./axiosInstance";

export const getAdminDashboard = () => api.get("/Dashboard/admin");
export const getProfile = () => api.get("/Auth/profile");

// Courses
export const getCourses = () => api.get("/Courses");
export const createCourse = (payload) => api.post("/Courses", payload);
export const updateCourse = (id, payload) => api.put(`/Courses/${id}`, payload);
export const deleteCourse = (id) => api.delete(`/Courses/${id}`);
export const uploadCourseImage = (courseId, file) => {
  const fd = new FormData();
  fd.append("file", file);
  return api.post(`/Courses/${courseId}/upload-image`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Sessions
export const getSessions = () => api.get("/Sessions");
export const createSession = (payload) => api.post("/Sessions", payload);
export const updateSession = (id, payload) => api.put(`/Sessions/${id}`, payload);
export const deleteSession = (id) => api.delete(`/Sessions/${id}`);
