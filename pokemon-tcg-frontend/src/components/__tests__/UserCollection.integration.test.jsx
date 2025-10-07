import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserCollection from '../UserCollection';
import axiosInstance from '../../axiosInstance';

// Mock axiosInstance
jest.mock('../../axiosInstance');
const mockedAxios = axiosInstance;

describe('UserCollection Integration Tests', () => {
  const mockUserCards = [
    {
      id: 1,
      card_name: 'Charizard',
      expansion_name: 'Base Set',
      expansion_id: 1,
      card_image: 'https://example.com/charizard.jpg',
      quantity: 1,
      language: 'EN',        // ✅ Abreviación correcta
      condition: 'NM',       // ✅ Abreviación correcta
      is_holographic: true,
      is_favorite: false,
      notes: 'Beautiful card'
    },
    {
      id: 2,
      card_name: 'Blastoise',
      expansion_name: 'Base Set',
      expansion_id: 1,
      card_image: 'https://example.com/blastoise.jpg',
      quantity: 2,
      language: 'EN',        // ✅ Abreviación correcta
      condition: 'LP',       // ✅ Abreviación correcta
      is_holographic: false,
      is_favorite: true,
      notes: ''
    },
    {
      id: 3,
      card_name: 'Vileplume',
      expansion_name: 'Jungle',
      expansion_id: 2,
      card_image: 'https://example.com/vileplume.jpg',
      quantity: 1,
      language: 'ES',        // ✅ Abreviación correcta
      condition: 'NM',       // ✅ Abreviación correcta
      is_holographic: true,
      is_favorite: false,
      notes: ''
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
    
    // Mock por defecto
    mockedAxios.get.mockImplementation((url) => {
      if (url === '/api/user-cards/') {
        return Promise.resolve({ data: mockUserCards });
      }
      if (url === '/api/user-expansions/') {
        return Promise.resolve({ data: mockExpansions });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });
  });

  test('T4.1: Renderiza colección completa inicialmente', async () => {
    render(<UserCollection />);
    
    // Verificar loading
    expect(screen.getByText('Cargando tu colección...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText('Cargando tu colección...')).not.toBeInTheDocument();
    });
    
    // Verificar que muestra todas las cartas
    expect(screen.getByText('Charizard')).toBeInTheDocument();
    expect(screen.getByText('Blastoise')).toBeInTheDocument();
    expect(screen.getByText('Vileplume')).toBeInTheDocument();
    
    // ✅ MANTENER la solución que funcionaba para T4.1:
    await waitFor(() => {
      expect(screen.getByText('Todas las expansiones')).toBeInTheDocument();
    });
    
    // Verificar que hay botones de acción (indica que las cartas se renderizaron)
    const favoriteButtons = screen.getAllByText(/Marcar como favorito|Quitar de favoritos/);
    const deleteButtons = screen.getAllByText('Eliminar');
    
    expect(favoriteButtons.length).toBeGreaterThan(0);
    expect(deleteButtons.length).toBe(3); // 3 cartas = 3 botones eliminar
    
    // Verificar que el contador muestra el número correcto
    const collectionInfo = document.querySelector('.collection-info p');
    expect(collectionInfo.textContent).toMatch(/\(3\s+cartas?\)/);
  });

  test('T4.2: Filtrar por expansión funciona correctamente', async () => {
    render(<UserCollection />);
    
    // Esperar carga completa
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.queryByText('Cargando tu colección...')).not.toBeInTheDocument();
      expect(screen.queryByText('Cargando expansiones...')).not.toBeInTheDocument();
    }, { timeout: 5000 });

    // Dar tiempo extra para estabilizar
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Verificar estado inicial
    expect(screen.getByText('Charizard')).toBeInTheDocument();
    expect(screen.getByText('Blastoise')).toBeInTheDocument();
    expect(screen.getByText('Vileplume')).toBeInTheDocument();
    
    const expansionSelect = screen.getByRole('combobox');
    
    // Cambiar filtro
    fireEvent.change(expansionSelect, { target: { value: '1' } });
    
    // Esperar que el filtrado se complete
    await waitFor(() => {
      expect(screen.queryByText('Vileplume')).not.toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Verificar que las cartas correctas están visibles
    await waitFor(() => {
      expect(screen.getByText('Charizard')).toBeInTheDocument();
      expect(screen.getByText('Blastoise')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('T4.3: Filtrar por Jungle muestra solo cartas de Jungle', async () => {
    render(<UserCollection />);
    
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.queryByText('Cargando tu colección...')).not.toBeInTheDocument();
      expect(screen.queryByText('Cargando expansiones...')).not.toBeInTheDocument();
    }, { timeout: 5000 });

    await new Promise(resolve => setTimeout(resolve, 200));
    
    const expansionSelect = screen.getByRole('combobox');
    
    // Seleccionar Jungle
    fireEvent.change(expansionSelect, { target: { value: '2' } });
    
    await waitFor(() => {
      // Debería mostrar solo Vileplume
      expect(screen.getByText('Vileplume')).toBeInTheDocument();
      expect(screen.queryByText('Charizard')).not.toBeInTheDocument();
      expect(screen.queryByText('Blastoise')).not.toBeInTheDocument();
      
      // ✅ CORREGIR: Buscar específicamente en el contenedor de información
      const collectionInfo = document.querySelector('.collection-info strong');
      expect(collectionInfo.textContent).toBe('Jungle');
      
      // Verificar contador
      const collectionContainer = document.querySelector('.collection-info');
      expect(collectionContainer.textContent).toContain('(1 carta)');
    });
  });

  test('T4.4: Volver a "Todas" muestra todas las cartas', async () => {
    render(<UserCollection />);
    
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.queryByText('Cargando tu colección...')).not.toBeInTheDocument();
      expect(screen.queryByText('Cargando expansiones...')).not.toBeInTheDocument();
    }, { timeout: 5000 });

    await new Promise(resolve => setTimeout(resolve, 200));
    
    const expansionSelect = screen.getByRole('combobox');
    
    // Primero filtrar por Base Set
    fireEvent.change(expansionSelect, { target: { value: '1' } });
    
    await waitFor(() => {
      expect(screen.queryByText('Vileplume')).not.toBeInTheDocument();
      
      // Verificar que solo hay 2 cartas (Base Set)
      const deleteButtons = screen.getAllByText('Eliminar');
      expect(deleteButtons).toHaveLength(2);
    });
    
    // Luego volver a "Todas"
    fireEvent.change(expansionSelect, { target: { value: 'all' } });
    
    await waitFor(() => {
      // ✅ VERIFICAR: Funcionalidad más que texto exacto
      expect(screen.getByText('Charizard')).toBeInTheDocument();
      expect(screen.getByText('Blastoise')).toBeInTheDocument();
      expect(screen.getByText('Vileplume')).toBeInTheDocument();
      
      // Verificar que hay 3 botones de eliminar = 3 cartas
      const deleteButtons = screen.getAllByText('Eliminar');
      expect(deleteButtons).toHaveLength(3);
      
      // Verificar que el select volvió a "all"
      expect(expansionSelect.value).toBe('all');
    });
  });

  test('T4.5: Actualizar favorito mantiene el filtro actual', async () => {
    // ✅ CORREGIR: Agregar mock para patch
    mockedAxios.patch.mockResolvedValue({
      data: { ...mockUserCards[0], is_favorite: true }
    });
    
    render(<UserCollection />);
    
    // ✅ CORREGIR: Agregar espera completa
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.queryByText('Cargando tu colección...')).not.toBeInTheDocument();
      expect(screen.queryByText('Cargando expansiones...')).not.toBeInTheDocument();
    }, { timeout: 5000 });

    await new Promise(resolve => setTimeout(resolve, 200));
    
    const expansionSelect = screen.getByRole('combobox');
    
    // Filtrar por Base Set
    fireEvent.change(expansionSelect, { target: { value: '1' } });
    
    await waitFor(() => {
      expect(screen.queryByText('Vileplume')).not.toBeInTheDocument();
    });
    
    // Hacer favorito Charizard
    const favoriteButtons = screen.getAllByText('Marcar como favorito');
    fireEvent.click(favoriteButtons[0]);
    
    await waitFor(() => {
      // Verificar que el filtro se mantiene
      expect(screen.getByText('Charizard')).toBeInTheDocument();
      expect(screen.getByText('Blastoise')).toBeInTheDocument();
      expect(screen.queryByText('Vileplume')).not.toBeInTheDocument();
    });
    
    expect(mockedAxios.patch).toHaveBeenCalledWith('/api/user-cards/1/', { is_favorite: true });
  });

  test('T4.6: Eliminar carta mantiene el filtro actual', async () => {
    // ✅ CORREGIR: Agregar mock para delete
    mockedAxios.delete.mockResolvedValue({});
    
    render(<UserCollection />);
    
    // ✅ CORREGIR: Agregar espera completa
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.queryByText('Cargando tu colección...')).not.toBeInTheDocument();
      expect(screen.queryByText('Cargando expansiones...')).not.toBeInTheDocument();
    }, { timeout: 5000 });

    await new Promise(resolve => setTimeout(resolve, 200));
    
    const expansionSelect = screen.getByRole('combobox');
    
    // Filtrar por Base Set
    fireEvent.change(expansionSelect, { target: { value: '1' } });
    
    await waitFor(() => {
      expect(screen.getByText('Charizard')).toBeInTheDocument();
      expect(screen.getByText('Blastoise')).toBeInTheDocument();
      expect(screen.queryByText('Vileplume')).not.toBeInTheDocument();
    });
    
    // Eliminar Charizard
    const deleteButtons = screen.getAllByText('Eliminar');
    fireEvent.click(deleteButtons[0]);
    
    await waitFor(() => {
      // Verificar que Charizard se eliminó pero el filtro se mantiene
      expect(screen.queryByText('Charizard')).not.toBeInTheDocument();
      expect(screen.getByText('Blastoise')).toBeInTheDocument();
      expect(screen.queryByText('Vileplume')).not.toBeInTheDocument();
      
      // ✅ CORREGIR: Verificar contador usando contenedor
      const collectionContainer = document.querySelector('.collection-info');
      expect(collectionContainer.textContent).toContain('1');
    });
    
    expect(mockedAxios.delete).toHaveBeenCalledWith('/api/user-cards/1/');
  });

  test('T4.7: Muestra mensaje apropiado cuando no hay cartas de una expansión', async () => {
    // Mock para simular que no hay cartas de una expansión específica
    const cardsWithoutJungle = mockUserCards.filter(card => card.expansion_id !== 2);
    
    mockedAxios.get.mockImplementation((url) => {
      if (url === '/api/user-cards/') {
        return Promise.resolve({ data: cardsWithoutJungle });
      }
      if (url === '/api/user-expansions/') {
        return Promise.resolve({ data: [mockExpansions[0]] }); // Solo Base Set
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });
    
    render(<UserCollection />);
    
    // ✅ CORREGIR: Agregar espera completa
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.queryByText('Cargando tu colección...')).not.toBeInTheDocument();
      expect(screen.queryByText('Cargando expansiones...')).not.toBeInTheDocument();
    }, { timeout: 5000 });

    await new Promise(resolve => setTimeout(resolve, 200));
    
    const expansionSelect = screen.getByRole('combobox');
    
    // Intentar filtrar por una expansión que no aparece en el selector
    fireEvent.change(expansionSelect, { target: { value: '999' } }); // ID inexistente
    
    await waitFor(() => {
      expect(screen.queryByText('Charizard')).not.toBeInTheDocument();
      expect(screen.queryByText('Blastoise')).not.toBeInTheDocument();
      
      // ✅ OPCIONAL: Verificar mensaje de "no cartas"
      const noCardsMessage = document.querySelector('.no-cards');
      expect(noCardsMessage).toBeInTheDocument();
    });
  });

  test('T4.2-DEBUG: Ver qué pasa con el filtrado', async () => {
    render(<UserCollection />);
    
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.queryByText('Cargando tu colección...')).not.toBeInTheDocument();
    });

    console.log('=== VERIFICANDO ESTADO INICIAL ===');
    console.log('Charizard:', screen.queryByText('Charizard') ? 'SÍ' : 'NO');
    console.log('Blastoise:', screen.queryByText('Blastoise') ? 'SÍ' : 'NO');
    console.log('Vileplume:', screen.queryByText('Vileplume') ? 'SÍ' : 'NO');
    
    const select = screen.getByRole('combobox');
    console.log('Select value inicial:', select.value);
    
    fireEvent.change(select, { target: { value: '1' } });
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    console.log('=== DESPUÉS DEL FILTRO ===');
    console.log('Select value final:', select.value);
    console.log('Charizard:', screen.queryByText('Charizard') ? 'SÍ' : 'NO');
    console.log('Blastoise:', screen.queryByText('Blastoise') ? 'SÍ' : 'NO');
    console.log('Vileplume:', screen.queryByText('Vileplume') ? 'SÍ' : 'NO');
    
    const collectionInfo = document.querySelector('.collection-info');
    console.log('Collection info:', collectionInfo?.textContent);
  });
});