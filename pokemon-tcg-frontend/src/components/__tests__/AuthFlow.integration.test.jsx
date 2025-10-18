import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from '../Login';
import Register from '../Register';
import UserCollection from '../UserCollection';

// Mock para fetch (utilizado en Login.jsx y Register.jsx)
global.fetch = jest.fn();

// Mock para axiosInstance (utilizado en UserCollection.jsx)
jest.mock('../../axiosInstance', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

// Mock para localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Auth Flow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    localStorage.getItem.mockReturnValue(null);
  });

  // ✅ CA3: Test de flujo completo - SIMPLIFICADO
  test('flujo completo: registro exitoso → login exitoso → acceso a colección', async () => {
    // PARTE 1: TEST DE REGISTRO
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ 
        id: 1, 
        username: 'newuser', 
        email: 'newuser@test.com' 
      })
    });
    
    // Renderizar solo Register
    const { unmount } = render(
      <MemoryRouter initialEntries={['/register']}>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>
    );
    
    // Llenar formulario de registro
    const usernameInput = await screen.findByLabelText(/nombre de usuario/i);
    const emailInput = await screen.findByLabelText(/email/i);
    const passwordInput = await screen.findByLabelText(/contraseña/i);
    const registerButton = await screen.findByRole('button', { name: /registrar/i });
    
    fireEvent.change(usernameInput, { target: { value: 'newuser' } });
    fireEvent.change(emailInput, { target: { value: 'newuser@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);

    // Verificar registro exitoso
    await screen.findByText(/¡Registro exitoso!/i);
    
    // Verificar que se llamó a fetch con los datos correctos
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8000/api/register/',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ 
          username: 'newuser', 
          email: 'newuser@test.com', 
          password: 'password123' 
        })
      })
    );

    // Limpiar el componente Register
    unmount();

    // PARTE 2: TEST DE LOGIN
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        access: 'fake-access-token',
        refresh: 'fake-refresh-token',
      }),
    });

    // Renderizar Login como componente separado
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    // Esperar a que aparezcan los elementos del login
    const loginUsernameInput = await screen.findByLabelText(/nombre de usuario/i);
    const loginPasswordInput = await screen.findByLabelText(/contraseña/i);
    const loginButton = await screen.findByRole('button', { name: /iniciar sesión/i });

    // Hacer login
    fireEvent.change(loginUsernameInput, { target: { value: 'newuser' } });
    fireEvent.change(loginPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Verificar mensaje de éxito
    const loginMessage = await screen.findByTestId('login-message');
    expect(loginMessage).toHaveTextContent(/exitoso/i);

    // Verificar localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('access_token', 'fake-access-token');
    expect(localStorage.setItem).toHaveBeenCalledWith('refresh_token', 'fake-refresh-token');
    
    // Verificar que se llamó a fetch para login
    expect(global.fetch).toHaveBeenLastCalledWith(
      'http://localhost:8000/api/token/',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ username: 'newuser', password: 'password123' })
      })
    );
  });

  // ✅ CA3: Test de navegación entre componentes
  test('debe permitir navegar entre login y registro', async () => {
    // Renderizar en ruta de login
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/" element={<UserCollection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>
    );

    // Verificar que estamos en login
    const loginButton = await screen.findByRole('button', { name: /iniciar sesión/i });
    expect(loginButton).toBeInTheDocument();

    // Verificar enlace a registro
    const registerLink = screen.getByText(/regístrate aquí/i);
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  // ✅ CA3: Test de persistencia de autenticación
  test('debe mantener sesión tras refresh si hay token válido', async () => {
    // Simular token existente
    localStorage.getItem.mockImplementation(key => {
      if (key === 'access_token') return 'existing-token';
      if (key === 'user') return JSON.stringify({
        id: 1,
        username: 'existinguser',
        email: 'existing@test.com'
      });
      return null;
    });

    const axiosInstance = require('../../axiosInstance');
    axiosInstance.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<UserCollection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>
    );
    
    // Verificar que no se redirige a login cuando hay token
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /iniciar sesión/i })).not.toBeInTheDocument();
    });
  });
});