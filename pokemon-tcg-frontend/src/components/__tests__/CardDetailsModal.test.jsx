import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardDetailsModal from '../CardDetailsModal';
import axiosInstance from '../../axiosInstance';

// Mock axiosInstance
jest.mock('../../axiosInstance');
const mockedAxios = axiosInstance;

describe('CardDetailsModal Tests', () => {
  const mockCardGroup = {
    card_id: 1,
    card_name: 'Charizard',
    expansion_name: 'Base Set',
    card_image: 'https://example.com/charizard.png',
    total_quantity: 3,
    instances_count: 2,
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
        is_first_edition: true,
        is_signed: false,
        grade: 'PSA 9',
        notes: null,
        is_favorite: false
      }
    ]
  };

  const mockOnClose = jest.fn();
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('T1: Renderiza información del grupo correctamente', () => {
    render(
      <CardDetailsModal 
        cardGroup={mockCardGroup}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    );
    
    // Verificar información del grupo usando texto más específico
    expect(screen.getByText('Charizard')).toBeInTheDocument();
    expect(screen.getByText('Base Set')).toBeInTheDocument();
    expect(screen.getByText('Total en colección:')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument(); // Total en colección
    expect(screen.getByText('Instancias diferentes:')).toBeInTheDocument();
    
    // ✅ CORREGIDO: Buscar de forma más específica
    expect(screen.getByText(/Instancias diferentes:/)).toBeInTheDocument();
    const instancesText = screen.getByText(/Instancias diferentes:/).parentElement;
    expect(instancesText).toHaveTextContent('Instancias diferentes: 2');
  });

  test('T2: Muestra todas las instancias correctamente', () => {
    render(
      <CardDetailsModal 
        cardGroup={mockCardGroup}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    );
    
    // Verificar que muestra ambas instancias
    expect(screen.getByText('Instancia #1')).toBeInTheDocument();
    expect(screen.getByText('Instancia #2')).toBeInTheDocument();
    
    // Verificar detalles de primera instancia
    expect(screen.getByText('Inglés')).toBeInTheDocument();
    expect(screen.getByText('Near Mint (NM)')).toBeInTheDocument();
    expect(screen.getByText('Beautiful card')).toBeInTheDocument();
    
    // Verificar detalles de segunda instancia
    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.getByText('Lightly Played (LP)')).toBeInTheDocument();
    expect(screen.getByText('PSA 9')).toBeInTheDocument();
  });

  test('T3: Cerrar modal funciona', () => {
    render(
      <CardDetailsModal 
        cardGroup={mockCardGroup}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    );
    
    // Hacer clic en cerrar (X)
    fireEvent.click(screen.getByText('×'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    
    // Hacer clic en botón "Cerrar"
    fireEvent.click(screen.getByText('Cerrar'));
    expect(mockOnClose).toHaveBeenCalledTimes(2);
  });

  test('T4: Eliminar instancia funciona correctamente', async () => {
    // Mock confirmación
    window.confirm = jest.fn(() => true);
    mockedAxios.delete.mockResolvedValue({});
    
    render(
      <CardDetailsModal 
        cardGroup={mockCardGroup}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    );
    
    // Hacer clic en eliminar primera instancia
    const deleteButtons = screen.getAllByTitle('Eliminar instancia');
    fireEvent.click(deleteButtons[0]);
    
    // Verificar confirmación
    expect(window.confirm).toHaveBeenCalledWith(
      '¿Estás seguro de que quieres eliminar esta instancia?'
    );
    
    // Verificar llamada a API
    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledWith('/api/user-cards/1/');
      expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    });
  });

  test('T5: Cancelar eliminación no hace nada', async () => {
    // Mock confirmación cancelada
    window.confirm = jest.fn(() => false);
    
    render(
      <CardDetailsModal 
        cardGroup={mockCardGroup}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    );
    
    const deleteButtons = screen.getAllByTitle('Eliminar instancia');
    fireEvent.click(deleteButtons[0]);
    
    // No debería llamar a la API
    expect(mockedAxios.delete).not.toHaveBeenCalled();
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });

  test('T6: Toggle favorito funciona correctamente', async () => {
    mockedAxios.patch.mockResolvedValue({});
    
    render(
      <CardDetailsModal 
        cardGroup={mockCardGroup}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    );
    
    // Hacer clic en favorito de segunda instancia (no favorita)
    const favoriteButtons = screen.getAllByTitle(/Marcar como favorito|Quitar de favoritos/);
    fireEvent.click(favoriteButtons[1]); // Segunda instancia
    
    await waitFor(() => {
      expect(mockedAxios.patch).toHaveBeenCalledWith('/api/user-cards/2/', {
        is_favorite: true
      });
      expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    });
  });

  test('T7: Eliminar última instancia cierra modal', async () => {
    // Mock para solo una instancia
    const singleInstanceGroup = {
      ...mockCardGroup,
      instances_count: 1,
      instances: [mockCardGroup.instances[0]]
    };
    
    window.confirm = jest.fn(() => true);
    mockedAxios.delete.mockResolvedValue({});
    
    render(
      <CardDetailsModal 
        cardGroup={singleInstanceGroup}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    );
    
    const deleteButton = screen.getByTitle('Eliminar instancia');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  test('T8: Maneja errores de API correctamente', async () => {
    // Mock alert
    window.alert = jest.fn();
    
    mockedAxios.delete.mockRejectedValue(new Error('API Error'));
    window.confirm = jest.fn(() => true);
    
    render(
      <CardDetailsModal 
        cardGroup={mockCardGroup}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    );
    
    const deleteButtons = screen.getAllByTitle('Eliminar instancia');
    fireEvent.click(deleteButtons[0]);
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Error al eliminar la instancia');
    });
  });
});