// pokemon-tcg-frontend/src/components/CardList.jsx
import React, { useState, useEffect } from 'react';

const CardList = ({ expansionId }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Construye la URL para el endpoint de listar cartas por expansión
    fetch(`/api/expansions/${expansionId}/cards/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCards(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [expansionId]); // <-- El efecto se ejecuta cada vez que 'expansionId' cambia

  if (loading) {
    return <div>Cargando cartas...</div>;
  }

  if (error) {
    return <div>Error al cargar las cartas: {error.message}</div>;
  }

  return (
    <div>
      <h3>Cartas en la Expansión</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {cards.map(card => (
          <div key={card.id}>
            <img src={card.large_image_url} alt={card.name} style={{ width: '150px' }} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;