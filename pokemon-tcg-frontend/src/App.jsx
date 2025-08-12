import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ExpansionSelector from './components/ExpansionSelector'; // <-- Importa el componente
import CardList from './components/CardList'; // <-- Importa el nuevo componente


function App() {
  const [count, setCount] = useState(0)

  // Estado para guardar el ID de la expansión seleccionada
  const [selectedExpansionId, setSelectedExpansionId] = useState(null);

  // Función que se llamará cuando el usuario cambie la selección
  const handleExpansionChange = (expansionId) => {
    setSelectedExpansionId(expansionId);
  };

  return (
    <div className="App">
      <h1>Pokémon TCG Tracker</h1>
      <ExpansionSelector onSelectExpansion={handleExpansionChange} /> 

      {/* Muestra CardList solo si una expansión ha sido seleccionada */}
      {selectedExpansionId && <CardList expansionId={selectedExpansionId} />}
    </div>
  );
}

export default App;


