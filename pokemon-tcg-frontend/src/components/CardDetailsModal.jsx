import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import './CardDetailsModal.css';

const CardDetailsModal = ({ cardGroup, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteInstance = async (instanceId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta instancia?')) {
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.delete(`/user-cards/${instanceId}/`);
      onUpdate(); // Refrescar datos
      
      // Si era la última instancia, cerrar modal
      if (cardGroup.instances.length === 1) {
        onClose();
      }
    } catch (err) {
      console.error('Error eliminando instancia:', err);
      alert('Error al eliminar la instancia');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (instanceId, currentFavoriteStatus) => {
    try {
      setLoading(true);
      await axiosInstance.patch(`/user-cards/${instanceId}/`, {
        is_favorite: !currentFavoriteStatus
      });
      onUpdate(); // Refrescar datos
    } catch (err) {
      console.error('Error actualizando favorito:', err);
      alert('Error al actualizar favorito');
    } finally {
      setLoading(false);
    }
  };

  const getConditionText = (condition) => {
    const conditions = {
      'M': 'Mint (M)',
      'NM': 'Near Mint (NM)',
      'LP': 'Lightly Played (LP)',
      'MP': 'Moderately Played (MP)',
      'HP': 'Heavily Played (HP)',
      'D': 'Damaged (D)'
    };
    return conditions[condition] || condition;
  };

  const getLanguageText = (language) => {
    const languages = {
      'EN': 'Inglés',
      'ES': 'Español',
      'JP': 'Japonés',
      'FR': 'Francés',
      'DE': 'Alemán'
    };
    return languages[language] || language;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{cardGroup.card_name}</h2>
          <button className="close-btn" onClick={onClose} disabled={loading}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="card-summary">
            <img 
              src={cardGroup.card_image} 
              alt={cardGroup.card_name} 
              className="modal-card-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/245x342/cccccc/666666?text=No+Image';
              }}
            />
            <div className="summary-info">
              <p><strong>Expansión:</strong> {cardGroup.expansion_name}</p>
              <p><strong>Total en colección:</strong> {cardGroup.total_quantity}</p>
              <p><strong>Instancias diferentes:</strong> {cardGroup.instances_count}</p>
            </div>
          </div>

          <div className="instances-section">
            <h3>Todas tus instancias:</h3>
            <div className="instances-list">
              {cardGroup.instances.map((instance, index) => (
                <div key={instance.id} className="instance-item">
                  <div className="instance-header">
                    <h4>Instancia #{index + 1}</h4>
                    <div className="instance-actions">
                      <button
                        className={`favorite-btn ${instance.is_favorite ? 'favorited' : ''}`}
                        onClick={() => handleToggleFavorite(instance.id, instance.is_favorite)}
                        disabled={loading}
                        title={instance.is_favorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
                        data-testid={`instance-favorite-btn-${instance.id}`}
                      >
                        {instance.is_favorite ? '⭐' : '☆'}
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteInstance(instance.id)}
                        disabled={loading}
                        title="Eliminar instancia"
                        data-testid={`instance-delete-btn-${instance.id}`}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <div className="instance-details">
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Cantidad:</span>
                        <span className="detail-value">{instance.quantity}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Idioma:</span>
                        <span className="detail-value">{getLanguageText(instance.language)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Condición:</span>
                        <span className="detail-value">{getConditionText(instance.condition)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Holográfica:</span>
                        <span className="detail-value">{instance.is_holographic ? 'Sí' : 'No'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Primera Edición:</span>
                        <span className="detail-value">{instance.is_first_edition ? 'Sí' : 'No'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Firmada:</span>
                        <span className="detail-value">{instance.is_signed ? 'Sí' : 'No'}</span>
                      </div>
                      {instance.grade && (
                        <div className="detail-item">
                          <span className="detail-label">Grado:</span>
                          <span className="detail-value">{instance.grade}</span>
                        </div>
                      )}
                      {instance.notes && (
                        <div className="detail-item full-width">
                          <span className="detail-label">Notas:</span>
                          <span className="detail-value">{instance.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="close-modal-btn" onClick={onClose} disabled={loading}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsModal;