// src/components/CardList.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import LoadingBar from './LoadingBar';

const CardList = ({ expansionId }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!expansionId) return;

    const fetchCards = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/expansions/${expansionId}/cards/`);
        setCards(response.data);
      } catch (e) {
        console.error('Error al obtener cartas:', e);
        setError(e.message || 'Error al cargar las cartas');
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [expansionId]);

  if (loading) return <LoadingBar />;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div key={card.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
          {/* Aquí la propiedad de la imagen ha sido corregida */}
          <img src={card.image_url} alt={card.name} className="w-full h-auto rounded-md mb-2" />
          <h3 className="text-sm font-semibold text-center">{card.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CardList;
