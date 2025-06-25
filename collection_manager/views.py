# pokemon_tcg_tracker_project/collection_manager/views.py
from rest_framework import generics
from .models import Expansion
from .serializers import ExpansionSerializer

class ExpansionListView(generics.ListAPIView):
    queryset = Expansion.objects.all() # pylint: disable=no-member
    serializer_class = ExpansionSerializer
    permission_classes = [] # No se requiere autenticación para listar expansiones (datos públicos)