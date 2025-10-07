import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import './ExpansionFilter.css';

const ExpansionFilter = ({ onExpansionChange, selectedExpansion }) => {
  const [expansions, setExpansions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Para prevenir memory leaks

    const fetchExpansions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get('/api/user-expansions/');

        if (isMounted) {
          setExpansions(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Error al cargar expansiones');
          console.error('Error fetching user expansions:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchExpansions();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  const totalCards = expansions.reduce((sum, exp) => sum + exp.user_cards_count, 0);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === 'all') {
      onExpansionChange('all', 'Todas');
    } else {
      const expansion = expansions.find(exp => exp.id === parseInt(value));
      onExpansionChange(parseInt(value), expansion?.name || '');
    }
  };

  if (loading) {
    return (
      <div className="expansion-filter-loading">
        Cargando expansiones...
      </div>
    );
  }

  if (error) {
    return (
      <div className="expansion-filter-error">
        {error}
      </div>
    );
  }

  if (expansions.length === 0) {
    return (
      <div className="expansion-filter-empty">
        No tienes cartas en tu colección
      </div>
    );
  }

  return (
    <div className="expansion-filter">
      <select
        value={selectedExpansion || 'all'}
        onChange={handleChange}
        role="combobox"
        className="expansion-select"
      >
        <option value="all">Todas las cartas ({totalCards})</option>
        {expansions.map(expansion => (
          <option key={expansion.id} value={expansion.id}>
            {expansion.name} ({expansion.user_cards_count})
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpansionFilter;