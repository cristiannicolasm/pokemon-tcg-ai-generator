# pokemon_tcg_tracker_project/collection_manager/serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Expansion, Card, UserCard

class ExpansionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expansion
        fields = '__all__' # Incluye todos los campos del modelo Expansion

class ExpansionWithCountSerializer(serializers.ModelSerializer):
    """Serializer para expansiones con conteo de cartas del usuario"""
    user_cards_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Expansion
        fields = ['id', 'api_id', 'name', 'series', 'symbol_url', 'user_cards_count']

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

class UserCardSerializer(serializers.ModelSerializer):
    card_name = serializers.CharField(source='card.name', read_only=True)
    expansion_name = serializers.CharField(source='card.expansion.name', read_only=True)
    expansion_id = serializers.IntegerField(source='card.expansion.id', read_only=True)
    card_image = serializers.CharField(source='card.image_url_small', read_only=True)  # ← AGREGAR
    
    class Meta:
        model = UserCard
        fields = [
            'id', 'card', 'card_name', 'expansion_name', 'expansion_id', 'card_image',  # ← Agregar card_image
            'quantity', 'language', 'is_holographic', 'condition',
            'is_first_edition', 'is_signed', 'grade', 'notes', 'is_favorite'
        ]
        read_only_fields = ['id', 'user']  # No permitir cambiar el id, la carta ni el usuario

# Serializador para el registro de usuarios
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) # El campo password solo se usa para escribir, no se muestra en la respuesta

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password'] # Incluye los campos necesarios para el registro
        extra_kwargs = {'password': {'write_only': True}} # Opcional: otra forma de definir write_only

    def create(self, validated_data):
        # Crea el usuario y hashea la contraseña
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user