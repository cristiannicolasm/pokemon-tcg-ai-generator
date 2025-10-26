describe('Flujo E2E - Añadir Carta a la Colección', () => {
  beforeEach(() => {
    // Login usando custom command y datos del fixture
    cy.fixture('example.json').then((user) => {
      cy.login(user.username, user.password);
    });
  });

  it('añade una carta y la muestra en la colección', () => {
    // Abre el formulario para añadir carta
    cy.get('[data-testid="addcard-expansion-select"]').select('Base Set 2'); // Selecciona una expansión
    cy.get('[data-testid="addcard-card-select"]').select('Bill'); // Selecciona una carta
    cy.get('[data-testid="addcard-quantity"]').clear().type('1');
    cy.get('[data-testid="addcard-submit"]').click();

    // Verifica que la carta aparece en la colección
    cy.get('[data-testid="usercard-item"]').should('contain', 'Bill'); // Verifica que la carta se añadió
  });

});
