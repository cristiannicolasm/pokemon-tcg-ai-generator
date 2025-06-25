# pokemon_tcg_tracker_project/pokemon_tcg_tracker/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('users.urls')),
    path('api/', include('collection_manager.urls')),
    # Aquí irán las URLs de tus otras APIs en el futuro
]