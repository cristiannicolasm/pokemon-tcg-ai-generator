import React, { useState } from 'react';

const Register = ({ onRegisterSuccess }) => {
  // Añade un estado para el email
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Modifica la petición fetch para incluir el email
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Envía el email junto con el username y password
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        setMessage('¡Registro exitoso! Ya puedes iniciar sesión.');
        // Llama a la función del padre para notificar el éxito
        if (onRegisterSuccess) {
          onRegisterSuccess();
        }
      } else {
        const data = await response.json();
        // Muestra el mensaje de error del servidor, lo que es útil para el 400
        setMessage(`Error: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error('Error de red:', error);
      setMessage('Error de red al intentar conectar con el servidor.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegister}>
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
        {/* Añade un campo para el email */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Registrar</button>
      </form>
      {message && <p style={{ marginTop: '15px', color: message.includes("Error") ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default Register;
