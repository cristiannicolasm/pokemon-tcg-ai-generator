import React, { useState, useEffect } from "react";
import "../global-pokemon.css";
import axios from '../axiosInstance';
import LoadingBar from './LoadingBar';

function AddUserCardForm({ token, onSuccess }) {
    const [showSpecialAttributes, setShowSpecialAttributes] = useState(false);
  const [form, setForm] = useState({
    quantity: 1,
    language: "EN",
    condition: "",
    is_holographic: false,
    is_first_edition: false,
    is_signed: false,
    grade: "",
    notes: ""
  });
  const [expansions, setExpansions] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedExpansion, setSelectedExpansion] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [message, setMessage] = useState("");
  const [loadingCards, setLoadingCards] = useState(false);

  useEffect(() => {
  // Lista las expansiones
  axios.get("/expansions/", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => setExpansions(res.data))
    .catch((error) => {
      setMessage("Error cargando expansiones: " + (error.response?.status || error.message));
    });
}, [token]);

useEffect(() => {
  if (selectedExpansion) {
    setLoadingCards(true);
    axios.get(`/expansions/${selectedExpansion}/cards/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCards(res.data))
      .catch((error) => {
        setMessage("Error cargando cartas: " + (error.response?.status || error.message));
      })
      .finally(() => setLoadingCards(false));
  } else {
    setCards([]); // Limpia las cartas si no hay expansión seleccionada
  }
}, [selectedExpansion, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage(""); // Limpia mensajes anteriores

  if (!selectedCard || selectedCard === "" || selectedCard === null) {
    setMessage("Debes seleccionar una carta.");
    return;
  }

  // Prepara los datos, omitiendo 'condition' si está vacío
  const dataToSend = { ...form };
  if (!dataToSend.condition) {
    delete dataToSend.condition;
  }

  try {
    await axios.post("/user-cards/add/", {
      card: selectedCard,
      ...dataToSend
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMessage("¡Carta añadida con éxito!");
    setForm({
      quantity: 1,
      language: "EN",
      condition: "",
      is_holographic: false,
      is_first_edition: false,
      is_signed: false,
      grade: "",
      notes: ""
    });
    setSelectedCard("");
    if (onSuccess) onSuccess(); // Notifica al padre
  } catch (err) {
    if (err.response && err.response.status === 400) {
      setMessage("Ya tienes esta carta con esos atributos o los datos son inválidos.");
    } else if (err.response && err.response.status === 401) {
      setMessage("Debes iniciar sesión para añadir cartas.");
    } else {
      setMessage("Error al añadir carta.");
    }
  }
};

  if (!token) return <div>Debes iniciar sesión para añadir cartas.</div>;

  return (
    <form className="add-card-form" onSubmit={handleSubmit}>
      <div style={{ display: 'flex', gap: '32px', width: '100%' }}>
        {/* Columna Izquierda */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="section-title">Información de la Carta</div>
          <label>Expansión:</label>
          <select
            value={selectedExpansion}
            onChange={e => {
              setSelectedExpansion(e.target.value);
              setSelectedCard(null);
            }}
            required
            data-testid="addcard-expansion-select"
            style={{ width: '100%' }}
          >
            <option value="">Selecciona una expansión</option>
            {expansions.map(exp => (
              <option key={exp.api_id} value={exp.api_id}>{exp.name}</option>
            ))}
          </select>

          <label>Carta:</label>
          {loadingCards ? (
            <LoadingBar />
          ) : (
            <select
              value={selectedCard ?? ""}
              onChange={e => {
                const value = e.target.value;
                setSelectedCard(value ? Number(value) : null);
              }}
              data-testid="addcard-card-select"
              style={{ width: '100%' }}
            >
              <option value="">Selecciona una carta</option>
              {cards.map(card => (
                <option key={card.id} value={card.id}>{card.name}</option>
              ))}
            </select>
          )}

          <div 
            className="card-preview" 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              boxShadow: 'none', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              padding: 0, 
              minHeight: '220px',
              marginTop: '16px',
              width: '100%'
            }}
          >
            {selectedCard ? (
              <img 
                src={cards.find(card => card.id === selectedCard)?.image_url_small} 
                alt={cards.find(card => card.id === selectedCard)?.name}
                className="card-preview-image"
                style={{ maxWidth: '100%', height: 'auto', maxHeight: '340px', objectFit: 'contain', display: 'block' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/245x342/cccccc/666666?text=No+Image';
                }}
              />
            ) : (
              <img 
                src="/whos-that-pokemon.jpg"
                alt="¿Quién es ese Pokémon?"
                className="card-preview-image"
                style={{ maxWidth: '100%', height: 'auto', maxHeight: '340px', objectFit: 'contain', display: 'block' }}
              />
            )}
          </div>
        </div>

        {/* Columna Derecha */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div className="section-title">Atributos</div>
          <label>Cantidad:</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            required
            data-testid="addcard-quantity"
            style={{ width: '100%' }}
          />

          <label>Idioma:</label>
          <select name="language" value={form.language} onChange={handleChange} style={{ width: '100%' }}>
            <option value="EN">Inglés</option>
            <option value="ES">Español</option>
            <option value="FR">Francés</option>
            <option value="DE">Alemán</option>
            <option value="IT">Italiano</option>
            <option value="JP">Japonés</option>
            <option value="KR">Coreano</option>
            <option value="PT">Portugués</option>
            <option value="CH">Chino</option>
          </select>

          <label style={{ marginTop: '16px', display: 'block' }}>
            <input
              type="checkbox"
              checked={showSpecialAttributes}
              onChange={e => setShowSpecialAttributes(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            Mostrar atributos especiales
          </label>

          {showSpecialAttributes && (
            <div style={{ marginTop: '12px', border: '1px solid #eee', borderRadius: '8px', padding: '12px', background: '#fafbfc' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ flex: 1, margin: 0 }}>Condición:</label>
                <select
                  name="condition"
                  value={form.condition}
                  onChange={handleChange}
                  style={{ width: '60%', minWidth: '120px', marginLeft: '10px' }}
                  disabled={!showSpecialAttributes}
                >
                  <option value="">Sin indicar</option>
                  <option value="NM">Near Mint</option>
                  <option value="LP">Lightly Played</option>
                  <option value="MP">Moderately Played</option>
                  <option value="HP">Heavily Played</option>
                  <option value="DMG">Damaged</option>
                  <option value="VG">Very Good</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ flex: 1, margin: 0 }}>Holográfica:</label>
                <input
                  type="checkbox"
                  name="is_holographic"
                  checked={form.is_holographic}
                  onChange={handleChange}
                  disabled={!showSpecialAttributes}
                  style={{ marginLeft: '10px', transform: 'scale(1.2)' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ flex: 1, margin: 0 }}>Primera edición:</label>
                <input
                  type="checkbox"
                  name="is_first_edition"
                  checked={form.is_first_edition}
                  onChange={handleChange}
                  disabled={!showSpecialAttributes}
                  style={{ marginLeft: '10px', transform: 'scale(1.2)' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ flex: 1, margin: 0 }}>Firmada:</label>
                <input
                  type="checkbox"
                  name="is_signed"
                  checked={form.is_signed}
                  onChange={handleChange}
                  disabled={!showSpecialAttributes}
                  style={{ marginLeft: '10px', transform: 'scale(1.2)' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <label style={{ flex: 1, margin: 0 }}>Grado:</label>
                <input
                  type="text"
                  name="grade"
                  value={form.grade}
                  onChange={handleChange}
                  disabled={!showSpecialAttributes}
                  style={{ width: '60%', minWidth: '120px', marginLeft: '10px' }}
                />
              </div>
            </div>
          )}

          <div className="section-title" style={{ marginTop: '18px' }}>Notas</div>
          <textarea name="notes" value={form.notes} onChange={handleChange} style={{ width: '100%' }} />

          {message && (
            <div className={`form-message ${message.includes('éxito') ? 'success' : message.includes('Error') || message.includes('debes') ? 'error' : ''}`}>{message}</div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
        <button className="submit-btn" type="submit" data-testid="addcard-submit" style={{ minWidth: '220px' }}>
          Añadir carta
        </button>
      </div>

    </form>
  );
}

export default AddUserCardForm;