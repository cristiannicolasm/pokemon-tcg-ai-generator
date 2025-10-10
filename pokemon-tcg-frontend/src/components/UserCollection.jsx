import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import ExpansionFilter from './ExpansionFilter';  // ← Nuevo import
import './UserCollection.css';

const UserCollection = () => {
  const [userCards, setUserCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);  // ← Nuevo estado
  const [selectedExpansion, setSelectedExpansion] = useState('all');  // ← Nuevo estado
  const [selectedExpansionName, setSelectedExpansionName] = useState('Todas las expansiones');  // ← Nuevo estado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/user-cards/');
        setUserCards(response.data);
        setFilteredCards(response.data);  // ← Inicializar cartas filtradas
        setError(null);
      } catch (err) {
        console.error('Error fetching user cards:', err);
        setError('Error al cargar tu colección');
      } finally {
        setLoading(false);
      }
    };

    fetchUserCards();
  }, []);

  // ← Nueva función para manejar cambio de filtro
  const handleExpansionChange = (expansionId, expansionName) => {
    console.log('🔍 FILTRO DEBUG:', { expansionId, expansionName, tipo: typeof expansionId });
    console.log('📦 userCards disponibles:', userCards.length);
    
    setSelectedExpansion(expansionId);
    setSelectedExpansionName(expansionName);
    
    if (expansionId === 'all') {
      setFilteredCards(userCards);
    } else {
      const filtered = userCards.filter(userCard => {
        console.log(`🔍 Carta: ${userCard.card_name}`);
        console.log(`   expansion_id: ${userCard.expansion_id} (${typeof userCard.expansion_id})`);
        console.log(`   buscando: ${expansionId} (${typeof expansionId})`);
        console.log(`   toString: "${userCard.expansion_id?.toString()}" === "${expansionId.toString()}"`);
        
        const match = userCard.expansion_id && userCard.expansion_id.toString() === expansionId.toString();
        console.log(`   ¿COINCIDE? ${match}`);
        return match;
      });
      console.log('✅ Resultado filtrado:', filtered.length, 'cartas');
      setFilteredCards(filtered);
    }
  };

  const handleCardUpdate = async (cardId, updatedData) => {
    try {
      const response = await axiosInstance.patch(`/api/user-cards/${cardId}/`, updatedData);
      
      // Actualizar las cartas originales
      const updatedCards = userCards.map(card => 
        card.id === cardId ? response.data : card
      );
      setUserCards(updatedCards);
      
      // ✅ ARREGLAR: Usar expansion_id consistentemente (como en handleExpansionChange)
      if (selectedExpansion === 'all') {
        setFilteredCards(updatedCards);
      } else {
        const filtered = updatedCards.filter(userCard => 
          userCard.expansion_id && userCard.expansion_id.toString() === selectedExpansion.toString()
        );
        setFilteredCards(filtered);
      }
    } catch (err) {
      console.error('Error updating card:', err);
      setError('Error al actualizar la carta');
    }
  };

  const handleCardDelete = async (cardId) => {
    try {
      await axiosInstance.delete(`/api/user-cards/${cardId}/`);
      
      // Actualizar las cartas originales
      const updatedCards = userCards.filter(card => card.id !== cardId);
      setUserCards(updatedCards);
      
      // ✅ ARREGLAR: Usar expansion_id consistentemente (como en handleExpansionChange)
      if (selectedExpansion === 'all') {
        setFilteredCards(updatedCards);
      } else {
        const filtered = updatedCards.filter(userCard => 
          userCard.expansion_id && userCard.expansion_id.toString() === selectedExpansion.toString()
        );
        setFilteredCards(filtered);
      }
    } catch (err) {
      console.error('Error deleting card:', err);
      setError('Error al eliminar la carta');
    }
  };

  if (loading) return <div className="loading">Cargando tu colección...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-collection">
      <h2>Mi Colección Pokémon</h2>
      
      {/* ← Nuevo componente de filtro */}
      <ExpansionFilter 
        onExpansionChange={handleExpansionChange}
        selectedExpansion={selectedExpansion}
      />

      {/* ← Mostrar información del filtro actual */}
      <div className="collection-info">
        <p>
          Mostrando: <strong>{selectedExpansionName}</strong> 
          ({filteredCards.length} carta{filteredCards.length !== 1 ? 's' : ''})
        </p>
      </div>

      {filteredCards.length === 0 ? (
        <div className="no-cards">
          {selectedExpansion === 'all' 
            ? 'No tienes cartas en tu colección aún.'
            : `No tienes cartas de la expansión "${selectedExpansionName}".`
          }
        </div>
      ) : (
        <div className="cards-grid">
          {filteredCards.map((userCard) => (
            <div key={userCard.id} className="user-card-item">
              {/* ← AGREGAR: Sección de imagen */}
              <div className="card-image-container">
                <img 
                  src={userCard.card_image} 
                  alt={userCard.card_name}
                  className="card-image"
                  onError={(e) => {
                    e.target.src = '/placeholder-card.png'; // Imagen de fallback
                  }}
                />
              </div>
              
              <div className="card-info">
                <h3>{userCard.card_name}</h3>
                <p><strong>Expansión:</strong> {userCard.expansion_name}</p>
                <p><strong>Cantidad:</strong> {userCard.quantity}</p>
                <p><strong>Idioma:</strong> {userCard.language}</p>
                <p><strong>Condición:</strong> {userCard.condition}</p>
                <p><strong>Holográfica:</strong> {userCard.is_holographic ? 'Sí' : 'No'}</p>
                <p><strong>Favorita:</strong> {userCard.is_favorite ? '⭐' : '☆'}</p>
                {userCard.notes && <p><strong>Notas:</strong> {userCard.notes}</p>}
              </div>
              
              <div className="card-actions">
                <button 
                  onClick={() => handleCardUpdate(userCard.id, { is_favorite: !userCard.is_favorite })}
                  className={`favorite-btn ${userCard.is_favorite ? 'favorited' : ''}`}
                >
                  {userCard.is_favorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
                </button>
                <button 
                  onClick={() => handleCardDelete(userCard.id)}
                  className="delete-btn"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCollection;