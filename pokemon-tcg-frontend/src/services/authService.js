import axiosInstance from '../axiosInstance';

// Servicio de autenticación para Login y Register
export const authService = {
  // Login - Recibe email y password, devuelve tokens y datos de usuario
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login/', { email, password });
    // Guardar token en localStorage
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
  },

  // Register - Recibe datos de usuario, registra nuevo usuario
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register/', userData);
    return response.data;
  },

  // Logout - Elimina tokens
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  // GetCurrentUser - Devuelve usuario actual desde localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // GetToken - Devuelve token actual
  getToken: () => {
    return localStorage.getItem('access_token');
  }
};

export default authService;