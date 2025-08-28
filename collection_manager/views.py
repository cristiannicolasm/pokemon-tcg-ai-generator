# pokemon_tcg_tracker_project/collection_manager/views.py
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Expansion, Card, UserCard
from rest_framework.response import Response
from .serializers import ExpansionSerializer, CardSerializer, UserCardSerializer, UserSerializer


class ExpansionListView(generics.ListAPIView):
    queryset = Expansion.objects.all() # pylint: disable=no-member
    serializer_class = ExpansionSerializer
    permission_classes = [IsAuthenticated] # No se requiere autenticación para listar expansiones (datos públicos)

class CardListView(generics.ListAPIView): # <--- AÑADE ESTO
    serializer_class = CardSerializer
    permission_classes = [IsAuthenticated] # No se requiere autenticación para listar cartas (datos públicos)

    def get_queryset(self):
        # Obtiene el api_id de la expansión desde los parámetros de la URL
        expansion_api_id = self.kwargs['expansion_api_id']
        # Filtra las cartas que pertenecen a esa expansión
        return Card.objects.filter(expansion__api_id=expansion_api_id) # pylint: disable=no-member
    
class UserCardCreateView(generics.CreateAPIView):
    queryset = UserCard.objects.all() # pylint: disable=no-member
    serializer_class = UserCardSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated] # ¡Solo usuarios autenticados pueden usar este endpoint!

    def perform_create(self, serializer):
        # Asigna automáticamente el usuario que hizo la solicitud como el propietario de la UserCard.
        serializer.save(user=self.request.user)

# (Opcional, pero muy recomendado para la prueba y futuro)
# Esta vista te permitirá listar todas las cartas que posee un usuario específico.
class UserCardListView(generics.ListAPIView):
    serializer_class = UserCardSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated] # Solo usuarios autenticados pueden ver su colección

    def get_queryset(self):
        # Filtra el queryset para devolver solo las UserCards que pertenecen al usuario autenticado.
        return UserCard.objects.filter(user=self.request.user) # pylint: disable=no-member

class CardDetailView(generics.RetrieveAPIView):
    queryset = Card.objects.all() # pylint: disable=no-member Define el conjunto de objetos donde la vista buscará
    serializer_class = CardSerializer # Usa el serializador que ya tienes para Card
    lookup_field = 'api_id' # ¡IMPORTANTE! Le dice a DRF que use el campo 'api_id' del modelo Card para buscar la carta, no el 'id' por defecto.
    permission_classes = [] # Permite el acceso sin necesidad de autenticación (son datos públicos)
    
User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [] # No se requiere autenticación para registrarse