import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';

// Mock de fetch para simular las llamadas API
global.fetch = jest.fn();

// Mock de console.error para suprimir mensajes en los tests
console.error = jest.fn();

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

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ CA2: Test de renderizado
  describe('Renderizado del componente', () => {
    test('debe renderizar todos los elementos del formulario', () => {
      renderWithRouter(<Register />);
      
      expect(screen.getByLabelText(/nombre de usuario/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
      
      // Verificar link a login
      expect(screen.getByText(/ya tienes una cuenta/i)).toBeInTheDocument();
    });

    test('debe mostrar campos vacíos inicialmente', () => {
      renderWithRouter(<Register />);
      
      const usernameInput = screen.getByLabelText(/nombre de usuario/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      
      expect(usernameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(passwordInput.value).toBe('');
    });
  });

  // ✅ CA2: Test de validación
  describe('Validación de formulario', () => {
    test('debe permitir enviar formulario con campos llenos', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ 
          id: 1, 
          username: 'testuser', 
          email: 'test@test.com' 
        })
      });

      renderWithRouter(<Register />);
      
      const usernameInput = screen.getByLabelText(/nombre de usuario/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      const submitButton = screen.getByRole('button', { name: /registrar/i });
      
      // Llenar formulario
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      // Verificar que se llamó a fetch
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });
  });

  // ✅ CA2: Test de registro exitoso
  describe('Registro exitoso', () => {
    test('debe registrar usuario correctamente con datos válidos', async () => {
      // Mock respuesta exitosa
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          id: 1,
          username: 'testuser',
          email: 'test@test.com'
        })
      });

      renderWithRouter(<Register />);
      
      const usernameInput = screen.getByLabelText(/nombre de usuario/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      const submitButton = screen.getByRole('button', { name: /registrar/i });
      
      // Llenar formulario
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      // Verificar llamada a fetch
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          'http://localhost:8000/api/register/',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
              username: 'testuser',
              email: 'test@test.com',
              password: 'password123'
            })
          })
        );
      });
      
      // Verificar mensaje de éxito
      await waitFor(() => {
        expect(screen.getByText(/¡Registro exitoso!/i)).toBeInTheDocument();
      });
    });

    test('debe mostrar estado de loading durante el registro', async () => {
      // Mock con delay para poder capturar el estado de loading
      global.fetch.mockImplementationOnce(() => 
        new Promise(resolve => 
          setTimeout(() => resolve({
            ok: true,
            json: () => Promise.resolve({
              id: 1,
              username: 'testuser',
              email: 'test@test.com'
            })
          }), 100)
        )
      );

      renderWithRouter(<Register />);
      
      const usernameInput = screen.getByLabelText(/nombre de usuario/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      const submitButton = screen.getByRole('button', { name: /registrar/i });
      
      // Llenar formulario
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      // Verificar que muestra "Registrando..."
      expect(screen.getByText(/registrando/i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
      
      // Esperar a que termine
      await waitFor(() => {
        expect(screen.queryByText(/registrando/i)).not.toBeInTheDocument();
        expect(screen.getByText(/¡Registro exitoso!/i)).toBeInTheDocument();
      });
    });
  });

  // ✅ CA2: Test de manejo de errores
  describe('Manejo de errores', () => {
    test('debe mostrar error cuando el usuario ya existe', async () => {
      // Mock error de usuario existente
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ 
          username: ['Ya existe un usuario con ese nombre.'] 
        })
      });

      renderWithRouter(<Register />);
      
      const usernameInput = screen.getByLabelText(/nombre de usuario/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      const submitButton = screen.getByRole('button', { name: /registrar/i });
      
      fireEvent.change(usernameInput, { target: { value: 'existinguser' } });
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      // Verificar mensaje de error
      await waitFor(() => {
        expect(screen.getByText(/Error:/i)).toBeInTheDocument();
      });
    });

    test('debe mostrar error de conexión', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network Error'));

      renderWithRouter(<Register />);
      
      const usernameInput = screen.getByLabelText(/nombre de usuario/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      const submitButton = screen.getByRole('button', { name: /registrar/i });
      
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Error de red/i)).toBeInTheDocument();
      });
    });
  });
});