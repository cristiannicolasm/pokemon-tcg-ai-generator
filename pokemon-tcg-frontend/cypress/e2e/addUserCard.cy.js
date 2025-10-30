describe('Flujo E2E - Añadir Carta a la Colección', () => {
  beforeEach(() => {
    // Login usando custom command y datos del fixture
    cy.fixture('example.json').then((user) => {
      cy.login(user.username, user.password);
    });

    // Mock de la API para añadir carta
    cy.intercept('POST', '/api/user-cards/add/', {
      statusCode: 201,
      body: {
        id: 123,
        card_name: 'Bill',
        expansion: 'Base Set 2',
        quantity: 1
      }
    }).as('addCard');

    // Mock para obtener la colección actualizada
    cy.intercept('GET', '/api/user-cards/', {
      statusCode: 200,
      body: [
        {
          id: 123,
          card_name: 'Bill',
          expansion: 'Base Set 2',
          quantity: 1
        }
      ]
    }).as('getCards');
  });

  it('añade una carta y la muestra en la colección', () => {
    // Abre el formulario para añadir carta
    cy.get('[data-testid="addcard-expansion-select"]').select('Base Set 2'); // Selecciona una expansión
    cy.get('[data-testid="addcard-card-select"]').select('Bill'); // Selecciona una carta
    cy.get('[data-testid="addcard-quantity"]').clear().type('1');
    cy.get('[data-testid="addcard-submit"]').click();

    // Espera a que el mock de añadir carta se ejecute
    cy.wait('@addCard');
    // Verifica que la carta aparece en la colección (mockeada)
    cy.get('[data-testid="usercard-item"]').should('contain', 'Bill');
  });

  it('muestra error si se intenta añadir sin seleccionar carta', () => {
    // Selecciona expansión pero no carta
    cy.get('[data-testid="addcard-expansion-select"]').select('Base Set 2');
    cy.get('[data-testid="addcard-card-select"]').select(''); // No selecciona carta
    cy.get('[data-testid="addcard-quantity"]').clear().type('1');
    cy.get('[data-testid="addcard-submit"]').click();

    cy.contains('Selecciona una carta').should('be.visible');
  });
});
