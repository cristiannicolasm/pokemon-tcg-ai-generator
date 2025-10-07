import requests
from django.core.management.base import BaseCommand
from collection_manager.models import Expansion
from datetime import datetime

class Command(BaseCommand):
    help = 'Load all expansions from Pokemon TCG API'

    def convert_date_format(self, date_string):
        """Convierte fecha de YYYY/MM/DD a YYYY-MM-DD"""
        if not date_string:
            return None
        try:
            # Convertir de "2025/07/18" a "2025-07-18"
            return date_string.replace('/', '-')
        except Exception:
            return None

    def handle(self, *args, **options):
        url = "https://api.pokemontcg.io/v2/sets"
        
        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            
            created_count = 0
            updated_count = 0
            
            for set_data in data['data']:
                # Convertir fecha al formato correcto
                release_date = self.convert_date_format(set_data.get('releaseDate'))
                
                expansion, created = Expansion.objects.get_or_create(
                    api_id=set_data['id'],
                    defaults={
                        'name': set_data['name'],
                        'series': set_data.get('series', ''),
                        'release_date': release_date,  # ← Usar fecha convertida
                        'total_cards': set_data.get('total', 0),
                        'symbol_url': set_data.get('images', {}).get('symbol', ''),
                        'logo_url': set_data.get('images', {}).get('logo', ''),
                    }
                )
                
                if created:
                    created_count += 1
                    self.stdout.write(f"✅ Creada: {expansion.name} ({expansion.api_id}) - {release_date}")
                else:
                    updated_count += 1
                    
            self.stdout.write(
                self.style.SUCCESS(
                    f'✅ Proceso completado: {created_count} expansiones creadas, {updated_count} ya existían'
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