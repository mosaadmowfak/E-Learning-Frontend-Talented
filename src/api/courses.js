// src/api/courses.js
import api from "./axiosInstance";
export const getCourses = (params) => api.get("/Courses", { params });
export const getCourseById = (id) => api.get(`/Courses/${id}`);
export const createCourse = (payload) => api.post("/Courses", payload);
export const updateCourse = (id, payload) => api.put(`/Courses/${id}`, payload);
export const deleteCourse = (id) => api.delete(`/Courses/${id}`);
