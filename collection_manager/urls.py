# POKEMON-TCG-AI_GENERATOR/collection_manager/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ExpansionListView, CardListView, UserCardCreateView, UserCardListView, CardDetailView, RegisterView

urlpatterns = [
    path('expansions/', ExpansionListView.as_view(), name='expansion-list'),
    path('expansions/<str:expansion_api_id>/cards/', CardListView.as_view(), name='cards-by-expansion'),
    path('cards/<str:api_id>/', CardDetailView.as_view(), name='card-detail'),

    # URLs para la colección del usuario
    path('user-cards/add/', UserCardCreateView.as_view(), name='usercard-add'),
    path('user-cards/', UserCardListView.as_view(), name='usercard-list'),

    path('register/', RegisterView.as_view(), name='auth_register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]