import requests
from django.core.management.base import BaseCommand
from collection_manager.models import Expansion, Card

class Command(BaseCommand):
    help = 'Load cards from a specific expansion'

    def add_arguments(self, parser):
        parser.add_argument('expansion_identifier', type=str, 
                          help='Expansion name, API ID, or DB ID (e.g., "jungle", "base2", or "5")')
        parser.add_argument('--limit', type=int, default=250, help='Maximum number of cards to load')

    def find_expansion(self, identifier):
        """Busca expansión por nombre, api_id, o id de base de datos"""
        
        # Intentar buscar por API ID exacto
        try:
            return Expansion.objects.get(api_id=identifier)
        except Expansion.DoesNotExist:
            pass
            
        # Intentar buscar por ID de base de datos
        try:
            return Expansion.objects.get(id=int(identifier))
        except (Expansion.DoesNotExist, ValueError):
            pass
            
        # Intentar buscar por nombre (case insensitive)
        try:
            return Expansion.objects.get(name__iexact=identifier)
        except Expansion.DoesNotExist:
            pass
            
        # Intentar buscar por nombre que contenga el término
        expansions = Expansion.objects.filter(name__icontains=identifier)
        if expansions.count() == 1:
            return expansions.first()
        elif expansions.count() > 1:
            self.stdout.write(f"🔍 Múltiples expansiones encontradas para '{identifier}':")
            for exp in expansions:
                self.stdout.write(f"   - {exp.name} (api_id: {exp.api_id}, id: {exp.id})")
            return None
            
        return None

    def handle(self, *args, **options):
        identifier = options['expansion_identifier']
        limit = options['limit']
        
        # Buscar la expansión
        expansion = self.find_expansion(identifier)
        
        if not expansion:
            self.stdout.write(
                self.style.ERROR(f'❌ Expansión "{identifier}" no encontrada.')
            )
            self.stdout.write("💡 Expansiones disponibles:")
            for exp in Expansion.objects.all()[:10]:
                self.stdout.write(f"   - {exp.name} (api_id: {exp.api_id}, id: {exp.id})")
            return

        self.stdout.write(f"🔍 Cargando cartas para: {expansion.name} (api_id: {expansion.api_id})")
        
        url = f"https://api.pokemontcg.io/v2/cards"
        params = {
            'q': f'set.id:{expansion.api_id}',
            'pageSize': limit
        }
        
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            created_count = 0
            updated_count = 0
            
            for card_data in data['data']:
                # ← USAR SOLO CAMPOS QUE EXISTEN EN TU MODELO
                card, created = Card.objects.get_or_create(
                    api_id=card_data['id'],
                    defaults={
                        'name': card_data['name'],
                        'expansion': expansion,
                        'number': card_data.get('number', ''),
                        'rarity': card_data.get('rarity', ''),
                        
                        # ← CAMPOS DE IMAGEN (existen en tu modelo)
                        'image_url_small': card_data.get('images', {}).get('small', ''),
                        'image_url_large': card_data.get('images', {}).get('large', ''),
                        
                        # ← CAMPOS DE ATRIBUTOS POKÉMON (existen en tu modelo)
                        'hp': card_data.get('hp'),
                        'types': card_data.get('types', []),  # JSONField
                        'abilities': card_data.get('abilities', []),  # JSONField
                        'attacks': card_data.get('attacks', []),  # JSONField
                        'weaknesses': card_data.get('weaknesses', []),  # JSONField
                        'resistances': card_data.get('resistances', []),  # JSONField
                        'retreat_cost': card_data.get('retreatCost', []),  # JSONField
                        'converted_retreat_cost': card_data.get('convertedRetreatCost'),
                        
                        # ← CAMPOS DE METADATOS (existen en tu modelo)
                        'artist': card_data.get('artist', ''),
                        'flavor_text': card_data.get('flavorText', ''),
                    }
                )
                
                if created:
                    created_count += 1
                    if created_count <= 10:  # Mostrar solo las primeras 10
                        self.stdout.write(f"✅ {card.name} ({card.number}) - {card.rarity}")
                else:
                    updated_count += 1
                    
            self.stdout.write(
                self.style.SUCCESS(
                    f'✅ {expansion.name}: {created_count} cartas creadas, {updated_count} ya existían'
                )
            )
            
        except requests.RequestException as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Error al conectar con la API: {e}')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Error inesperado: {e}')
            )
