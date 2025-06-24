# pokemon_tcg_tracker_project/collection_manager/models.py
from django.db import models

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