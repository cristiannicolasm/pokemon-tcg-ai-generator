import { useState } from 'react';
import './App.css';
import ExpansionSelector from './components/ExpansionSelector';
import CardList from './components/CardList';
import Register from './components/Register'; // <-- Importa el nuevo componente

function App() {
  const [selectedExpansionId, setSelectedExpansionId] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // <-- Nuevo estado para la página actual

  const handleExpansionChange = (expansionId) => {
    setSelectedExpansionId(expansionId);
  };

  // Función para cambiar a la página de registro
  const handleGoToRegister = () => {
    setCurrentPage('register');
  };

  // Función para volver a la página principal
  const handleRegisterSuccess = () => {
    setCurrentPage('home');
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
  };

  // Lógica de renderizado condicional
  const renderPage = () => {
    if (currentPage === 'register') {
      return <Register onRegisterSuccess={handleRegisterSuccess} />;
    }
    // Si no es la página de registro, muestra la página principal
    return (
      <>
        <h1>Pokémon TCG Tracker</h1>
        <ExpansionSelector onSelectExpansion={handleExpansionChange} />
        {selectedExpansionId && <CardList expansionId={selectedExpansionId} />}
      </>
    );
  };

  return (
    <div className="App">
      {/* Botón para cambiar a la página de registro */}
      {currentPage !== 'register' && (
        <button onClick={handleGoToRegister}>Ir a Registro</button>
      )}

      {/* Renderiza la página actual */}
      {renderPage()}
    </div>
  );
}

export default App;
