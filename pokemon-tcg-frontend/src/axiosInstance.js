import axios from 'axios';

// Usa variable de entorno si existe, si no, usa /api (para proxy de Vite)
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Interceptor para agregar token automáticamente (opcional)
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para manejar respuestas 401 (opcional)
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;