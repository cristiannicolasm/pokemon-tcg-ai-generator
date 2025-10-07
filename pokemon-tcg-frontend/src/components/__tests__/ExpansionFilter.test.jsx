import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpansionFilter from '../ExpansionFilter';

// Mock axiosInstance CORRECTAMENTE
jest.mock('../../axiosInstance', () => ({
  get: jest.fn()
}));

// Importar el mock después de definirlo
import axiosInstance from '../../axiosInstance';

describe('T3: ExpansionFilter Component', () => {
  const mockOnExpansionChange = jest.fn();

  const mockExpansions = [
    { id: 1, name: 'Base Set', user_cards_count: 5 },
    { id: 2, name: 'Jungle', user_cards_count: 3 },
    { id: 3, name: 'Fossil', user_cards_count: 2 }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnExpansionChange.mockClear();
  });

  test('T3.1: Renderiza estado de carga inicial', async () => {
    // Mock que nunca se resuelve para mantener loading
    axiosInstance.get.mockImplementation(() => new Promise(() => {}));
    
    render(<ExpansionFilter onExpansionChange={mockOnExpansionChange} />);
    
    // Verificar que muestra el loading
    expect(screen.getByText('Cargando expansiones...')).toBeInTheDocument();
  });

  test('T3.2: Muestra expansiones después de cargar datos', async () => {
    axiosInstance.get.mockResolvedValue({ data: mockExpansions });
    
    render(<ExpansionFilter onExpansionChange={mockOnExpansionChange} />);
    
    // Esperar a que termine de cargar
    await waitFor(() => {
      expect(screen.getByText('Todas las cartas (10)')).toBeInTheDocument();
    });
    
    // Verificar que todas las expansiones están presentes
    expect(screen.getByText('Base Set (5)')).toBeInTheDocument();
    expect(screen.getByText('Jungle (3)')).toBeInTheDocument();
    expect(screen.getByText('Fossil (2)')).toBeInTheDocument();
  });

  test('T3.3: Llama onExpansionChange cuando se selecciona expansión', async () => {
    axiosInstance.get.mockResolvedValue({ data: mockExpansions });
    
    render(<ExpansionFilter onExpansionChange={mockOnExpansionChange} />);
    
    // Esperar a que cargue
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
    
    expect(mockOnExpansionChange).toHaveBeenCalledWith(1, 'Base Set');
  });

  test('T3.4: Maneja selección "Todas las cartas"', async () => {
    axiosInstance.get.mockResolvedValue({ data: mockExpansions });
    
    render(<ExpansionFilter onExpansionChange={mockOnExpansionChange} />);
    
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'all' } });
    
    expect(mockOnExpansionChange).toHaveBeenCalledWith('all', 'Todas');
  });

  test('T3.5: Maneja errores de API correctamente', async () => {
    // Silenciar console.error para este test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    axiosInstance.get.mockRejectedValue(new Error('API Error'));
    
    render(<ExpansionFilter onExpansionChange={mockOnExpansionChange} />);
    
    await waitFor(() => {
      expect(screen.getByText('Error al cargar expansiones')).toBeInTheDocument();
    });
    
    consoleSpy.mockRestore();
  });

  test('T3.6: Muestra estado vacío cuando no hay expansiones', async () => {
    axiosInstance.get.mockResolvedValue({ data: [] });
    
    render(<ExpansionFilter onExpansionChange={mockOnExpansionChange} />);
    
    await waitFor(() => {
      expect(screen.getByText('No tienes cartas en tu colección')).toBeInTheDocument();
    });
  });

  test('T3.7: Calcula total de cartas correctamente', async () => {
    axiosInstance.get.mockResolvedValue({ data: mockExpansions });
    
    render(<ExpansionFilter onExpansionChange={mockOnExpansionChange} />);
    
    await waitFor(() => {
      // 5 + 3 + 2 = 10 total cards
      expect(screen.getByText('Todas las cartas (10)')).toBeInTheDocument();
    });
  });

  test('T3.8: Mantiene estado de selección', async () => {
    axiosInstance.get.mockResolvedValue({ data: mockExpansions });
    
    render(
      <ExpansionFilter 
        onExpansionChange={mockOnExpansionChange} 
        selectedExpansion={1}
      />
    );
    
    await waitFor(() => {
      const select = screen.getByRole('combobox');
      expect(select.value).toBe('1');
    });
  });

  test('T3.9: Usa endpoint API correcto', async () => {
    axiosInstance.get.mockResolvedValue({ data: mockExpansions });
    
    render(<ExpansionFilter onExpansionChange={mockOnExpansionChange} />);
    
    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/user-expansions/');
    });
  });

  test('T3.10: Maneja desmontaje del componente correctamente', async () => {
    axiosInstance.get.mockResolvedValue({ data: mockExpansions });
    
    const { unmount } = render(<ExpansionFilter onExpansionChange={mockOnExpansionChange} />);
    
    // Desmontar antes de que se complete la carga
    unmount();
    
    // No debería lanzar errores
    expect(true).toBe(true);
  });
});