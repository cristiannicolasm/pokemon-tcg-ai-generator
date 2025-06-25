# pokemon_tcg_tracker_project/collection_manager/serializers.py
from rest_framework import serializers
from .models import Expansion, Card

class ExpansionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expansion
        fields = '__all__' # Incluye todos los campos del modelo Expansion