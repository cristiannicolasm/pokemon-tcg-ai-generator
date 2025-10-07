import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from collection_manager.models import Card, Expansion, UserCard

User = get_user_model()

@pytest.mark.django_db
class TestExpansionFiltering:
    """T2: Tests de integración para filtrado de cartas por expansión"""

    def setup_method(self, method):
        """Configuración inicial para cada test."""
        self.client = APIClient()
        
        # Crear usuario de prueba
        self.user = User.objects.create_user(
            username='filteruser', 
            password='testpass123'
        )
        
        # Generar token JWT
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        
        # Crear expansiones
        self.base_expansion = Expansion.objects.create(
            api_id='base1',
            name='Base Set',
            series='Base'
        )
        
        self.jungle_expansion = Expansion.objects.create(
            api_id='jungle',
            name='Jungle',
            series='Base'
        )
        
        # Crear cartas con VALORES CORTOS
        self.base_cards = []
        for i in range(3):
            card = Card.objects.create(
                api_id=f'base1-{i+1}',
                name=f'Base Card {i+1}',
                expansion=self.base_expansion,
                number=f'{i+1}',          # ← SOLO 1 CARÁCTER
                rarity='Common'
            )
            self.base_cards.append(card)
            
        self.jungle_cards = []
        for i in range(2):
            card = Card.objects.create(
                api_id=f'jungle-{i+10}',
                name=f'Jungle Card {i+1}',
                expansion=self.jungle_expansion,
                number=f'{i+10}',         # ← MÁXIMO 2 CARACTERES
                rarity='Common'
            )
            self.jungle_cards.append(card)
            
        # Crear UserCards con CHOICES VÁLIDOS
        for card in self.base_cards:
            UserCard.objects.create(
                user=self.user,
                card=card,
                quantity=1,
                language='EN',            # ← CHOICE VÁLIDO
                condition='NM'            # ← CHOICE VÁLIDO
            )
            
        for card in self.jungle_cards:
            UserCard.objects.create(
                user=self.user,
                card=card,
                quantity=1,
                language='EN',            # ← CHOICE VÁLIDO
                condition='NM'            # ← CHOICE VÁLIDO
            )

    def test_integration_get_user_expansions_then_filter_cards(self):
        """T2.1: Flujo completo - obtener expansiones y filtrar cartas"""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        # Paso 1: Obtener expansiones del usuario
        expansions_response = self.client.get('/api/user-expansions/')
        assert expansions_response.status_code == 200
        assert len(expansions_response.data) == 2
        
        # Verificar conteos
        base_exp = next(exp for exp in expansions_response.data if exp['name'] == 'Base Set')
        jungle_exp = next(exp for exp in expansions_response.data if exp['name'] == 'Jungle')
        
        assert base_exp['user_cards_count'] == 3
        assert jungle_exp['user_cards_count'] == 2
        
        # Paso 2: Obtener todas las cartas del usuario
        all_cards_response = self.client.get('/api/user-cards/')
        assert all_cards_response.status_code == 200
        assert len(all_cards_response.data) == 5  # 3 Base + 2 Jungle
        
        # Verificar que las cartas tienen expansion_id
        for card in all_cards_response.data:
            assert 'expansion_id' in card
            assert 'expansion_name' in card
            assert card['expansion_id'] in [base_exp['id'], jungle_exp['id']]
            
    def test_filter_cards_by_expansion_id(self):
        """T2.2: Filtrar cartas por expansion_id funciona correctamente"""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        # Obtener todas las cartas
        all_cards_response = self.client.get('/api/user-cards/')
        all_cards = all_cards_response.data
        
        # Obtener expansiones
        expansions_response = self.client.get('/api/user-expansions/')
        base_exp = next(exp for exp in expansions_response.data if exp['name'] == 'Base Set')
        jungle_exp = next(exp for exp in expansions_response.data if exp['name'] == 'Jungle')
        
        # Filtrar cartas de Base Set
        base_cards = [card for card in all_cards if card['expansion_id'] == base_exp['id']]
        assert len(base_cards) == 3
        for card in base_cards:
            assert card['expansion_name'] == 'Base Set'
            assert 'Base Card' in card['card_name']
            
        # Filtrar cartas de Jungle
        jungle_cards = [card for card in all_cards if card['expansion_id'] == jungle_exp['id']]
        assert len(jungle_cards) == 2
        for card in jungle_cards:
            assert card['expansion_name'] == 'Jungle'
            assert 'Jungle Card' in card['card_name']
            
    def test_expansion_data_consistency(self):
        """T2.3: Datos de expansión son consistentes entre endpoints"""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        # Obtener datos de ambos endpoints
        expansions_response = self.client.get('/api/user-expansions/')
        cards_response = self.client.get('/api/user-cards/')
        
        expansions_data = expansions_response.data
        cards_data = cards_response.data
        
        # Verificar consistencia de IDs y nombres
        for expansion in expansions_data:
            expansion_cards = [
                card for card in cards_data 
                if card['expansion_id'] == expansion['id']
            ]
            
            # Verificar conteo
            assert len(expansion_cards) == expansion['user_cards_count']
            
            # Verificar nombres consistentes
            for card in expansion_cards:
                assert card['expansion_name'] == expansion['name']
                
    def test_empty_expansion_filtering(self):
        """T2.4: Filtrar por expansión sin cartas devuelve lista vacía"""
        # Crear expansión sin cartas del usuario
        empty_expansion = Expansion.objects.create(
            api_id='empty',
            name='Empty Expansion',
            series='Test'
        )
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        # Verificar que no aparece en user-expansions
        expansions_response = self.client.get('/api/user-expansions/')
        expansion_names = [exp['name'] for exp in expansions_response.data]
        assert 'Empty Expansion' not in expansion_names
        
        # Verificar que filtrar por esta expansión no devuelve cartas
        cards_response = self.client.get('/api/user-cards/')
        empty_cards = [
            card for card in cards_response.data 
            if card['expansion_id'] == empty_expansion.id
        ]
        assert len(empty_cards) == 0

    def test_multiple_cards_same_expansion_count(self):
        """T2.5: Múltiples cartas de la misma expansión se cuentan correctamente"""
        # Agregar más cartas a Base Set
        for i in range(3, 6):  # Cartas 4, 5, 6
            card = Card.objects.create(
                api_id=f'base1-{i+1}',
                name=f'Base Card {i+1}',
                expansion=self.base_expansion,
                number=f'{i+1}',      # ← SOLO 1 CARÁCTER
                rarity='Common'
            )
            
            UserCard.objects.create(
                user=self.user,
                card=card,
                quantity=2,  # Múltiples copias
                language='EN',       # ← CHOICE VÁLIDO
                condition='NM'       # ← CHOICE VÁLIDO
            )
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        # Verificar conteo actualizado
        expansions_response = self.client.get('/api/user-expansions/')
        base_exp = next(exp for exp in expansions_response.data if exp['name'] == 'Base Set')
        
        # Debería contar 6 UserCard entries (3 originales + 3 nuevas)
        assert base_exp['user_cards_count'] == 6

    def test_user_cards_with_images(self):
        """T2.6: UserCards incluyen información de imagen"""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        response = self.client.get('/api/user-cards/')
        assert response.status_code == 200
        
        if response.data:
            card = response.data[0]
            # Verificar que tiene el campo card_image (puede estar vacío)
            assert 'card_image' in card

    def test_user_isolation_filtering(self):
        """T2.7: Filtrado respeta aislamiento entre usuarios"""
        # Crear segundo usuario
        other_user = User.objects.create_user(username='otheruser', password='pass')
        other_refresh = RefreshToken.for_user(other_user)
        other_token = str(other_refresh.access_token)
        
        # Crear carta para el otro usuario
        other_card = Card.objects.create(
            api_id='other-1',
            name='Other Card',
            expansion=self.base_expansion,
            number='99',             # ← 2 CARACTERES
            rarity='Rare'
        )
        
        UserCard.objects.create(
            user=other_user,
            card=other_card,
            quantity=1,
            language='ES',           # ← CHOICE VÁLIDO
            condition='LP'           # ← CHOICE VÁLIDO
        )
        
        # Verificar que cada usuario ve solo sus cartas
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response1 = self.client.get('/api/user-cards/')
        user1_cards = [card['card_name'] for card in response1.data]
        assert 'Other Card' not in user1_cards
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {other_token}')
        response2 = self.client.get('/api/user-cards/')
        user2_cards = [card['card_name'] for card in response2.data]
        assert 'Other Card' in user2_cards
        assert len([card for card in user2_cards if 'Base Card' in card]) == 0

    def test_no_cards_no_expansions(self):
        """T2.8: Usuario sin cartas no tiene expansiones"""
        # Crear usuario sin cartas
        empty_user = User.objects.create_user(username='empty', password='pass')
        empty_refresh = RefreshToken.for_user(empty_user)
        empty_token = str(empty_refresh.access_token)
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {empty_token}')
        
        # No debería tener expansiones
        expansions_response = self.client.get('/api/user-expansions/')
        assert expansions_response.status_code == 200
        assert len(expansions_response.data) == 0
        
        # No debería tener cartas
        cards_response = self.client.get('/api/user-cards/')
        assert cards_response.status_code == 200
        assert len(cards_response.data) == 0