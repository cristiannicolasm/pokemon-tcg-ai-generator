import React, { useState } from 'react';

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setMessage('¡Registro exitoso! Ya puedes iniciar sesión.');
        // Llama a la función del padre para notificar el éxito
        if (onRegisterSuccess) {
          onRegisterSuccess();
        }
      } else {
        const data = await response.json();
        setMessage(`Error: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error('Error de red:', error);
      setMessage('Error de red al intentar conectar con el servidor.');
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
