import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/register/', {
        username, 
        email, 
        password
      });

      setMessage('¡Registro exitoso! Ya puedes iniciar sesión.');
      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
    } catch (error) {
      console.error('Error de red:', error);
      setMessage('Error de red al intentar conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
            Nombre de usuario:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            data-testid="register-username"
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            data-testid="register-email"
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            data-testid="register-password"
          />
        </div>
        <button 
          type="submit" 
          style={{ padding: '10px 20px', cursor: 'pointer' }}
          disabled={isLoading}
          data-testid="register-submit"
        >
          {isLoading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      {message && (
        <p style={{ marginTop: '15px', color: message.includes("Error") ? 'red' : 'green' }}>
          {message}
        </p>
      )}
      <div style={{ marginTop: '15px' }}>
        <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
      </div>
    </div>
  );
};

export default Register;
