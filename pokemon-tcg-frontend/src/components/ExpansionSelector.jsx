import React, { useState, useEffect } from 'react';

const ExpansionSelector = ({ onSelectExpansion }) => {
  const [expansions, setExpansions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // La URL utiliza el proxy que configuraste en vite.config.js
    fetch('/api/expansions/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setExpansions(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  if (loading) {
    return <div>Cargando expansiones...</div>;
  }

  if (error) {
    return <div>Error al cargar las expansiones: {error.message}</div>;
  }

  return (
    <div>
      <h2>Selecciona una Expansión</h2>
      <select onChange={(e) => onSelectExpansion(e.target.value)}> 
        <option value="">-- Elige una expansión --</option>
        {expansions.map(expansion => (
          <option key={expansion.id} value={expansion.api_id}>
            {expansion.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpansionSelector;