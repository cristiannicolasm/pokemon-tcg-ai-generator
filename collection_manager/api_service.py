# pokemon_tcg_tracker_project/collection_manager/api_service.py
import requests
from .models import Expansion, Card
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

def fetch_cards_from_api(set_id):
    """
    Fetches cards for a specific expansion (set_id) from the Pokémon TCG API.
    Handles pagination to get all cards.
    """
    all_cards = []
    page = 1
    page_size = 250 # Max page size for pokemontcg.io API

    while True:
        url = f"{POKEMON_TCG_BASE_URL}/cards"
        params = {
            'q': f'set.id:{set_id}',
            'page': page,
            'pageSize': page_size
        }
        headers = {}
        # if POKEMON_TCG_API_KEY:
        #     headers['X-Api-Key'] = POKEMON_TCG_API_KEY

        try:
            response = requests.get(url, params=params, headers=headers, timeout=30) # Increased timeout for cards
            response.raise_for_status()
            data = response.json()

            cards_on_page = data.get('data', [])
            all_cards.extend(cards_on_page)

            # Check for pagination
            total_count = data.get('totalCount', 0)
            if len(all_cards) >= total_count:
                break # All cards fetched

            page += 1

            # Small delay to be polite to the API, especially if fetching many pages
            # time.sleep(0.1) # Uncomment if you hit rate limits frequently

        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching cards for set {set_id} from API (page {page}): {e}")
            break # Exit loop on error

    logger.info(f"Fetched {len(all_cards)} cards for set {set_id}.")
    return all_cards

def save_cards_to_db(cards_data, expansion_instance):
    """
    Saves or updates card data in the database, associating them with an Expansion.
    """
    if not cards_data:
        logger.info(f"No card data to save for expansion {expansion_instance.name}.")
        return

    for card_data in cards_data:
        api_id = card_data.get('id')
        name = card_data.get('name')
        rarity = card_data.get('rarity')
        image_url_small = card_data.get('images', {}).get('small')
        image_url_large = card_data.get('images', {}).get('large')

        # Extracting additional game-related fields
        hp = card_data.get('hp')
        types = card_data.get('types') # List of strings, e.g., ["Fire", "Water"]
        abilities = card_data.get('abilities') # List of dicts
        attacks = card_data.get('attacks') # List of dicts
        weaknesses = card_data.get('weaknesses') # List of dicts
        resistances = card_data.get('resistances') # List of dicts
        retreat_cost = card_data.get('retreatCost') # List of strings, e.g., ["Colorless", "Colorless"]
        converted_retreat_cost = card_data.get('convertedRetreatCost')
        number = card_data.get('number')
        artist = card_data.get('artist')
        flavor_text = card_data.get('flavorText')

        if not api_id or not name:
            logger.warning(f"Skipping card due to missing ID or name: {card_data}")
            continue

        card, created = Card.objects.update_or_create(
            api_id=api_id,
            defaults={
                'name': name,
                'expansion': expansion_instance, # Associate with the Expansion instance
                'rarity': rarity,
                'image_url_small': image_url_small,
                'image_url_large': image_url_large,
                'hp': hp,
                'types': types,
                'abilities': abilities,
                'attacks': attacks,
                'weaknesses': weaknesses,
                'resistances': resistances,
                'retreat_cost': retreat_cost,
                'converted_retreat_cost': converted_retreat_cost,
                'number': number,
                'artist': artist,
                'flavor_text': flavor_text,
            }
        )
        if created:
            logger.info(f"Created new card: {card.name} (ID: {card.api_id}) for {expansion_instance.name}")
        else:
            logger.debug(f"Updated existing card: {card.name} (ID: {card.api_id}) for {expansion_instance.name}") # Use debug for less verbose output on updates

def import_cards_for_expansion(expansion_api_id):
    """
    Main function to orchestrate fetching and saving cards for a specific expansion.
    """
    try:
        expansion_instance = Expansion.objects.get(api_id=expansion_api_id)
    except Expansion.DoesNotExist:
        logger.error(f"Expansion with API ID '{expansion_api_id}' not found in database. Cannot import cards.")
        return

    logger.info(f"Starting card import process for expansion: {expansion_instance.name} (API ID: {expansion_api_id})...")
    cards = fetch_cards_from_api(expansion_api_id)
    if cards:
        save_cards_to_db(cards, expansion_instance)
        logger.info(f"Finished importing {len(cards)} cards for expansion: {expansion_instance.name}.")
    else:
        logger.warning(f"No cards fetched from API for expansion: {expansion_instance.name} (API ID: {expansion_api_id}) to import.")

# Optional: A function to import cards for ALL expansions (useful for bulk initial import)
def import_all_expansions_cards():
    """
    Imports cards for all expansions currently in the database.
    """
    all_expansions = Expansion.objects.all()
    logger.info(f"Starting import of cards for {len(all_expansions)} expansions...")
    for expansion in all_expansions:
        import_cards_for_expansion(expansion.api_id)
    logger.info("Finished importing cards for all expansions.")