import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserCollection from '../UserCollection';
import axiosInstance from '../../axiosInstance';

// Mock axiosInstance
jest.mock('../../axiosInstance');
const mockedAxios = axiosInstance;

// Mock CardDetailsModal
jest.mock('../CardDetailsModal', () => {
  return function MockCardDetailsModal({ cardGroup, onClose }) {
    return (
      <div data-testid="card-details-modal">
        <h2>{cardGroup.card_name} Modal</h2>
        <button onClick={onClose}>Cerrar Modal</button>
        <div>Instancias: {cardGroup.instances_count}</div>
      </div>
    );
  };
});

describe('UserCollection Integration Tests - Grouped Cards', () => {
  // ✅ NUEVO: Mock data para cartas agrupadas
  const mockGroupedCards = [
    {
      card_id: 1,
      card_name: 'Charizard',
      expansion_name: 'Base Set',
      expansion_id: 1,
      card_image: 'https://images.pokemontcg.io/base1/4_hires.png',
      total_quantity: 3,
      instances_count: 2,
      is_any_favorite: true,
      instances: [
        {
          id: 1,
          quantity: 1,
          language: 'EN',
          condition: 'NM',
          is_holographic: true,
          is_first_edition: false,
          is_signed: false,
          grade: null,
          notes: 'Beautiful card',
          is_favorite: true
        },
        {
          id: 2,
          quantity: 2,
          language: 'ES',
          condition: 'LP',
          is_holographic: false,
          is_first_edition: false,
          is_signed: false,
          grade: null,
          notes: null,
          is_favorite: false
        }
      ]
    },
    {
      card_id: 3,
      card_name: 'Vileplume',
      expansion_name: 'Jungle',
      expansion_id: 2,
      card_image: 'https://images.pokemontcg.io/jungle/15_hires.png',
      total_quantity: 1,
      instances_count: 1,
      is_any_favorite: false,
      instances: [
        {
          id: 3,
          quantity: 1,
          language: 'ES',
          condition: 'NM',
          is_holographic: true,
          is_first_edition: false,
          is_signed: false,
          grade: null,
          notes: null,
          is_favorite: false
        }
      ]
    }
  ];

  const mockExpansions = [
    {
      id: 1,
      name: 'Base Set',
      api_id: 'base1',
      user_cards_count: 2
    },
    {
      id: 2,
      name: 'Jungle',
      api_id: 'jungle',
      user_cards_count: 1
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // ✅ ACTUALIZAR: Mock para usar endpoint agrupado
    mockedAxios.get.mockImplementation((url) => {
      if (url === '/api/user-cards/grouped/') {
        return Promise.resolve({ data: mockGroupedCards });
      }
      if (url === '/api/user-expansions/') {
        return Promise.resolve({ data: mockExpansions });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });
  });

  test('T1: Renderiza cartas agrupadas correctamente', async () => {
    render(<UserCollection />);
    
    // Verificar loading
    expect(screen.getByText('Cargando tu colección...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText('Cargando tu colección...')).not.toBeInTheDocument();
    });
    
    // Verificar que muestra cartas agrupadas
    expect(screen.getByText('Charizard')).toBeInTheDocument();
    expect(screen.getByText('Vileplume')).toBeInTheDocument();
    
    // ✅ CORREGIDO: Usar getAllByText para elementos múltiples
    const cantidadTotalElements = screen.getAllByText(/Cantidad Total:/);
    expect(cantidadTotalElements).toHaveLength(2); // Una para cada carta
    
    const instanciasElements = screen.getAllByText(/Instancias:/);
    expect(instanciasElements).toHaveLength(2); // Una para cada carta
    
    // ✅ SIMPLIFICADO: Verificar que los números están presentes
    expect(screen.getByText('3')).toBeInTheDocument(); // Cantidad Charizard
    expect(screen.getByText('2')).toBeInTheDocument(); // Instancias Charizard
    
    // Para el número 1, hay múltiples (cantidad Vileplume e instancias Vileplume)
    const onesElements = screen.getAllByText('1');
    expect(onesElements.length).toBeGreaterThanOrEqual(2); // Al menos 2 elementos con "1"
    
    // Verificar botones "VER DETALLES"
    const detailButtons = screen.getAllByText('VER DETALLES');
    expect(detailButtons).toHaveLength(2);
    
    // ✅ BONUS: Verificar estructura de cartas
    expect(screen.getByText('Base Set')).toBeInTheDocument();
    expect(screen.getByText('Jungle')).toBeInTheDocument();
    expect(screen.getByText('⭐')).toBeInTheDocument(); // Favorito Charizard
    expect(screen.getByText('☆')).toBeInTheDocument(); // No favorito Vileplume
  });

  test('T2: Botón "VER DETALLES" abre modal correctamente', async () => {
    render(<UserCollection />);
    
    await waitFor(() => {
      expect(screen.queryByText('Cargando tu colección...')).not.toBeInTheDocument();
    });
    
    // Hacer clic en "VER DETALLES" del primer elemento (Charizard)
    const detailButtons = screen.getAllByText('VER DETALLES');
    fireEvent.click(detailButtons[0]);
    
    // Verificar que el modal se abre
    await waitFor(() => {
      expect(screen.getByTestId('card-details-modal')).toBeInTheDocument();
      expect(screen.getByText('Charizard Modal')).toBeInTheDocument();
      expect(screen.getByText('Instancias: 2')).toBeInTheDocument();
    });
  });

  test('T3: Cerrar modal funciona correctamente', async () => {
    render(<UserCollection />);
    
    await waitFor(() => {
      expect(screen.queryByText('Cargando tu colección...')).not.toBeInTheDocument();
    });
    
    // Abrir modal
    const detailButtons = screen.getAllByText('VER DETALLES');
    fireEvent.click(detailButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByTestId('card-details-modal')).toBeInTheDocument();
    });
    
    // Cerrar modal
    fireEvent.click(screen.getByText('Cerrar Modal'));
    
    await waitFor(() => {
      expect(screen.queryByTestId('card-details-modal')).not.toBeInTheDocument();
    });
  });

  test('T4: Filtrado por expansión funciona con cartas agrupadas', async () => {
    render(<UserCollection />);
    
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.queryByText('Cargando tu colección...')).not.toBeInTheDocument();
    });
    
    // Verificar estado inicial
    expect(screen.getByText('Charizard')).toBeInTheDocument();
    expect(screen.getByText('Vileplume')).toBeInTheDocument();
    
    // Filtrar por Base Set
    const expansionSelect = screen.getByRole('combobox');
    fireEvent.change(expansionSelect, { target: { value: '1' } });
    
    await waitFor(() => {
      expect(screen.getByText('Charizard')).toBeInTheDocument();
      expect(screen.queryByText('Vileplume')).not.toBeInTheDocument();
    });
  });

  test('T5: Contador de cartas muestra información agrupada', async () => {
    render(<UserCollection />);
    
    await waitFor(() => {
      expect(screen.queryByText('Cargando tu colección...')).not.toBeInTheDocument();
    });
    
    // ✅ CORREGIDO: Verificar contador total usando regex más flexible
    expect(screen.getByText(/4\s+cartas?\s+en\s+2\s+tipos?/)).toBeInTheDocument();
  });

  test('T6: Favoritos funcionan a nivel de grupo', async () => {
    mockedAxios.patch.mockResolvedValue({ data: {} });
    
    render(<UserCollection />);
    
    await waitFor(() => {
      expect(screen.queryByText('Cargando tu colección...')).not.toBeInTheDocument();
    });
    
    // Charizard debería mostrar como favorito (⭐)
    const charizardFavorite = screen.getAllByText('⭐')[0]; // Primer favorito
    expect(charizardFavorite).toBeInTheDocument();
    
    // Hacer clic en quitar de favoritos
    const favoriteButtons = screen.getAllByText('Quitar de favoritos');
    fireEvent.click(favoriteButtons[0]);
    
    // Verificar que se llamó la API
    await waitFor(() => {
      expect(mockedAxios.patch).toHaveBeenCalledWith('/api/user-cards/1/', {
        is_favorite: false
      });
    });
  });

  test('T7: Estado vacío muestra mensaje apropiado', async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url === '/api/user-cards/grouped/') {
        return Promise.resolve({ data: [] });
      }
      if (url === '/api/user-expansions/') {
        return Promise.resolve({ data: [] });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });
    
    render(<UserCollection />);
    
    await waitFor(() => {
      expect(screen.getByText('No tienes cartas en tu colección.')).toBeInTheDocument();
    });
  });

  test('T8: Usa endpoint correcto para cartas agrupadas', async () => {
    render(<UserCollection />);
    
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/user-cards/grouped/');
    });
  });
});