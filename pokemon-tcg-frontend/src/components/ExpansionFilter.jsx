import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import './ExpansionFilter.css';

const ExpansionFilter = ({ onExpansionChange, selectedExpansion }) => {
  const [userExpansions, setUserExpansions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserExpansions = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/user-expansions/');
        setUserExpansions(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching user expansions:', err);
        setError('Error al cargar las expansiones');
      } finally {
        setLoading(false);
      }
    };

    fetchUserExpansions();
  }, []);

  const handleExpansionChange = (event) => {
    const expansionId = event.target.value;
    const expansionName = expansionId === 'all' 
      ? 'Todas las expansiones' 
      : userExpansions.find(exp => exp.id.toString() === expansionId)?.name || '';
    
    onExpansionChange(expansionId, expansionName);
  };

  if (loading) return <div className="expansion-filter-loading">Cargando expansiones...</div>;
  if (error) return <div className="expansion-filter-error">{error}</div>;

  return (
    <div className="expansion-filter">
      <label htmlFor="expansion-select" className="expansion-filter-label">
        Filtrar por expansión:
      </label>
      <select 
        id="expansion-select"
        value={selectedExpansion} 
        onChange={handleExpansionChange}
        className="expansion-filter-select"
      >
        <option value="all">Todas las expansiones ({userExpansions.reduce((total, exp) => total + exp.user_cards_count, 0)} cartas)</option>
        {userExpansions.map((expansion) => (
          <option key={expansion.id} value={expansion.id}>
            {expansion.name} ({expansion.user_cards_count} carta{expansion.user_cards_count !== 1 ? 's' : ''})
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpansionFilter;