import os
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pokemon_tcg_ai.settings')
django.setup()

from collection_manager.models import Expansion, Card, UserCard
from users.models import CustomUser

# Verificar usuarios de prueba
users_data = [
    {'username': 'testuser', 'email': 'test@example.com', 'password': 'testpass123'},
    {'username': 'admin', 'email': 'admin@example.com', 'password': 'cris1234'}
]

for user_data in users_data:
    user = CustomUser.objects.filter(username=user_data['username']).first()
    if not user:
        user = CustomUser.objects.create_user(
            username=user_data['username'], 
            email=user_data['email'], 
            password=user_data['password']
        )
        print(f'Usuario {user_data["username"]} creado')
    else:
        print(f'Usuario {user_data["username"]} ya existe')

# Crear algunas cartas de prueba
base_exp = Expansion.objects.filter(api_id='base1').first()
if base_exp:
    print(f'Expansión encontrada: {base_exp.name}')
    
    cards_data = [
        {'api_id': 'base1-4', 'name': 'Charizard', 'hp': '120'},
        {'api_id': 'base1-2', 'name': 'Blastoise', 'hp': '100'},
        {'api_id': 'base1-1', 'name': 'Alakazam', 'hp': '80'},
        {'api_id': 'base1-5', 'name': 'Clefairy', 'hp': '40'},
        {'api_id': 'base1-6', 'name': 'Gyarados', 'hp': '100'}
    ]
    
    for card_info in cards_data:
        card, created = Card.objects.get_or_create(
            api_id=card_info['api_id'],
            defaults={
                'expansion': base_exp,
                'name': card_info['name'],
                'hp': card_info['hp'],
                'types': ['Fire'],
                'rarity': 'Rare Holo',
                'image_url_large': f'https://images.pokemontcg.io/base1/{card_info["api_id"].split("-")[1]}_hires.png'
            }
        )
        if created:
            print(f'Carta creada: {card.name}')
        else:
            print(f'Carta ya existe: {card.name}')
            
    print(f'Total cartas en base: {Card.objects.filter(expansion=base_exp).count()}')
    
    # Agregar cartas al usuario testuser para los tests E2E
    testuser = CustomUser.objects.get(username='testuser')
    
    # Obtener las primeras 3 cartas para agregar a la colección del usuario
    cards_for_user = Card.objects.filter(expansion=base_exp)[:3]
    
    for card in cards_for_user:
        user_card, created = UserCard.objects.get_or_create(
            user=testuser,
            card=card,
            defaults={
                'quantity': 1,
                'language': 'EN',
                'condition': 'NM',
                'is_holographic': False,
                'is_first_edition': False,
                'is_signed': False,
                'grade': '',
                'notes': f'Carta de test para {card.name}'
            }
        )
        if created:
            print(f'Carta añadida a colección de testuser: {card.name}')
        else:
            print(f'Carta ya estaba en colección de testuser: {card.name}')
    
    print(f'Total cartas en colección de testuser: {UserCard.objects.filter(user=testuser).count()}')
    
else:
    print('No se encontró expansión base1')

print('✅ Datos de prueba listos!')