// src/components/Login.jsx
import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // CA1: Validar que los campos no estén vacíos
    if (!username || !password) {
      setMessage('Error: El nombre de usuario y la contraseña son obligatorios.');
      return;
    }

    try {
      // CA2: Realizar la petición POST al endpoint de la API
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // CA3: Almacenar los tokens en el localStorage
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        // CA4: Mostrar mensaje de éxito y limpiar campos
        setMessage('¡Inicio de sesión exitoso!');
        setUsername('');
        setPassword('');
        // CA5: Llamar a la función del padre para la redirección
        if (onLoginSuccess) {
          onLoginSuccess(data.access);
        }
      } else {
        const data = await response.json();
        // CA4: Mostrar mensaje de error de la API
        setMessage(`Error: ${data.detail || 'Credenciales incorrectas. Inténtalo de nuevo.'}`);
      }
    } catch (error) {
      console.error('Error de red:', error);
      // CA4: Mostrar mensaje de error de red
      setMessage('Error de red al intentar conectar con el servidor. Verifica que el backend esté activo.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Iniciar Sesión</button>
      </form>
      {message && <p style={{ marginTop: '15px', color: message.includes("Error") ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default Login;
