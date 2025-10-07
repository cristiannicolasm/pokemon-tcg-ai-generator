import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from collection_manager.models import Card, Expansion, UserCard

User = get_user_model()

@pytest.mark.django_db
class TestUserExpansionsView:
    """Tests unitarios para UserExpansionsView"""

    def setup_method(self, method):
        """Configuración inicial para cada test."""
        self.client = APIClient()
        
        # Crear usuario de prueba
        self.user = User.objects.create_user(
            username='testuser', 
            password='testpass123'
        )
        
        # Crear segundo usuario para verificar aislamiento
        self.other_user = User.objects.create_user(
            username='otheruser',
            password='otherpass123'
        )
        
        # Generar tokens JWT
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        
        other_refresh = RefreshToken.for_user(self.other_user)
        self.other_access_token = str(other_refresh.access_token)
        
        # Crear expansiones de prueba
        self.expansion1 = Expansion.objects.create(
            api_id='base1',
            name='Base Set',
            series='Base'
        )
        
        self.expansion2 = Expansion.objects.create(
            api_id='jungle',
            name='Jungle',
            series='Base'
        )
        
        self.expansion3 = Expansion.objects.create(
            api_id='fossil',
            name='Fossil',
            series='Base'
        )
        
        # Crear cartas de prueba
        self.card1 = Card.objects.create(
            api_id='base1-4',
            name='Charizard',
            expansion=self.expansion1,
            number='4/102',
            rarity='Holo Rare'
        )
        
        self.card2 = Card.objects.create(
            api_id='base1-2',
            name='Blastoise',
            expansion=self.expansion1,
            number='2/102',
            rarity='Holo Rare'
        )
        
        self.card3 = Card.objects.create(
            api_id='jungle-15',
            name='Vileplume',
            expansion=self.expansion2,
            number='15/64',
            rarity='Holo Rare'
        )
        
        self.card4 = Card.objects.create(
            api_id='fossil-1',
            name='Aerodactyl',
            expansion=self.expansion3,
            number='1/62',
            rarity='Holo Rare'
        )
        
        # Crear cartas del usuario usando CHOICES VÁLIDOS
        UserCard.objects.create(
            user=self.user,
            card=self.card1,
            quantity=1,
            language='EN',      # ← CHOICE VÁLIDO
            condition='NM'      # ← CHOICE VÁLIDO
        )
        
        UserCard.objects.create(
            user=self.user,
            card=self.card2,
            quantity=2,
            language='EN',
            condition='NM'
        )
        
        UserCard.objects.create(
            user=self.user,
            card=self.card3,
            quantity=1,
            language='ES',      # ← CHOICE VÁLIDO
            condition='LP'      # ← CHOICE VÁLIDO
        )
        
        # Crear cartas del otro usuario (solo Fossil)
        UserCard.objects.create(
            user=self.other_user,
            card=self.card4,
            quantity=1,
            language='EN',
            condition='NM'
        )
        
    def test_get_user_expansions_success(self):
        """T1.1: Usuario obtiene solo sus expansiones con cartas"""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response = self.client.get('/api/user-expansions/')
        
        assert response.status_code == 200
        assert len(response.data) == 2  # Solo Base Set y Jungle
        
        # Verificar que están ordenadas y contienen los datos correctos
        expansion_names = [exp['name'] for exp in response.data]
        assert 'Base Set' in expansion_names
        assert 'Jungle' in expansion_names
        assert 'Fossil' not in expansion_names  # No debe aparecer
        
        # Verificar conteos de cartas
        base_expansion = next(exp for exp in response.data if exp['name'] == 'Base Set')
        jungle_expansion = next(exp for exp in response.data if exp['name'] == 'Jungle')
        
        assert base_expansion['user_cards_count'] == 2  # Charizard + Blastoise
        assert jungle_expansion['user_cards_count'] == 1  # Vileplume
        
    def test_get_user_expansions_with_correct_structure(self):
        """T1.2: Respuesta tiene la estructura correcta"""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response = self.client.get('/api/user-expansions/')
        
        assert response.status_code == 200
        
        if response.data:
            expansion = response.data[0]
            required_fields = ['id', 'api_id', 'name', 'series', 'user_cards_count']
            
            for field in required_fields:
                assert field in expansion, f"Campo '{field}' faltante en la respuesta"
                
            # Verificar tipos de datos
            assert isinstance(expansion['id'], int)
            assert isinstance(expansion['user_cards_count'], int)
            assert expansion['user_cards_count'] > 0
        
    def test_get_user_expansions_empty_collection(self):
        """T1.3: Usuario sin cartas obtiene lista vacía"""
        empty_user = User.objects.create_user(username='emptyuser', password='pass')
        refresh = RefreshToken.for_user(empty_user)
        empty_token = str(refresh.access_token)
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {empty_token}')
        response = self.client.get('/api/user-expansions/')
        
        assert response.status_code == 200
        assert response.data == []
        
    def test_get_user_expansions_unauthorized(self):
        """T1.4: Sin token devuelve 401"""
        response = self.client.get('/api/user-expansions/')
        assert response.status_code == 401
        
    def test_get_user_expansions_invalid_token(self):
        """T1.5: Token inválido devuelve 401"""
        self.client.credentials(HTTP_AUTHORIZATION='Bearer invalid_token')
        response = self.client.get('/api/user-expansions/')
        assert response.status_code == 401
        
    def test_user_isolation(self):
        """T1.6: Usuarios solo ven sus propias expansiones"""
        # Usuario 1 ve Base Set y Jungle
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response1 = self.client.get('/api/user-expansions/')
        
        expansion_names_user1 = [exp['name'] for exp in response1.data]
        assert 'Base Set' in expansion_names_user1
        assert 'Jungle' in expansion_names_user1
        assert 'Fossil' not in expansion_names_user1
        
        # Usuario 2 ve solo Fossil
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.other_access_token}')
        response2 = self.client.get('/api/user-expansions/')
        
        expansion_names_user2 = [exp['name'] for exp in response2.data]
        assert 'Fossil' in expansion_names_user2
        assert 'Base Set' not in expansion_names_user2
        assert 'Jungle' not in expansion_names_user2
        
    def test_expansion_count_accuracy(self):
        """T1.7: Conteo de cartas es exacto"""
        # Agregar más cartas del mismo usuario a Base Set
        card5 = Card.objects.create(
            api_id='base1-15',
            name='Venusaur',
            expansion=self.expansion1,
            number='15/102',
            rarity='Holo Rare'
        )
        
        UserCard.objects.create(
            user=self.user,
            card=card5,
            quantity=3,  # 3 copias de la misma carta
            language='EN',   # ← CHOICE VÁLIDO
            condition='MP'   # ← CHOICE VÁLIDO
        )
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response = self.client.get('/api/user-expansions/')
        
        base_expansion = next(exp for exp in response.data if exp['name'] == 'Base Set')
        # Debería contar 3 UserCard entries: Charizard, Blastoise, Venusaur
        assert base_expansion['user_cards_count'] == 3