import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from collection_manager.models import Card, Expansion, UserCard

User = get_user_model()

@pytest.mark.django_db
def test_minimal_user_expansions():
    """Test mínimo para verificar que el endpoint funciona"""
    # Crear usuario
    user = User.objects.create_user(username='test', password='pass')
    refresh = RefreshToken.for_user(user)
    token = str(refresh.access_token)
    
    # Request sin datos - debería funcionar
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
    response = client.get('/api/user-expansions/')
    
    assert response.status_code == 200
    assert response.data == []