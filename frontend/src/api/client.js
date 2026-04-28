import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authApi = {
  login: (username, password) =>
    api.post('/api/auth/login/', { username, password }),
};

export const eventsApi = {
  list: (params) => api.get('/api/events/', { params }),
  create: (data) => api.post('/api/events/', data),
  update: (id, data) => api.put(`/api/events/${id}/`, data),
  remove: (id) => api.delete(`/api/events/${id}/`),
};

export const todosApi = {
  list: () => api.get('/api/todos/'),
  create: (data) => api.post('/api/todos/', data),
  update: (id, data) => api.patch(`/api/todos/${id}/`, data),
  remove: (id) => api.delete(`/api/todos/${id}/`),
};

export const contactApi = {
  submit: (data) => api.post('/api/contact-submissions/', data),
  list: () => api.get('/api/contact-submissions/'),
  get: (id) => api.get(`/api/contact-submissions/${id}/`),
  update: (id, data) => api.patch(`/api/contact-submissions/${id}/`, data),
};

export default api;
