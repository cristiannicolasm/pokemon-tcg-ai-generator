# pokemon_tcg_tracker_project/collection_manager/serializers.py
from rest_framework import serializers
from .models import Expansion, Card

class ExpansionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expansion
        fields = '__all__' # Incluye todos los campos del modelo Expansion

class CardSerializer(serializers.ModelSerializer):
    # Para incluir el nombre de la expansión directamente en la respuesta de la carta
    expansion_name = serializers.CharField(source='expansion.name', read_only=True)
    class Meta:
        model = Card
        # Listar los campos explícitamente o usar '__all__'
        # Si se usa '__all__', asegúrarse que el JSONField se represente correctamente.
        # Por simplicidad y para mostrar campos específicos se usará algunos clave aquí:
        fields = [
            'id', 'api_id', 'name', 'rarity', 'image_url_small', 'image_url_large',
            'hp', 'types', 'abilities', 'attacks', 'weaknesses', 'resistances',
            'retreat_cost', 'converted_retreat_cost', 'number', 'artist', 'flavor_text',
            'expansion', 'expansion_name', # Incluimos la ID de la expansión y su nombre legible
            'updated_at', 'created_at'
        ]