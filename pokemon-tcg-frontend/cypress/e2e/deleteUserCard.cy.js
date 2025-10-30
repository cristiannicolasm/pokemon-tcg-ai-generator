describe('Flujo E2E - Eliminar Carta de la Colección', () => {
  beforeEach(() => {
    // Login usando custom command y datos del fixture
    cy.fixture('example.json').then((user) => {
      cy.login(user.username, user.password);
    });

    // Mock para obtener la colección con una carta
    cy.intercept('GET', '/api/user-cards/grouped/', {
      statusCode: 200,
      body: [
        {
          card_id: 123,
          card_name: 'Bill',
          expansion_id: 1,
          expansion_name: 'Base Set 2',
          card_image: 'https://images.pokemontcg.io/base2/91.png',
          total_quantity: 1,
          instances_count: 1,
          is_any_favorite: false,
          instances: [
            {
              id: 456,
              quantity: 1,
              language: 'EN',
              condition: 'NM',
              is_holographic: false,
              is_first_edition: false,
              is_favorite: false
            }
          ]
        }
      ]
    }).as('getGroupedCards');

    // Mock para eliminar la instancia
    cy.intercept('DELETE', '/api/user-cards/456/', {
      statusCode: 204
    }).as('deleteInstance');
  });

  it('elimina una carta y verifica que desaparece de la colección', () => {
    cy.visit('/coleccion');
    cy.wait('@getGroupedCards');
    cy.get('[data-testid="usercard-details-btn"]').first().click();
    cy.get('[data-testid^="instance-delete-btn-"]').first().click();
    cy.on('window:confirm', () => true); // Simula confirmación
    cy.wait('@deleteInstance');
    // Verifica que el modal se cierra y la carta ya no está en la colección
    cy.get('[data-testid="usercard-item"]').should('not.exist');
  });

  it('muestra error si el backend falla al eliminar', () => {
    // Mock de error en DELETE
    cy.intercept('DELETE', '/api/user-cards/456/', {
      statusCode: 500,
      body: { detail: 'Error interno' }
    }).as('deleteInstanceError');

    cy.visit('/coleccion');
    cy.wait('@getGroupedCards');
    cy.get('[data-testid="usercard-details-btn"]').first().click();
    cy.get('[data-testid^="instance-delete-btn-"]').first().click();
    cy.on('window:confirm', () => true);
    cy.wait('@deleteInstanceError');
    cy.contains('Error al eliminar la instancia').should('be.visible');
  });
});
