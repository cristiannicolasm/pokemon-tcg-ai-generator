# pokemon_tcg_tracker_project/collection_manager/urls.py
from django.urls import path
from .views import ExpansionListView, CardListView, UserCardCreateView, UserCardListView, CardDetailView, RegisterView

urlpatterns = [
    path('expansions/', ExpansionListView.as_view(), name='expansion-list'),
    path('expansions/<str:expansion_api_id>/cards/', CardListView.as_view(), name='cards-by-expansion'),
    path('cards/<str:api_id>/', CardDetailView.as_view(), name='card-detail'),

    # URLs para la colección del usuario (requieren autenticación)
    path('user-cards/add/', UserCardCreateView.as_view(), name='usercard-add'), # Endpoint para añadir/actualizar UserCards
    path('user-cards/', UserCardListView.as_view(), name='usercard-list'), # (Opcional) Endpoint para listar las UserCards del usuario

    path('register/', RegisterView.as_view(), name='auth_register'),
]