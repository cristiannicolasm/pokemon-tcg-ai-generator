import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken 
from collection_manager.models import Card, Expansion, UserCard 

User = get_user_model()

@pytest.mark.django_db # ← Cada test usa BD limpia
class TestUserCardIntegration:
    """Tests de integración completos para endpoints de colección del usuario."""

    def setup_method(self, method):
        """Configuración inicial para cada test."""
        self.client = APIClient()
        
        # Crear usuario de prueba
        self.user = User.objects.create_user(
            username='testuser', 
            password='testpass123'
        )
        
        # Crear segundo usuario para tests de autorización
        self.other_user = User.objects.create_user(
            username='otheruser',
            password='otherpass123'
        )
        
        # Generar token JWT
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        
        # Crear expansión de prueba
        self.expansion = Expansion.objects.create(
            api_id='test-expansion',
            name='Test Expansion'
        )
        
        # Crear cartas de prueba
        self.card1 = Card.objects.create(
            api_id='test-card-1',
            name='Test Card 1',
            expansion=self.expansion,
            number='001',
            rarity='Common'
        )
        
        self.card2 = Card.objects.create(
            api_id='test-card-2',
            name='Test Card 2',
            expansion=self.expansion,
            number='002',
            rarity='Rare'
        )
        
    # ==================== CA1: Tests de Listado de Colección ====================
    
    def test_list_user_cards_empty_collection(self):
        """CA1.1: Usuario autenticado sin cartas recibe lista vacía."""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response = self.client.get('/api/user-cards/')
        
        assert response.status_code == 200
        assert response.data == []
        
    def test_list_user_cards_with_data(self):
        """CA1.2: Usuario autenticado con cartas recibe todas sus cartas."""
        # Crear cartas del usuario
        UserCard.objects.create(user=self.user, card=self.card1, quantity=2, language='en')
        UserCard.objects.create(user=self.user, card=self.card2, quantity=1, is_favorite=True)
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response = self.client.get('/api/user-cards/')
        
        assert response.status_code == 200
        assert len(response.data) == 2
        
        # Verificar que incluye información de las cartas
        card_names = [item['card_name'] for item in response.data]
        assert 'Test Card 1' in card_names
        assert 'Test Card 2' in card_names
        
    def test_list_user_cards_unauthorized(self):
        """CA1.3: Usuario no autenticado recibe error 401."""
        response = self.client.get('/api/user-cards/')
        assert response.status_code == 401
        
    # ==================== CA2: Tests de Añadir Carta ====================
    
    def test_add_card_to_collection_success(self):
        """CA2.1: Usuario autenticado añade carta con datos válidos."""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        data = {
            'card': self.card1.id,
            'quantity': 2,
            'language': 'EN',
            'condition': 'NM',
            'is_holographic': True,
            'is_first_edition': False,
            'notes': 'Test card'
        }
        
        response = self.client.post('/api/user-cards/add/', data)
        
        assert response.status_code == 201
        assert response.data['quantity'] == 2
        assert response.data['language'] == 'EN'
        assert response.data['condition'] == 'NM'
        assert response.data['is_holographic'] == True
        
        # Verificar que se creó en la BD
        user_card = UserCard.objects.get(user=self.user, card=self.card1)
        assert user_card.quantity == 2
        assert user_card.notes == 'Test card'
        
    def test_add_card_invalid_data(self):
        """CA2.2: Datos inválidos devuelven error 400."""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        data = {
            'card': 999999,  # Carta inexistente
            'quantity': -1,   # Cantidad inválida
        }
        
        response = self.client.post('/api/user-cards/add/', data)
        assert response.status_code == 400
        
    def test_add_card_unauthorized(self):
        """CA2.3: Usuario no autenticado recibe error 401."""
        data = {
            'card': self.card1.id,
            'quantity': 1
        }
        
        response = self.client.post('/api/user-cards/add/', data)
        assert response.status_code == 401
        
    # ==================== CA3: Tests de Actualización de Carta ====================
    
    def test_update_user_card_success(self):
        """CA3.1: Usuario actualiza su propia carta exitosamente."""
        # Crear carta del usuario
        user_card = UserCard.objects.create(
            user=self.user,
            card=self.card1,
            quantity=1,
            language='en',
            condition='LP'
        )
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        data = {
            'quantity': 3,
            'condition': 'NM',
            'notes': 'Updated notes'
        }
        
        response = self.client.patch(f'/api/user-cards/{user_card.id}/', data)
        
        assert response.status_code == 200
        assert response.data['quantity'] == 3
        assert response.data['condition'] == 'NM'
        assert response.data['notes'] == 'Updated notes'
        
        # Verificar cambios en BD
        user_card.refresh_from_db()
        assert user_card.quantity == 3
        assert user_card.condition == 'NM'
        assert user_card.notes == 'Updated notes'
        
    def test_update_other_user_card_forbidden(self):
        """CA3.2: Usuario no puede actualizar carta de otro usuario."""
        # Crear carta del otro usuario
        other_card = UserCard.objects.create(
            user=self.other_user,
            card=self.card1,
            quantity=1
        )
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        data = {'quantity': 999}
        response = self.client.patch(f'/api/user-cards/{other_card.id}/', data)
        
        assert response.status_code == 404
        
    def test_update_card_unauthorized(self):
        """CA3.3: Usuario no autenticado no puede actualizar cartas."""
        user_card = UserCard.objects.create(
            user=self.user,
            card=self.card1,
            quantity=1
        )
        
        data = {'quantity': 5}
        response = self.client.patch(f'/api/user-cards/{user_card.id}/', data)
        
        assert response.status_code == 401
        
    # ==================== CA4: Tests de Eliminación de Carta ====================
    
    def test_delete_user_card_success(self):
        """CA4.1: Usuario elimina su propia carta exitosamente."""
        user_card = UserCard.objects.create(
            user=self.user,
            card=self.card1,
            quantity=1
        )
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        response = self.client.delete(f'/api/user-cards/{user_card.id}/')
        
        assert response.status_code == 204
        assert not UserCard.objects.filter(id=user_card.id).exists()
        
    def test_delete_other_user_card_forbidden(self):
        """CA4.2: Usuario no puede eliminar carta de otro usuario."""
        other_card = UserCard.objects.create(
            user=self.other_user,
            card=self.card1,
            quantity=1
        )
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        response = self.client.delete(f'/api/user-cards/{other_card.id}/')
        
        assert response.status_code == 404
        
    def test_delete_card_unauthorized(self):
        """CA4.3: Usuario no autenticado no puede eliminar cartas."""
        user_card = UserCard.objects.create(
            user=self.user,
            card=self.card1,
            quantity=1
        )
        
        response = self.client.delete(f'/api/user-cards/{user_card.id}/')
        
        assert response.status_code == 401
        
    # ==================== CA6: Tests de Autorización y Seguridad ====================
    
    def test_invalid_token_returns_401(self):
        """CA6.1: Token inválido devuelve error 401."""
        self.client.credentials(HTTP_AUTHORIZATION='Bearer invalid_token_string')
        response = self.client.get('/api/user-cards/')
        
        assert response.status_code == 401
        
    def test_malformed_token_returns_401(self):
        """CA6.2: Token mal formado devuelve error 401."""
        self.client.credentials(HTTP_AUTHORIZATION='InvalidFormat')
        response = self.client.get('/api/user-cards/')
        
        assert response.status_code == 401
        
    # ==================== CA7: Tests de Validación de Datos ====================
    
    def test_add_card_with_nonexistent_card_id(self):
        """CA7.1: Carta inexistente devuelve error 400."""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        data = {
            'card': 999999,  # ID inexistente
            'quantity': 1
        }
        
        response = self.client.post('/api/user-cards/add/', data)
        assert response.status_code == 400
        
    def test_add_card_with_negative_quantity(self):
        """CA7.2: Cantidad negativa devuelve error 400."""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        data = {
            'card': self.card1.id,
            'quantity': -5
        }
        
        response = self.client.post('/api/user-cards/add/', data)
        assert response.status_code == 400
        
    def test_add_card_missing_required_fields(self):
        """CA7.3: Campos requeridos faltantes devuelven error 400."""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        # Enviar datos sin el campo 'card' requerido
        data = {
            'quantity': 1
        }
        
        response = self.client.post('/api/user-cards/add/', data)
        assert response.status_code == 400
        
    def test_update_card_with_invalid_condition(self):
        """CA7.4: Condición inválida devuelve error 400."""
        user_card = UserCard.objects.create(
            user=self.user,
            card=self.card1,
            quantity=1
        )
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        data = {
            'condition': 'invalid_condition'  # Condición no válida
        }
        
        response = self.client.patch(f'/api/user-cards/{user_card.id}/', data)
        assert response.status_code == 400

    # ==================== CA8: Tests de Integración Completa ====================
    
    def test_full_crud_workflow(self):
        """CA8: Test de flujo completo CRUD."""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        # 1. Crear carta
        create_data = {
            'card': self.card1.id,
            'quantity': 1,
            'language': 'EN',
            'condition': 'LP'
        }
        
        create_response = self.client.post('/api/user-cards/add/', create_data)
        assert create_response.status_code == 201
        card_id = create_response.data['id']
        
        # 2. Listar cartas (debe aparecer 1)
        list_response = self.client.get('/api/user-cards/')
        assert list_response.status_code == 200
        assert len(list_response.data) == 1
        
        # 3. Actualizar carta
        update_data = {
            'quantity': 3,
            'condition': 'NM',
            'is_favorite': True
        }
        
        update_response = self.client.patch(f'/api/user-cards/{card_id}/', update_data)
        assert update_response.status_code == 200
        assert update_response.data['quantity'] == 3
        assert update_response.data['is_favorite'] == True
        
        # 4. Eliminar carta
        delete_response = self.client.delete(f'/api/user-cards/{card_id}/')
        assert delete_response.status_code == 204
        
        # 5. Verificar que se eliminó
        final_list_response = self.client.get('/api/user-cards/')
        assert final_list_response.status_code == 200
        assert len(final_list_response.data) == 0