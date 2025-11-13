import React, { useState, useEffect } from "react";
import "./AddUserCardForm.css"; 
import axios from '../axiosInstance';
import LoadingBar from './LoadingBar';

function AddUserCardForm({ token, onSuccess }) {
  const [form, setForm] = useState({
    quantity: 1,
    language: "EN",
    condition: "NM",
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
  console.log('🔍 Submit triggered, selectedCard:', selectedCard);
  setMessage(""); // Limpia mensajes anteriores

  if (!selectedCard || selectedCard === "" || selectedCard === null) {
    console.log('❌ Validation failed: no card selected');
    setMessage("Debes seleccionar una carta.");
    return;
  }

  console.log('✅ Validation passed, proceeding to add card');

  try {
    await axios.post("/user-cards/add/", {
      card: selectedCard,
      ...form
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMessage("¡Carta añadida con éxito!");
    setForm({
      quantity: 1,
      language: "EN",
      condition: "NM",
      is_holographic: false,
      is_first_edition: false,
      is_signed: false,
      grade: "",
      notes: ""
    });
    setSelectedCard("");
    if (onSuccess) onSuccess();
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
      <div className="section">
        <div className="section-title">Información de la Carta</div>
        <label>Expansión:</label>
        <select
          value={selectedExpansion}
          onChange={e => setSelectedExpansion(e.target.value)}
          required
          data-testid="addcard-expansion-select"
        >
          <option value="">Selecciona una expansión</option>
          {expansions.map(exp => (
            <option key={exp.api_id} value={exp.api_id}>{exp.name}</option>
          ))}
        </select>

        {/* Barra de carga mientras se cargan las cartas de la expansión seleccionada */}
        {loadingCards && <LoadingBar />}

        <label>Carta:</label>
        <select
          value={selectedCard ?? ""}
          onChange={e => {
            const value = e.target.value;
            setSelectedCard(value ? Number(value) : null);
          }}
          data-testid="addcard-card-select"
          disabled={loadingCards}
        >
          <option value="">Selecciona una carta</option>
          {cards.map(card => (
            <option key={card.id} value={card.id}>{card.name}</option>
          ))}
        </select>

        {selectedCard && (
          <div className="card-preview">
            <img 
              src={cards.find(card => card.id === selectedCard)?.image_url_small} 
              alt={cards.find(card => card.id === selectedCard)?.name}
              className="card-preview-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/245x342/cccccc/666666?text=No+Image';
              }}
            />
            <p className="card-preview-name">
              {cards.find(card => card.id === selectedCard)?.name}
            </p>
          </div>
        )}
      </div>

      <div className="section">
        <div className="section-title">Atributos Físicos</div>
        <label>Cantidad:</label>
        <input
          type="number"
          name="quantity"
          min="1"
          value={form.quantity}
          onChange={handleChange}
          required
          data-testid="addcard-quantity"
        />

        <label>Idioma:</label>
        <select name="language" value={form.language} onChange={handleChange}>
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

        <label>Condición:</label>
        <select name="condition" value={form.condition} onChange={handleChange}>
          <option value="NM">Near Mint</option>
          <option value="LP">Lightly Played</option>
          <option value="MP">Moderately Played</option>
          <option value="HP">Heavily Played</option>
          <option value="DMG">Damaged</option>
          <option value="VG">Very Good</option>
        </select>
      </div>

      <div className="section">
        <div className="section-title">Detalles Especiales</div>
        <label>
          <input type="checkbox" name="is_holographic" checked={form.is_holographic} onChange={handleChange} />
          Holográfica
        </label>
        <label>
          <input type="checkbox" name="is_first_edition" checked={form.is_first_edition} onChange={handleChange} />
          Primera edición
        </label>
        <label>
          <input type="checkbox" name="is_signed" checked={form.is_signed} onChange={handleChange} />
          Firmada
        </label>
        <label>Grado:</label>
        <input type="text" name="grade" value={form.grade} onChange={handleChange} />
      </div>

      <div className="section">
        <div className="section-title">Notas</div>
        <textarea name="notes" value={form.notes} onChange={handleChange} />
      </div>

      {message && <div className="form-message">{message}</div>}
      <button className="submit-btn" type="submit" data-testid="addcard-submit">
        Añadir carta
      </button>
    </form>
  );
}

export default AddUserCardForm;