# Script para crear datos de prueba
from collection_manager.models import Expansion, Card
from users.models import User

# Crear usuario de prueba
user, created = User.objects.get_or_create(
    username='testuser',
    defaults={'email': 'test@example.com'}
)
if created:
    user.set_password('testpass123')
    user.save()
    print(f"✅ Usuario de prueba creado: {user.username}")
else:
    print(f"✅ Usuario de prueba ya existe: {user.username}")

# Obtener la expansión Base
try:
    base_expansion = Expansion.objects.get(api_id='base1')
    print(f"✅ Expansión Base encontrada: {base_expansion.name}")
    
    # Crear algunas cartas de prueba
    test_cards = [
        {
            'api_id': 'base1-1',
            'name': 'Alakazam',
            'hp': 80,
            'types': ['Psychic'],
            'rarity': 'Rare Holo',
            'image_url': 'https://images.pokemontcg.io/base1/1_hires.png'
        },
        {
            'api_id': 'base1-2',
            'name': 'Blastoise',
            'hp': 100,
            'types': ['Water'],
            'rarity': 'Rare Holo',
            'image_url': 'https://images.pokemontcg.io/base1/2_hires.png'
        },
        {
            'api_id': 'base1-3',
            'name': 'Chansey',
            'hp': 120,
            'types': ['Colorless'],
            'rarity': 'Rare Holo',
            'image_url': 'https://images.pokemontcg.io/base1/3_hires.png'
        },
        {
            'api_id': 'base1-4',
            'name': 'Charizard',
            'hp': 120,
            'types': ['Fire'],
            'rarity': 'Rare Holo',
            'image_url': 'https://images.pokemontcg.io/base1/4_hires.png'
        },
        {
            'api_id': 'base1-5',
            'name': 'Clefairy',
            'hp': 40,
            'types': ['Colorless'],
            'rarity': 'Rare Holo',
            'image_url': 'https://images.pokemontcg.io/base1/5_hires.png'
        }
    ]
    
    created_count = 0
    for card_data in test_cards:
        card, created = Card.objects.get_or_create(
            api_id=card_data['api_id'],
            defaults={
                'expansion': base_expansion,
                'name': card_data['name'],
                'hp': card_data['hp'],
                'types': card_data['types'],
                'rarity': card_data['rarity'],
                'image_url': card_data['image_url']
            }
        )
        if created:
            created_count += 1
            print(f"✅ Carta creada: {card.name}")
        else:
            print(f"✅ Carta ya existe: {card.name}")
    
    print(f"✅ Proceso completado. {created_count} cartas nuevas creadas.")
    print(f"✅ Total de cartas en expansión Base: {Card.objects.filter(expansion=base_expansion).count()}")
    
except Expansion.DoesNotExist:
    print("❌ Error: No se encontró la expansión Base")

print("✅ Datos de prueba listos!")