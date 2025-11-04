import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // AÑADIR

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Error: El nombre de usuario y la contraseña son obligatorios.');
      return;
    }

    setIsLoading(true); // AÑADIR
    try {
      const response = await axiosInstance.post('/token/', {
        username, 
        password
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      setMessage('¡Inicio de sesión exitoso!');
      setUsername('');
      setPassword('');
      if (onLoginSuccess) {
        onLoginSuccess(response.data.access);
      }
    } catch (error) {
      console.error('Error de login:', error);
      setMessage(error.response?.data?.detail || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsLoading(false); // AÑADIR
    }
  };

  return (
    <div className="login-form">
      {/* Pokébola SVG */}
      <svg className="pokeball-icon" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#fff" stroke="#222" strokeWidth="4"/>
        <path d="M2,50 a48,48 0 0,1 96,0" fill="#e3350d" stroke="#222" strokeWidth="4"/>
        <circle cx="50" cy="50" r="18" fill="#fff" stroke="#222" strokeWidth="4"/>
        <circle cx="50" cy="50" r="8" fill="#222"/>
      </svg>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            name="username" // <-- Agregado para pruebas E2E cypress
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            data-testid="login-username" // <-- Agregado para pruebas E2E cypress
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password" // <-- Agregado para pruebas E2E cypress
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="login-password" // <-- Agregado para pruebas E2E cypress
          />
        </div>
        <button
          type="submit"
          className="login-btn"
          disabled={isLoading}
          data-testid="login-submit" // <-- Agregado para pruebas E2E cypress
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
      {message && (
        <div 
          data-testid="login-message"
          className={`form-message ${message.includes("Error") ? "error" : "success"}`}
        >
          {message}
        </div>
      )}
      <div className="form-links">
        <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
      </div>
    </div>
  );
};

export default Login;