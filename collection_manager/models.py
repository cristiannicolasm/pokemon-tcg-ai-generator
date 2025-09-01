# pokemon_tcg_tracker_project/collection_manager/models.py
from django.db import models
from django.conf import settings # Necesario para referenciar el modelo de Usuario
from django.contrib.postgres.fields import ArrayField # Para listas de strings/int si es necesario, aunque JSONField suele ser más flexible para esto.
import json # Necesario para los JSONField defaults

class Expansion(models.Model):
    name = models.CharField(max_length=255, unique=True)
    api_id = models.CharField(max_length=50, unique=True, help_text="ID of the expansion in the Pokémon TCG API")
    series = models.CharField(max_length=100, blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    total_cards = models.IntegerField(blank=True, null=True)
    symbol_url = models.URLField(max_length=500, blank=True, null=True)
    logo_url = models.URLField(max_length=500, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Expansion" # Se usa en el admin para mostrar el nombre singular
        verbose_name_plural = "Expansions" # Se usa en el admin para mostrar el nombre plural
        ordering = ['name']

    def __str__(self):
        return f"{self.name}"

class Card(models.Model):
    name = models.CharField(max_length=255)
    api_id = models.CharField(max_length=50, unique=True, help_text="ID of the card in the Pokémon TCG API")
    expansion = models.ForeignKey(Expansion, on_delete=models.CASCADE, related_name='cards')
    
    rarity = models.CharField(max_length=100, blank=True, null=True)
    image_url_small = models.URLField(max_length=500, blank=True, null=True)
    image_url_large = models.URLField(max_length=500, blank=True, null=True)
    
    hp = models.CharField(max_length=10, blank=True, null=True)
    types = models.JSONField(blank=True, null=True, help_text="Energy types of the card (e.g., ['Grass', 'Fire'])")
    abilities = models.JSONField(blank=True, null=True, help_text="Abilities of the card")
    attacks = models.JSONField(blank=True, null=True, help_text="Attacks of the card")
    weaknesses = models.JSONField(blank=True, null=True, help_text="Weaknesses of the card")
    resistances = models.JSONField(blank=True, null=True, help_text="Resistances of the card")
    retreat_cost = models.JSONField(blank=True, null=True, help_text="Retreat cost of the card")
    converted_retreat_cost = models.IntegerField(blank=True, null=True)
    number = models.CharField(max_length=20, blank=True, null=True, help_text="Card number within the expansion (e.g., '1/100')")
    artist = models.CharField(max_length=255, blank=True, null=True)
    flavor_text = models.TextField(blank=True, null=True)

    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Card"
        verbose_name_plural = "Cards"
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.expansion.name})"


class UserCard(models.Model):
    CONDITION_CHOICES = [
        ('NM', 'Near Mint'),
        ('LP', 'Lightly Played'),
        ('MP', 'Moderately Played'),
        ('HP', 'Heavily Played'),
        ('DMG', 'Damaged'),
        ('VG', 'Very Good'), # Añadido para un rango más completo
    ]
    LANGUAGE_CHOICES = [
        ('EN', 'English'),
        ('ES', 'Spanish'),
        ('FR', 'French'),
        ('DE', 'German'), 
        ('IT', 'Italian'),
        ('JP', 'Japanese'),
        ('KR', 'Korean'),
        ('PT', 'Portuguese'),
        ('CH', 'Chinese'), # Simplificado, puede ser TW/CN
    ]

    # Relación con el usuario que posee la carta
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_cards')

    # Relación con la carta base
    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name='user_instances')

    # Atributos específicos de la copia física de la carta
    quantity = models.PositiveIntegerField(default=1, help_text="Number of copies of this specific card version owned by the user.")
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default='EN', help_text="Language of the card.")
    is_holographic = models.BooleanField(default=False, help_text="Is this copy of the card holographic?")
    condition = models.CharField(max_length=3, choices=CONDITION_CHOICES, default='NM', help_text="Physical condition of the card.")
    is_first_edition = models.BooleanField(default=False, help_text="Is this a first edition print of the card?")
    is_signed = models.BooleanField(default=False, help_text="Is this card signed?")
    grade = models.CharField(max_length=10, blank=True, null=True, help_text="Professional grading score (e.g., 'PSA 10', 'BGS 9.5').")
    notes = models.TextField(blank=True, null=True, help_text="Personal notes about this specific card instance.")

    is_favorite = models.BooleanField(default=False, help_text="Is this card a favorite?")


    # Timestamps para cuando la carta fue añadida/actualizada en la colección del usuario
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # Asegura que un usuario no pueda añadir la EXACTA misma versión de una carta
        # (misma carta, mismo idioma, holo/no-holo, primera ed.) múltiples veces como entradas separadas.
        # En su lugar, actualizarían la cantidad de una entrada existente.
        unique_together = ('user', 'card', 'language', 'is_holographic', 'is_first_edition', 'condition')
        verbose_name = "User's Card"
        verbose_name_plural = "User's Cards"

        def __str__(self):
            return f"{self.user.username}'s {self.card.name} ({self.language}, Qty: {self.quantity})" # pylint: disable=no-member

