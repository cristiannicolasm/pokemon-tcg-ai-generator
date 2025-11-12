# pokemon_tcg_tracker_project/collection_manager/views.py
from django.db import IntegrityError
from django.contrib.auth import get_user_model
from django.db.models import Count, Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, permissions, status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Expansion, Card, UserCard
from rest_framework.response import Response
from .serializers import ExpansionSerializer, CardSerializer, UserCardSerializer, UserSerializer, ExpansionWithCountSerializer
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


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
        try:
            serializer.save(user=self.request.user)
        except IntegrityError as exc:
            raise serializers.ValidationError(
                {"detail": "Ya tienes esta carta con esos atributos en tu colección."}
            ) from exc

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

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [] # No se requiere autenticación para registrarse

class UserCardDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserCardSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = UserCard.objects.all() # pylint: disable=no-member Define el conjunto de objetos donde la vista buscará
    lookup_field = 'pk'

    def get_queryset(self):
        return UserCard.objects.filter(user=self.request.user) # pylint: disable=no-member Define el conjunto de objetos donde la vista buscará
    
class UserExpansionsView(generics.ListAPIView):
    serializer_class = ExpansionWithCountSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Query corregida con el related_name correcto
        expansion_ids = UserCard.objects.filter( # pylint: disable=no-member
            user=self.request.user
        ).values_list('card__expansion_id', flat=True).distinct()
        
        user_expansions = Expansion.objects.filter( # pylint: disable=no-member
            id__in=expansion_ids
        ).annotate(
            user_cards_count=Count(
                'cards__user_instances',  # ← CORRECTO: usar 'user_instances'
                filter=Q(cards__user_instances__user=self.request.user)
            )
        ).order_by('name')
        
        return user_expansions

class UserCardsGroupedView(generics.GenericAPIView):
    """
    Vista para obtener cartas del usuario agrupadas por carta y expansión
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """
        Agrupa cartas del usuario por carta y expansión, devolviendo información resumida
        y todas las instancias de cada grupo
        """
        user_cards = UserCard.objects.filter( # pylint: disable=no-member
            user=request.user
        ).select_related('card', 'card__expansion').order_by('card__name', 'card__expansion__name')
        
        # Agrupar por carta y expansión
        grouped_cards = {}
        
        for user_card in user_cards:
            # Crear clave única para cada combinación carta-expansión
            key = f"{user_card.card.id}_{user_card.card.expansion.id}"
            
            if key not in grouped_cards:
                grouped_cards[key] = {
                    'card_id': user_card.card.id,
                    'card_name': user_card.card.name,
                    'expansion_name': user_card.card.expansion.name,
                    'expansion_id': user_card.card.expansion.id,
                    'card_image': user_card.card.image_url_small,
                    'total_quantity': 0,
                    'instances_count': 0,
                    'is_any_favorite': False,
                    'instances': []
                }
            
            # Agregar a los totales
            grouped_cards[key]['total_quantity'] += user_card.quantity
            grouped_cards[key]['instances_count'] += 1
            
            # Si cualquier instancia es favorita, marcar el grupo como favorito
            if user_card.is_favorite:
                grouped_cards[key]['is_any_favorite'] = True
            
            # Agregar instancia individual
            grouped_cards[key]['instances'].append({
                'id': user_card.id,
                'quantity': user_card.quantity,
                'language': user_card.language,
                'condition': user_card.condition,
                'is_holographic': user_card.is_holographic,
                'is_first_edition': user_card.is_first_edition,
                'is_signed': user_card.is_signed,
                'grade': user_card.grade,
                'notes': user_card.notes,
                'is_favorite': user_card.is_favorite,
                'created_at': user_card.created_at.isoformat(),
                'updated_at': user_card.updated_at.isoformat()
            })
        
        # Convertir a lista y ordenar por nombre de carta
        result = list(grouped_cards.values())
        result.sort(key=lambda x: (x['expansion_name'], x['card_name']))
        
        return Response(result)