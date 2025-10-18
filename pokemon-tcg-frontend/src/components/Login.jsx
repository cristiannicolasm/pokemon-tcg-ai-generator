import React, { useState } from 'react';
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
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        setMessage('¡Inicio de sesión exitoso!');
        setUsername('');
        setPassword('');
        if (onLoginSuccess) {
          onLoginSuccess(data.access);
        }
      } else {
        const data = await response.json();
        setMessage(`Error: ${data.detail || 'Credenciales incorrectas. Inténtalo de nuevo.'}`);
      }
    } catch (error) {
      console.error('Error de red:', error);
      setMessage('Error de red al intentar conectar con el servidor. Verifica que el backend esté activo.');
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-btn" disabled={isLoading}>
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