# pokemon_tcg_tracker_project/collection_manager/urls.py
from django.urls import path
from .views import ExpansionListView, CardListView

urlpatterns = [
    path('expansions/', ExpansionListView.as_view(), name='expansion-list'),
    path('expansions/<str:expansion_api_id>/cards/', CardListView.as_view(), name='cards-by-expansion')
]