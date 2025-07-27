# pokemon_tcg_tracker_project/collection_manager/views.py
from rest_framework import generics, permissions
from .models import Expansion, Card, UserCard
from .serializers import ExpansionSerializer, CardSerializer, UserCardSerializer

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
    
class UserCardCreateView(generics.CreateAPIView):
    queryset = UserCard.objects.all() # pylint: disable=no-member
    serializer_class = UserCardSerializer
    permission_classes = [permissions.IsAuthenticated] # ¡Solo usuarios autenticados pueden usar este endpoint!

    def perform_create(self, serializer):
        # Asigna automáticamente el usuario que hizo la solicitud como el propietario de la UserCard.
        serializer.save(user=self.request.user)

# (Opcional, pero muy recomendado para la prueba y futuro)
# Esta vista te permitirá listar todas las cartas que posee un usuario específico.
class UserCardListView(generics.ListAPIView):
    serializer_class = UserCardSerializer
    permission_classes = [permissions.IsAuthenticated] # Solo usuarios autenticados pueden ver su colección

    def get_queryset(self):
        # Filtra el queryset para devolver solo las UserCards que pertenecen al usuario autenticado.
        return UserCard.objects.filter(user=self.request.user) # pylint: disable=no-member