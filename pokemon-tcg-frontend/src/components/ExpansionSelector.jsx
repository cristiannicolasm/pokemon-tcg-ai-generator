// src/components/ExpansionSelector.jsx
import React, { useState, useEffect } from 'react';

const ExpansionSelector = ({ onSelectExpansion }) => {
  const [expansions, setExpansions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpansions = async () => {
      try {
        // Obtiene el token de acceso del localStorage
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error("No hay token de autenticación. Inicia sesión para ver las expansiones.");
        }

        const response = await fetch('http://localhost:8000/api/expansions/', {
          method: 'GET',
          headers: {
            // Añade el encabezado de autorización con el token JWT
            'Authorization': `Bearer ${token}`
          }
        });

        // Manejam el error 401 si el token no es válido o ha expirado
        if (response.status === 401) {
          throw new Error("Sesión expirada o no autorizada. Por favor, inicia sesión de nuevo.");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setExpansions(data);
      } catch (e) {
        console.error('Error al obtener expansiones:', e);
        setError(e.message);
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
