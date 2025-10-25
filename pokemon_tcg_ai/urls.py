# POKEMON-TCG-AI_GENERATOR/pokemon_tcg_ai/urls.py
from django.contrib import admin
from django.urls import path, include

# Importa las vistas de autenticación
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # Unifica todas las rutas de la API
    path('api/', include('collection_manager.urls')), # <--- Mi API
    path('api-auth/', include('rest_framework.urls')),
    
    # URLs de Token, que deben estar en el archivo principal
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]