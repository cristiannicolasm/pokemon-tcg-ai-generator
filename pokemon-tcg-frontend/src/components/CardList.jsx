// src/components/CardList.jsx
import React, { useState, useEffect } from 'react';

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
        // Obtenemos el token de acceso del localStorage
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error("No hay token de autenticación. Inicia sesión para ver las cartas.");
        }
        
        const response = await fetch(`http://localhost:8000/api/expansions/${expansionId}/cards/`, {
          method: 'GET',
          headers: {
            // Añade el encabezado de autorización con el token JWT
            'Authorization': `Bearer ${token}`
          }
        });

        // Maneja el error 401 si el token no es válido o ha expirado
        if (response.status === 401) {
          // Si el token no es válido, borra los tokens para forzar al usuario a iniciar sesión de nuevo.
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          throw new Error("Sesión expirada o no autorizada. Por favor, inicia sesión de nuevo.");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCards(data);
      } catch (e) {
        console.error('Error al obtener cartas:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [expansionId]);

  if (loading) return <div>Cargando cartas...</div>;
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
