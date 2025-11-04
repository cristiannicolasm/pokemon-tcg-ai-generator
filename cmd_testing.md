#### Comandos Backend Tests 
- **Tests de autenticación:** `docker exec -it pokemon-tcg-ai-generator-web-1 pytest pokemon_tcg_ai/auth_api/test_auth.py -v`
- **Tests de integración:** `docker exec -it pokemon-tcg-ai-generator-web-1 pytest collection_manager/tests/test_integration.py -v`
- **Tests agrupados:** `docker exec -it pokemon-tcg-ai-generator-web-1 pytest collection_manager/tests/test_user_cards_grouped.py -v`
- **Todos los tests backend:** `docker exec -it pokemon-tcg-ai-generator-web-1 pytest -v`

#### Comandos Frontend Tests
- **Todos los tests frontend:** `npm test -- --watchAll=false`
- **Tests específicos de Login:** `npm test -- --testNamePattern="Login" --watchAll=false`
- **Tests específicos de Register:** `npm test -- --testNamePattern="Register" --watchAll=false`
- **Con coverage:** `npm test -- --watchAll=false --coverage`
- **Tests E2E con Cypress (UI):** `npm run test:e2e:open`
- **Tests E2E headless:** `npm run test:e2e`