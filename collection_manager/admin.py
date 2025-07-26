# pokemon_tcg_tracker_project/collection_manager/admin.py
from django.contrib import admin
from .models import Expansion, Card, UserCard

# Register your models here.
admin.site.register(Expansion)
admin.site.register(Card)
admin.site.register(UserCard)