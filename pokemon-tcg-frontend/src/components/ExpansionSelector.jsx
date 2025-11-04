// src/components/ExpansionSelector.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

const ExpansionSelector = ({ onSelectExpansion }) => {
  const [expansions, setExpansions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpansions = async () => {
      try {
        const response = await axiosInstance.get('/expansions/');
        setExpansions(response.data);
      } catch (e) {
        console.error('Error al obtener expansiones:', e);
        setError(e.message || 'Error al cargar las expansiones');
      } finally {
        setLoading(false);
      }
    };
    fetchExpansions();
  }, []);

  if (loading) return <div>Cargando expansiones...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div className="mb-4">
      <label htmlFor="expansion-select" className="block text-gray-700 font-bold mb-2">
        Selecciona una Expansión:
      </label>
      <select
        id="expansion-select"
        onChange={(e) => onSelectExpansion(e.target.value)}
        className="block w-full border border-gray-400 p-2 rounded"
      >
        <option value="">-- Elige una --</option>
        {expansions.map((expansion) => (
          <option key={expansion.id} value={expansion.api_id}>
            {expansion.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpansionSelector;
