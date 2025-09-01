import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from collection_manager.models import Expansion, Card, UserCard

@pytest.mark.django_db
def test_user_can_mark_card_as_favorite():
    User = get_user_model()
    user = User.objects.create_user(username='testuser', password='testpass')
    expansion = Expansion.objects.create(name='Base Set', api_id='base1')
    card = Card.objects.create(name='Pikachu', api_id='xy7-54', expansion=expansion)
    usercard = UserCard.objects.create(user=user, card=card, quantity=1)

    client = APIClient()
    client.force_authenticate(user=user)

    url = f'/api/user-cards/{usercard.id}/'
    response = client.patch(url, {'is_favorite': True}, format='json')

    usercard.refresh_from_db()
    assert response.status_code == 200
    assert usercard.is_favorite is True

@pytest.mark.django_db
def test_user_cannot_favorite_other_users_card():
    User = get_user_model()
    user1 = User.objects.create_user(username='user1', password='pass1')
    user2 = User.objects.create_user(username='user2', password='pass2')
    expansion = Expansion.objects.create(name='Base Set', api_id='base1')
    card = Card.objects.create(name='Charizard', api_id='base1-4', expansion=expansion)
    usercard = UserCard.objects.create(user=user1, card=card, quantity=1)

    client = APIClient()
    client.force_authenticate(user=user2)

    url = f'/api/user-cards/{usercard.id}/'
    response = client.patch(url, {'is_favorite': True}, format='json')

    assert response.status_code == 404

import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

@pytest.mark.django_db
def test_mark_nonexistent_usercard_as_favorite():
    User = get_user_model()
    user = User.objects.create_user(username='testuser', password='testpass')

    client = APIClient()
    client.force_authenticate(user=user)

    url = '/api/user-cards/9999/'  # Un ID que no existe
    response = client.patch(url, {'is_favorite': True}, format='json')

    assert response.status_code == 404