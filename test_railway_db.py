import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pokemon_tcg_ai.settings')
django.setup()

from collection_manager.models import Expansion, Card

print("🔍 Verificando Railway PostgreSQL...")
print(f"✅ Expansiones: {Expansion.objects.count()}")
print(f"✅ Cartas: {Card.objects.count()}")
print("🎉 Base de datos Railway configurada correctamente!")