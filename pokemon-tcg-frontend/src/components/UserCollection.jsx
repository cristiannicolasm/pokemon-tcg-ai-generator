import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';

const UserCollection = ({ token }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [expansions, setExpansions] = useState([]);
  const [selectedExpansion, setSelectedExpansion] = useState(null);

  useEffect(() => {
    if (!token) {
      setMessage('Debes iniciar sesión para ver tu colección.');
      setLoading(false);
      return;
    }
    setLoading(true);
    axios.get('http://localhost:8000/api/user-cards/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setCards(res.data);
        setLoading(false);
      })
      .catch(err => {
        setMessage('Error al cargar la colección.');
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/expansions/')
      .then(res => setExpansions(res.data))
      .catch(() => setExpansions([]));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta carta de tu colección?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/user-cards/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCards(cards.filter(card => card.id !== id));
      setMessage('Carta eliminada correctamente.');
    } catch (err) {
      setMessage('Error al eliminar la carta.');
    }
  };

  const handleEditClick = (card) => {
    setEditingId(card.id);
    setEditData({
      quantity: card.quantity,
      language: card.language,
      condition: card.condition,
      is_holographic: card.is_holographic,
      is_first_edition: card.is_first_edition,
      is_signed: card.is_signed,
      notes: card.notes,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleEditSave = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/user-cards/${id}/`, editData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCards(cards.map(card => card.id === id ? { ...card, ...editData } : card));
      setEditingId(null);
      setMessage('Carta actualizada correctamente.');
    } catch (err) {
      setMessage('Error al actualizar la carta.');
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  if (loading) return <div>Cargando colección...</div>;
  if (message && cards.length === 0) return <div>{message}</div>;

  return (
    <div className="user-collection">
      <h2>Mi Colección</h2>
      {message && <div className="form-message">{message}</div>}
      {cards.length === 0 ? (
        <div>No tienes cartas en tu colección.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Carta</th>
              <th>Cantidad</th>
              <th>Idioma</th>
              <th>Condición</th>
              <th>Holo</th>
              <th>1ª Ed.</th>
              <th>Firmada</th>
              <th>Notas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cards.map(card => (
              <tr key={card.id}>
                <td>{card.card_name}</td>
                {editingId === card.id ? (
                  <>
                    <td>
                      <input
                        type="number"
                        name="quantity"
                        value={editData.quantity}
                        min="1"
                        onChange={handleEditChange}
                        style={{ width: "60px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="language"
                        value={editData.language}
                        onChange={handleEditChange}
                        style={{ width: "80px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="condition"
                        value={editData.condition}
                        onChange={handleEditChange}
                        style={{ width: "80px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="is_holographic"
                        checked={editData.is_holographic}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="is_first_edition"
                        checked={editData.is_first_edition}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="is_signed"
                        checked={editData.is_signed}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="notes"
                        value={editData.notes}
                        onChange={handleEditChange}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleEditSave(card.id)} style={{ marginRight: 4 }}>Guardar</button>
                      <button onClick={handleEditCancel}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{card.quantity}</td>
                    <td>{card.language}</td>
                    <td>{card.condition}</td>
                    <td>{card.is_holographic ? 'Sí' : 'No'}</td>
                    <td>{card.is_first_edition ? 'Sí' : 'No'}</td>
                    <td>{card.is_signed ? 'Sí' : 'No'}</td>
                    <td>{card.notes}</td>
                    <td>
                      <button onClick={() => handleEditClick(card)} style={{ marginRight: 4 }}>Editar</button>
                      <button onClick={() => handleDelete(card.id)} style={{ color: 'white', background: '#e3350d', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer' }}>
                        Eliminar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserCollection;