# pokemon_tcg_tracker_project/collection_manager/serializers.py
from rest_framework import serializers
from .models import Expansion, Card, UserCard

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

class UserCardSerializer(serializers.ModelSerializer):
    # Campo para mostrar el nombre del usuario (solo lectura)
    username = serializers.CharField(source='user.username', read_only=True)
    # Serializador anidado para mostrar detalles completos de la carta, no solo su ID
    card_details = CardSerializer(source='card', read_only=True)

    class Meta:
        model = UserCard
        fields = [
            'id', 'username', 'user', 'card', 'card_details', 'quantity', 'language',
            'is_holographic', 'condition', 'is_first_edition', 'is_signed', 'grade', 'notes',
            'created_at', 'updated_at'
        ]
        # Hacemos el campo 'user' de solo escritura y requerido en la validación
        # pero no esperamos que el cliente lo envíe, lo asignaremos nosotros en la vista.
        extra_kwargs = {
            'user': {'required': False, 'write_only': True}
        }

    # Método para manejar la lógica de actualización/creación y 'unique_together'
    def create(self, validated_data):
        # Obtiene el usuario de la solicitud actual (establecido en la vista)
        user = self.context['request'].user
        card = validated_data.get('card')
        language = validated_data.get('language', 'EN') # Valor predeterminado
        is_holographic = validated_data.get('is_holographic', False) # Valor predeterminado
        is_first_edition = validated_data.get('is_first_edition', False) # Valor predeterminado
        condition = validated_data.get('condition', 'NM') # Valor predeterminado
        quantity = validated_data.get('quantity', 1) # Valor predeterminado


        # Intenta encontrar una UserCard existente con las mismas propiedades únicas para este usuario.
        # Si no existe, la crea.
        user_card, created = UserCard.objects.get_or_create( # pylint: disable=no-member
            user=user,
            card=card,
            language=language,
            is_holographic=is_holographic,
            is_first_edition=is_first_edition,
            condition=condition,
            defaults={
                'quantity': quantity,
                'is_signed': validated_data.get('is_signed', False),
                'grade': validated_data.get('grade', ''),
                'notes': validated_data.get('notes', '')
            }
        )

        if not created:
            # Si la UserCard ya existía, suma la nueva cantidad a la existente.
            user_card.quantity += quantity
            # Actualiza también otros campos si se proporcionan nuevos valores
            user_card.is_signed = validated_data.get('is_signed', user_card.is_signed)
            user_card.grade = validated_data.get('grade', user_card.grade)
            user_card.notes = validated_data.get('notes', user_card.notes)
            user_card.save()

        return user_card

    def update(self, instance, validated_data):
        # Este método se usaría para actualizar una UserCard existente.
        # Por ahora, solo maneja la actualización de cantidad en `create`
        # pero aquí podrías permitir modificar otros atributos.
        instance.quantity = validated_data.get('quantity', instance.quantity)
        # Otros campos que quieras permitir actualizar:
        instance.language = validated_data.get('language', instance.language)
        instance.is_holographic = validated_data.get('is_holographic', instance.is_holographic)
        instance.condition = validated_data.get('condition', instance.condition)
        instance.is_first_edition = validated_data.get('is_first_edition', instance.is_first_edition)
        instance.is_signed = validated_data.get('is_signed', instance.is_signed)
        instance.grade = validated_data.get('grade', instance.grade)
        instance.notes = validated_data.get('notes', instance.notes)
        instance.save()
        return instance