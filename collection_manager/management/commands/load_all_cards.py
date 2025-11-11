from django.core.management.base import BaseCommand
from collection_manager.models import Expansion, Card
import requests

class Command(BaseCommand):
    help = 'Carga cartas de todas las expansiones con bulk insert (optimizado)'

    def handle(self, *args, **options):
        expansions = Expansion.objects.all()
        total = expansions.count()
        
        self.stdout.write(f"📦 Cargando cartas de {total} expansiones (BULK INSERT)...")
        
        for index, expansion in enumerate(expansions, 1):
            self.stdout.write(f"\n[{index}/{total}] {expansion.name}...", ending='')
            
            try:
                url = "https://api.pokemontcg.io/v2/cards"
                params = {'q': f'set.id:{expansion.api_id}', 'pageSize': 250}
                response = requests.get(url, params=params)
                response.raise_for_status()
                
                cards_data = response.json()['data']
                
                # Obtener IDs existentes (evita duplicados)
                existing_ids = set(
                    Card.objects.filter(expansion=expansion).values_list('api_id', flat=True)
                )
                
                # Preparar bulk insert
                cards_to_create = []
                for card_data in cards_data:
                    if card_data['id'] not in existing_ids:
                        cards_to_create.append(Card(
                            api_id=card_data['id'],
                            name=card_data['name'],
                            expansion=expansion,
                            number=card_data.get('number', ''),
                            rarity=card_data.get('rarity', ''),
                            image_url_small=card_data.get('images', {}).get('small', ''),
                            image_url_large=card_data.get('images', {}).get('large', ''),
                            hp=card_data.get('hp'),
                            types=card_data.get('types', []),
                            abilities=card_data.get('abilities', []),
                            attacks=card_data.get('attacks', []),
                            weaknesses=card_data.get('weaknesses', []),
                            resistances=card_data.get('resistances', []),
                            retreat_cost=card_data.get('retreatCost', []),
                            converted_retreat_cost=card_data.get('convertedRetreatCost'),
                            artist=card_data.get('artist', ''),
                            flavor_text=card_data.get('flavorText', ''),
                        ))
                
                # Bulk insert (mucho más rápido)
                if cards_to_create:
                    Card.objects.bulk_create(cards_to_create, batch_size=100)
                    self.stdout.write(self.style.SUCCESS(f" ✅ {len(cards_to_create)} cartas"))
                else:
                    self.stdout.write(self.style.WARNING(" ⏭️  Ya existen"))
                    
            except Exception as e:
                self.stdout.write(self.style.ERROR(f" ❌ Error: {str(e)}"))
        
        total_cards = Card.objects.count()
        self.stdout.write(self.style.SUCCESS(f"\n🎉 ¡Completado! Total: {total_cards} cartas"))