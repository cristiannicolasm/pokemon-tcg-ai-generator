# pylint: disable=no-member
# pokemon_tcg_tracker_project/collection_manager/api_service.py
import requests
from .models import Expansion
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

POKEMON_TCG_BASE_URL = "https://api.pokemontcg.io/v2"
# POKEMON_TCG_API_KEY = getattr(settings, 'POKEMON_TCG_API_KEY', None) # Si la API Key fuera necesaria

def fetch_expansions_from_api():
    """
    Fetches all expansions from the Pokémon TCG API.
    """
    url = f"{POKEMON_TCG_BASE_URL}/sets"
    headers = {}
    # if POKEMON_TCG_API_KEY:
    #     headers['X-Api-Key'] = POKEMON_TCG_API_KEY

    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status() # Raise an HTTPError for bad responses (4xx or 5xx)
        data = response.json()
        return data.get('data', [])
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching expansions from API: {e}")
        return []

def save_expansions_to_db(expansions_data):
    """
    Saves or updates expansion data in the database.
    """
    if not expansions_data:
        logger.info("No expansion data to save.")
        return

    for exp_data in expansions_data:
        api_id = exp_data.get('id')
        name = exp_data.get('name')
        series = exp_data.get('series')
        release_date = exp_data.get('releaseDate') # <-- Obtiene la fecha como string
        total_cards = exp_data.get('total')
        symbol_url = exp_data.get('images', {}).get('symbol')
        logo_url = exp_data.get('images', {}).get('logo')

        if not api_id or not name:
            logger.warning(f"Skipping expansion due to missing ID or name: {exp_data}")
            continue

        # Ensure releaseDate is in 'YYYY-MM-DD' format or None
        if release_date:
            try:
                from datetime import datetime
                # CUIDADO AQUÍ: Cambia el formato de '%m/%d/%Y' a '%Y/%m/%d'
                release_date = datetime.strptime(release_date, '%Y/%m/%d').strftime('%Y-%m-%d')
            except ValueError:
                logger.warning(f"Invalid release date format for {name}: {release_date}. Setting to None.")
                release_date = None

        expansion, created = Expansion.objects.update_or_create( 
            api_id=api_id,
            defaults={
                'name': name,
                'series': series,
                'release_date': release_date,
                'total_cards': total_cards,
                'symbol_url': symbol_url,
                'logo_url': logo_url,
            }
        )
        if created:
            logger.info(f"Created new expansion: {expansion.name}")
        else:
            logger.info(f"Updated existing expansion: {expansion.name}")

def import_expansions():
    """
    Main function to orchestrate fetching and saving expansions.
    """
    logger.info("Starting expansion import process...")
    expansions = fetch_expansions_from_api()
    if expansions:
        save_expansions_to_db(expansions)
        logger.info(f"Finished importing {len(expansions)} expansions.")
    else:
        logger.warning("No expansions fetched from API to import.")