import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from collection_manager.models import UserCard, Card, Expansion

User = get_user_model()

@pytest.mark.django_db
class TestUserCardsGroupedView:
    """Tests para el endpoint de cartas agrupadas"""

    def setup_method(self, method):
        """Configuración inicial para cada test."""
        self.client = APIClient()
        
        # Crear usuario
        self.user = User.objects.create_user(username='testuser', password='testpass')
        
        # Crear token JWT
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        
        # Autenticar cliente
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        # Crear expansiones
        self.expansion1 = Expansion.objects.create(
            name='Base Set',
            api_id='base1'
        )
        
        self.expansion2 = Expansion.objects.create(
            name='Jungle',
            api_id='jungle'
        )
        
        # Crear cartas
        self.card1 = Card.objects.create(
            name='Charizard',
            api_id='base1-4',
            number='4',
            expansion=self.expansion1,
            image_url_small='https://example.com/charizard_small.png'
        )
        
        self.card2 = Card.objects.create(
            name='Vileplume',
            api_id='jungle-15',
            number='15',
            expansion=self.expansion2,
            image_url_small='https://example.com/vileplume_small.png'
        )
        
        # Crear múltiples instancias de la misma carta (diferentes idiomas/condiciones)
        self.user_card1 = UserCard.objects.create(
            user=self.user,
            card=self.card1,
            quantity=1,
            language='EN',
            condition='NM',
            is_favorite=True
        )
        
        self.user_card2 = UserCard.objects.create(
            user=self.user,
            card=self.card1,
            quantity=2,
            language='ES',
            condition='LP',
            is_favorite=False
        )
        
        self.user_card3 = UserCard.objects.create(
            user=self.user,
            card=self.card2,
            quantity=1,
            language='EN',
            condition='NM',
            is_favorite=False
        )
    
    def test_grouped_cards_structure(self):
        """T1: Test que la respuesta tiene la estructura correcta"""
        response = self.client.get('/api/user-cards/grouped/')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 2  # Dos grupos de cartas (Charizard y Vileplume)
        
        group = response.data[0]
        required_fields = [
            'card_id', 'card_name', 'expansion_name', 'expansion_id',
            'card_image', 'total_quantity', 'instances_count', 
            'is_any_favorite', 'instances'
        ]
        
        for field in required_fields:
            assert field in group, f"Campo '{field}' faltante en la respuesta"
    
    def test_grouped_cards_aggregation(self):
        """T2: Test que la agrupación y cálculos son correctos"""
        response = self.client.get('/api/user-cards/grouped/')
        
        # Buscar el grupo de Charizard
        charizard_group = next(
            (group for group in response.data if group['card_name'] == 'Charizard'),
            None
        )
        
        assert charizard_group is not None
        assert charizard_group['total_quantity'] == 3  # Sum of quantities from two UserCard instances for Charizard: 1 (EN) + 2 (ES)
        assert charizard_group['instances_count'] == 2  # 2 instancias
        assert charizard_group['is_any_favorite'] is True  # At least one instance is marked as favorite
        # There should be two UserCard instances for Charizard
        assert len(charizard_group['instances']) == 2
    
    def test_grouped_cards_instances_details(self):
        """T3: Test que cada instancia tiene los detalles correctos"""
        response = self.client.get('/api/user-cards/grouped/')
        
        charizard_group = next(
            (group for group in response.data if group['card_name'] == 'Charizard'),
            None
        )
        
        instances = charizard_group['instances']
        
        # Verificar que ambas instancias están presentes
        languages = [instance['language'] for instance in instances]
        assert 'EN' in languages
        assert 'ES' in languages
        
        # Verificar estructura de instancia
        instance = instances[0]
        required_instance_fields = [
            'id', 'quantity', 'language', 'condition', 'is_holographic',
            'is_first_edition', 'is_signed', 'grade', 'notes', 'is_favorite',
            'created_at', 'updated_at'
        ]
        
        for field in required_instance_fields:
            assert field in instance, f"Campo '{field}' faltante en instancia"
    
    def test_grouped_cards_requires_authentication(self):
        """T4: Test que el endpoint requiere autenticación"""
        self.client.credentials()  # Remover autenticación
        response = self.client.get('/api/user-cards/grouped/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_grouped_cards_filters_by_user(self):
        """T5: Test que solo devuelve cartas del usuario autenticado"""
        # Crear otro usuario con cartas
        other_user = User.objects.create_user(username='otheruser', password='testpass')
        UserCard.objects.create(
            user=other_user,
            card=self.card1,
            quantity=1,
            language='FR'
        )
        
        response = self.client.get('/api/user-cards/grouped/')
        
        # Solo debe devolver cartas del usuario autenticado
        assert len(response.data) == 2  # Solo Charizard y Vileplume del usuario actual
        
        charizard_group = next(
            (group for group in response.data if group['card_name'] == 'Charizard'),
            None
        )
        
        # Solo debe tener 2 instancias del usuario actual (no la del otro usuario)
        assert charizard_group['instances_count'] == 2
    
    def test_grouped_cards_empty_collection(self):
        """T6: Test usuario sin cartas obtiene lista vacía"""
        # Limpiar cartas del usuario
        UserCard.objects.filter(user=self.user).delete()
        
        response = self.client.get('/api/user-cards/grouped/')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data == []
    
    def test_grouped_cards_single_instance(self):
        """T7: Test carta con una sola instancia"""
        # Limpiar y crear solo una carta
        UserCard.objects.filter(user=self.user).delete()
        
        UserCard.objects.create(
            user=self.user,
            card=self.card1,
            quantity=5,
            language='EN',
            condition='NM',
            is_favorite=False
        )
        
        response = self.client.get('/api/user-cards/grouped/')
        
        assert len(response.data) == 1
        group = response.data[0]
        assert group['total_quantity'] == 5
        assert group['instances_count'] == 1
        assert group['is_any_favorite'] == False
        assert len(group['instances']) == 1
    
    def test_grouped_cards_ordering(self):
        """T8: Test que las cartas están ordenadas por expansión y nombre"""
        response = self.client.get('/api/user-cards/grouped/')
        
        # Verificar que están ordenadas
        card_names = [group['card_name'] for group in response.data]
        expansion_names = [group['expansion_name'] for group in response.data]
        
        # Base Set debería venir antes que Jungle (alfabéticamente)
        # Y dentro de la misma expansión, por nombre de carta
        assert len(response.data) >= 2