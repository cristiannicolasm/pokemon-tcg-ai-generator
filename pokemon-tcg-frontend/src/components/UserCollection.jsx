import React, { useEffect, useState } from "react";
import axiosInstance from '../axiosInstance';
import ExpansionFilter from './ExpansionFilter';
import CardDetailsModal from './CardDetailsModal';
import './UserCollection.css';

function UserCollection({ refreshFlag }) {
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
      
      const response = await axiosInstance.get('/user-cards/grouped/');
      
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

  useEffect(() => {
    fetchGroupedCards();
  }, [refreshFlag]); // <-- se ejecuta cada vez que refreshFlag cambia

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
            <div
              key={`${cardGroup.card_id}_${cardGroup.expansion_id}`}
              className="user-card-item"
              data-testid="usercard-item"
              onClick={() => showCardDetails(cardGroup)}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
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
              <div className="card-info" style={{ textAlign: 'center', padding: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3em', width: '100%' }}>
                  <h3 style={{ margin: 0 }}>{cardGroup.card_name}</h3>
                  <span className="card-quantity" style={{ fontWeight: 600, color: '#3b4cca', fontSize: '0.95em' }}>x{cardGroup.total_quantity}</span>
                </div>
              </div>
              <button
                className="details-btn"
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 18,
                  transform: 'translateX(-50%)',
                  opacity: 0,
                  pointerEvents: 'none',
                  transition: 'opacity 0.2s',
                  zIndex: 2
                }}
                onClick={e => { e.stopPropagation(); showCardDetails(cardGroup); }}
                data-testid="usercard-details-btn"
              >
                Ver Detalle
              </button>
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