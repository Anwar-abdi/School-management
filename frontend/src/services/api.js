import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
  },
});

// Student endpoints
export const getStudents = () => api.get('/students');
export const createStudent = (data) => api.post('/students', data);
export const updateStudent = (id, data) => {
  console.log('Making update request:', { id, data });
  return api.put(`/students/${id}`, data);
};
export const deleteStudent = (id) => api.delete(`/students/${id}`);

// Teacher endpoints
export const getTeachers = () => api.get('/teachers');
export const createTeacher = (data) => api.post('/teachers', data);
export const updateTeacher = (id, data) => api.put(`/teachers/${id}`, data);
export const deleteTeacher = (id) => api.delete(`/teachers/${id}`);
