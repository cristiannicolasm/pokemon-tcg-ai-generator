# pokemon_tcg_tracker_project/collection_manager/views.py
from rest_framework import generics
from .models import Expansion, Card
from .serializers import ExpansionSerializer, CardSerializer

class ExpansionListView(generics.ListAPIView):
    queryset = Expansion.objects.all() # pylint: disable=no-member
    serializer_class = ExpansionSerializer
    permission_classes = [] # No se requiere autenticación para listar expansiones (datos públicos)

class CardListView(generics.ListAPIView): # <--- AÑADE ESTO
    serializer_class = CardSerializer
    permission_classes = []

    def get_queryset(self):
        # Obtiene el api_id de la expansión desde los parámetros de la URL
        expansion_api_id = self.kwargs['expansion_api_id']
        # Filtra las cartas que pertenecen a esa expansión
        return Card.objects.filter(expansion__api_id=expansion_api_id) # pylint: disable=no-member