import axios from 'axios';

const instance = axios.create();

// Interceptor para agregar token automáticamente
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Sending request with token:', token.substring(0, 20) + '...');
    } else {
      console.log('❌ No token found in localStorage');
    }
    console.log('📤 Request to:', config.url);
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => {
    console.log('✅ Response received:', response.status, response.config.url);
    return response;
  },
  error => {
    console.log('❌ Error response:', error.response?.status, error.config?.url);
    if (error.response && error.response.status === 401) {
      console.log('🚨 401 detected - Removing tokens and reloading');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default instance;