# pylint: disable=relative-beyond-top-level
# pokemon_tcg_tracker_project/collection_manager/urls.py
from django.urls import path
from .views import ExpansionListView

urlpatterns = [
    path('expansions/', ExpansionListView.as_view(), name='expansion-list'),
]