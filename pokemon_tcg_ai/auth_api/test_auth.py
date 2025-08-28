# pokemon_tcg_ai/auth_api/tests.py
import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

@pytest.mark.django_db
class TestAuthentication:
    """Clase para probar los endpoints de autenticación y protección."""

    def setup_method(self, method):
        """Método que se ejecuta antes de cada prueba para configurar el cliente y el usuario."""
        self.client = APIClient()
        self.username = 'testuser'
        self.password = 'testpassword123'
        User = get_user_model()
        self.user = User.objects.create_user(username=self.username, password=self.password)

    def test_obtain_token_with_valid_credentials(self):
        """Prueba que un usuario puede obtener un token con credenciales válidas (CA2)."""
        # Se usa la URL directa en lugar de reverse() para mayor robustez
        response = self.client.post('/api/token/', {'username': self.username, 'password': self.password})
        assert response.status_code == 200
        assert 'access' in response.data
        assert 'refresh' in response.data

    def test_obtain_token_with_invalid_credentials(self):
        """Prueba que las credenciales inválidas no permiten obtener un token (CA2)."""
        response = self.client.post('/api/token/', {'username': 'wronguser', 'password': 'wrongpassword'})
        assert response.status_code == 401

    def test_access_protected_endpoint_without_token(self):
        """Prueba que un endpoint protegido devuelve 401 si no hay token (CA3)."""
        # Se usa la URL directa en lugar de reverse()
        response = self.client.get('/api/expansions/')
        assert response.status_code == 401

    def test_access_protected_endpoint_with_valid_token(self):
        """Prueba que un endpoint protegido puede ser accedido con un token válido (CA3)."""
        # Genera un token de acceso para el usuario
        refresh = RefreshToken.for_user(self.user)
        access_token = str(refresh.access_token)

        # Realiza la petición con el token en el encabezado
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        # Se usa la URL directa en lugar de reverse()
        response = self.client.get('/api/expansions/')
        assert response.status_code == 200

    def test_access_protected_endpoint_with_invalid_token(self):
        """Prueba que un endpoint protegido devuelve 401 con un token inválido (CA3)."""
        self.client.credentials(HTTP_AUTHORIZATION='Bearer invalid_token_string')
        # Se usa la URL directa en lugar de reverse()
        response = self.client.get('/api/expansions/')
        assert response.status_code == 401
