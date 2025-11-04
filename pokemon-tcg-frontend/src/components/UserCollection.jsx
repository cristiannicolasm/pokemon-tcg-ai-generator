import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import ExpansionFilter from './ExpansionFilter';
import CardDetailsModal from './CardDetailsModal';
import './UserCollection.css';

const UserCollection = () => {
  const [groupedCards, setGroupedCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedExpansion, setSelectedExpansion] = useState('all');
  const [selectedExpansionName, setSelectedExpansionName] = useState('Todas');
  const [selectedCardGroup, setSelectedCardGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchGroupedCards = async () => {
    try {
      setLoading(true);
      console.log('🔍 Iniciando carga de cartas agrupadas...');
      console.log('🔑 Token en localStorage:', localStorage.getItem('access_token'));
      
      const response = await axiosInstance.get('/user-cards/grouped/');
      console.log('✅ Respuesta del servidor:', response.data);
      console.log('📊 Número de grupos de cartas:', response.data.length);
      
      setGroupedCards(response.data);
      setFilteredCards(response.data);
    } catch (err) {
      console.error('❌ Error fetching grouped cards:', err);
      console.error('📋 Detalles del error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });
      setError('Error al cargar tu colección: ' + (err.response?.status || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupedCards();
  }, []);

  useEffect(() => {
    if (selectedExpansion === 'all') {
      setFilteredCards(groupedCards);
      setSelectedExpansionName('Todas');
    } else {
      const expansionId = parseInt(selectedExpansion);
      const filtered = groupedCards.filter(cardGroup => cardGroup.expansion_id === expansionId);
      setFilteredCards(filtered);
      
      // Obtener nombre de expansión
      if (filtered.length > 0) {
        setSelectedExpansionName(filtered[0].expansion_name);
      }
    }
  }, [selectedExpansion, groupedCards]);

  const handleExpansionChange = (expansionId, expansionName) => {
    setSelectedExpansion(expansionId);
    setSelectedExpansionName(expansionName);
  };

  const showCardDetails = (cardGroup) => {
    setSelectedCardGroup(cardGroup);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCardGroup(null);
  };

  const refreshData = () => {
    fetchGroupedCards();
  };

  const toggleGroupFavorite = async (cardGroup) => {
    try {
      // Si alguna instancia ya es favorita, desmarcar todas; si no, marcar la primera
      const newFavoriteStatus = !cardGroup.is_any_favorite;
      
      // Actualizar la primera instancia
      const firstInstanceId = cardGroup.instances[0].id;
      await axiosInstance.patch(`/user-cards/${firstInstanceId}/`, {
        is_favorite: newFavoriteStatus
      });
      
      // Refrescar datos
      refreshData();
    } catch (err) {
      console.error('Error updating favorite status:', err);
    }
  };

  if (loading) return <div>Cargando tu colección...</div>;
  if (error) return <div>Error: {error}</div>;

  // Calcular estadísticas
  const totalCards = filteredCards.reduce((sum, group) => sum + group.total_quantity, 0);
  const totalGroups = filteredCards.length;

  return (
    <div className="user-collection">
      <h2>Mi Colección Pokémon</h2>
      
      <ExpansionFilter 
        onExpansionChange={handleExpansionChange}
        selectedExpansion={selectedExpansion}
      />
      
      <div className="collection-info">
        <p>
          Mostrando: <strong>{selectedExpansionName}</strong> ({totalCards} carta{totalCards !== 1 ? 's' : ''} en {totalGroups} tipo{totalGroups !== 1 ? 's' : ''})
        </p>
      </div>

      {filteredCards.length === 0 ? (
        <div className="no-cards">
          {selectedExpansion === 'all' 
            ? 'No tienes cartas en tu colección.' 
            : `No tienes cartas de la expansión "${selectedExpansionName}".`}
        </div>
      ) : (
        <div className="cards-grid">
          {filteredCards.map((cardGroup) => (
            <div key={`${cardGroup.card_id}_${cardGroup.expansion_id}`} className="user-card-item" data-testid="usercard-item">
              {/* Imagen */}
              <div className="card-image-container">
                <img 
                  src={cardGroup.card_image} 
                  alt={cardGroup.card_name}
                  className="card-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/245x342/cccccc/666666?text=No+Image';
                  }}
                />
              </div>
              
              {/* Información resumida */}
              <div className="card-info">
                <h3>{cardGroup.card_name}</h3>
                <p><strong>Expansión:</strong> {cardGroup.expansion_name}</p>
                <p><strong>Cantidad Total:</strong> {cardGroup.total_quantity}</p>
                <p><strong>Instancias:</strong> {cardGroup.instances_count}</p>
                <p><strong>Favorita:</strong> {cardGroup.is_any_favorite ? '⭐' : '☆'}</p>
              </div>
              
              {/* Acciones */}
              <div className="card-actions">
                <button
                  className="details-btn"
                  onClick={() => showCardDetails(cardGroup)}
                  data-testid="usercard-details-btn"
                >
                  VER DETALLES
                </button>
                <button
                  className={`favorite-btn ${cardGroup.is_any_favorite ? 'favorited' : ''}`}
                  onClick={() => toggleGroupFavorite(cardGroup)}
                  data-testid="usercard-favorite-btn"
                >
                  {cardGroup.is_any_favorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de detalles */}
      {showModal && selectedCardGroup && (
        <CardDetailsModal 
          cardGroup={selectedCardGroup}
          onClose={closeModal}
          onUpdate={refreshData}
        />
      )}
    </div>
  );
};

export default UserCollection;