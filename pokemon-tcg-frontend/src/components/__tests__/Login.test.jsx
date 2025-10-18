import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';

// Mock de fetch para simular las llamadas API
global.fetch = jest.fn();

// Mock de console.error para suprimir mensajes en los tests
console.error = jest.fn();

// Mock de onLoginSuccess para verificar llamadas
const mockOnLoginSuccess = jest.fn();

// Mock de localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
  writable: true
});

// Wrapper para Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ CA1: Test de renderizado
  describe('Renderizado del componente', () => {
    test('debe renderizar todos los elementos del formulario', () => {
      renderWithRouter(<Login />);

      expect(screen.getByLabelText(/nombre de usuario/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    test('debe mostrar campos vacíos inicialmente', () => {
      renderWithRouter(<Login />);

      const usernameInput = screen.getByLabelText(/nombre de usuario/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);

      expect(usernameInput.value).toBe('');
      expect(passwordInput.value).toBe('');
    });
  });

  // ✅ CA1: Test de validación
  describe('Validación de formulario', () => {
    test('debe mostrar error cuando se envía formulario vacío', async () => {
      renderWithRouter(<Login />);
      
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      fireEvent.click(submitButton);
      
      // Verificar mensaje de error por campos vacíos
      await waitFor(() => {
        expect(screen.getByText(/el nombre de usuario y la contraseña son obligatorios/i)).toBeInTheDocument();
      });
      
      // Verificar que no se llamó a fetch
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test('debe validar campos requeridos', async () => {
      renderWithRouter(<Login />);
      
      const usernameInput = screen.getByLabelText(/nombre de usuario/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      
      // Probar con solo username
      fireEvent.change(usernameInput, { target: { value: 'usuario' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/el nombre de usuario y la contraseña son obligatorios/i)).toBeInTheDocument();
      });
      
      // Probar con solo contraseña
      fireEvent.change(usernameInput, { target: { value: '' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/el nombre de usuario y la contraseña son obligatorios/i)).toBeInTheDocument();
      });
    });
  });

  // ✅ CA1: Test de envío exitoso
  describe('Login exitoso', () => {
    test('debe hacer login correctamente con credenciales válidas', async () => {
      // Mock respuesta exitosa de fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          access: 'fake-access-token',
          refresh: 'fake-refresh-token',
        }),
      });

      renderWithRouter(<Login onLoginSuccess={mockOnLoginSuccess} />);
      
      const usernameInput = screen.getByLabelText(/nombre de usuario/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      
      // Llenar formulario
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      // Verificar llamada a fetch
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: 'testuser', password: 'password123' }),
        });
      });
      
      // Verificar localStorage
      await waitFor(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith('access_token', 'fake-access-token');
        expect(localStorage.setItem).toHaveBeenCalledWith('refresh_token', 'fake-refresh-token');
      });
      
      // Verificar callback
      await waitFor(() => {
        expect(mockOnLoginSuccess).toHaveBeenCalledWith('fake-access-token');
      });
      
      // Verificar mensaje de éxito
      await waitFor(() => {
        const messageElement = screen.getByTestId("login-message");
        expect(messageElement).toHaveTextContent(/exitoso/i);
      });
    });

    test('debe mostrar estado de loading durante el login', async () => {
      // Mock con delay para poder capturar el estado de loading
      global.fetch.mockImplementationOnce(() => 
        new Promise(resolve => 
          setTimeout(() => resolve({
            ok: true,
            json: () => Promise.resolve({
              access: 'fake-access-token',
              refresh: 'fake-refresh-token',
            }),
          }), 100)
        )
      );

      renderWithRouter(<Login />);
      
      const usernameInput = screen.getByLabelText(/nombre de usuario/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      // Verificar que muestra "Iniciando sesión..."
      expect(screen.getByText(/iniciando sesión/i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
      
      // Esperar a que termine
      await waitFor(() => {
        expect(screen.queryByText(/iniciando sesión/i)).not.toBeInTheDocument();
      });
    });
  });

  // ✅ CA1: Test de manejo de errores
  describe('Manejo de errores', () => {
    test('debe mostrar error con credenciales inválidas', async () => {
      // Mock error de credenciales
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ detail: 'Credenciales incorrectas' }),
      });

      renderWithRouter(<Login />);
      
      const usernameInput = screen.getByLabelText(/nombre de usuario/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      
      fireEvent.change(usernameInput, { target: { value: 'wrong' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);
      
      // Verificar mensaje de error
      await waitFor(() => {
        expect(screen.getByText(/Error: Credenciales incorrectas/i)).toBeInTheDocument();
      });
    });

    test('debe mostrar error de conexión', async () => {
      // Mock error de red
      global.fetch.mockRejectedValueOnce(new Error('Network Error'));

      renderWithRouter(<Login />);
      
      const usernameInput = screen.getByLabelText(/nombre de usuario/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      
      fireEvent.change(usernameInput, { target: { value: 'test' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      // Verificar mensaje de error de conexión
      await waitFor(() => {
        expect(screen.getByText(/Error de red al intentar conectar con el servidor/i)).toBeInTheDocument();
      });
    });
  });
});