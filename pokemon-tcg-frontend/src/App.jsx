// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import ExpansionSelector from './components/ExpansionSelector';
import CardList from './components/CardList';
import Register from './components/Register';
import Login from './components/Login'; // Importa el nuevo componente Login

function App() {
  // Maneja el estado de autenticación. Si hay un token, el usuario está logueado.
  const [authToken, setAuthToken] = useState(localStorage.getItem('access_token'));
  
  // Maneja la página actual para usuarios no autenticados: 'login' o 'register'.
  // Si el usuario ya está autenticado, esta variable no es relevante.
  const [currentPage, setCurrentPage] = useState('login'); 
  const [selectedExpansionId, setSelectedExpansionId] = useState(null);

  // Esta función se llama desde el componente Login al iniciar sesión con éxito.
  const handleLoginSuccess = (token) => {
    setAuthToken(token);
    setCurrentPage('home'); // Redirige a la página principal
  };

  // Esta función se llama desde el componente Register al registrarse con éxito.
  // Ahora también maneja la navegación a la página de login.
  const handleRegisterSuccess = () => {
    setCurrentPage('login');
    // En una aplicación real, aquí mostrarías un modal o una alerta de éxito
  };

  // Maneja el logout del usuario
  const handleLogout = () => {
    // Elimina los tokens del almacenamiento local
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // Actualiza el estado para reflejar el cierre de sesión
    setAuthToken(null);
    setCurrentPage('login'); // Vuelve a la página de login
  };

  // Lógica de renderizado condicional principal
  const renderContent = () => {
    // Si el usuario está autenticado, muestra el contenido principal de la app
    if (authToken) {
      return (
        <>
          <header>
            <h1 className="text-3xl font-bold mb-4">Pokémon TCG Tracker</h1>
            <p className="mb-4">¡Bienvenido! Has iniciado sesión exitosamente.</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar Sesión
            </button>
          </header>
          <ExpansionSelector onSelectExpansion={setSelectedExpansionId} />
          {selectedExpansionId && <CardList expansionId={selectedExpansionId} />}
        </>
      );
    } 
    // Si el usuario NO está autenticado, muestra los formularios de Login o Register
    else {
      // Si la página actual es 'register', muestra el componente de registro
      if (currentPage === 'register') {
        return (
          <>
            <h1 className="text-3xl font-bold mb-4">Registro de Usuario</h1>
            <Register onRegisterSuccess={handleRegisterSuccess} />
            <p className="mt-4">
              ¿Ya tienes una cuenta?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="text-blue-500 hover:underline"
              >
                Inicia sesión aquí
              </button>
            </p>
          </>
        );
      } 
      // De lo contrario, muestra el componente de login
      else {
        return (
          <>
            <h1 className="text-3xl font-bold mb-4">Inicio de Sesión</h1>
            <Login onLoginSuccess={handleLoginSuccess} />
            <p className="mt-4">
              ¿No tienes una cuenta?{' '}
              <button
                onClick={() => setCurrentPage('register')}
                className="text-blue-500 hover:underline"
              >
                Regístrate aquí
              </button>
            </p>
          </>
        );
      }
    }
  };

  return (
    <div className="App p-6 bg-gray-100 min-h-screen">
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
