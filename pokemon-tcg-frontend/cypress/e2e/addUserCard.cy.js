describe('Flujo E2E - Añadir Carta a la Colección', () => {
  beforeEach(() => {
    // Login usando custom command y datos del fixture
    cy.fixture('example.json').then((user) => {
      cy.login(user.username, user.password);
    });

    // Interceptar llamadas a API reales (sin el /api/ duplicado)
    cy.intercept('POST', '**/user-cards/add/').as('addCard');
    cy.intercept('GET', '**/user-cards/grouped/').as('getGroupedCards');
  });

  it('añade una carta y la muestra en la colección', () => {
    // Ya estamos en la página principal después del login
    // Los elementos deberían estar visibles
    cy.get('[data-testid="addcard-expansion-select"]').should('be.visible');
    
    // Abre el formulario para añadir carta
    cy.get('[data-testid="addcard-expansion-select"]').select('Base'); // Usar expansión real
    cy.get('[data-testid="addcard-card-select"]').select('Charizard'); // Usar carta real
    cy.get('[data-testid="addcard-quantity"]').clear().type('1');
    cy.get('[data-testid="addcard-submit"]').click();

    // Espera a que la carta se añada
    cy.wait('@addCard');
    
    // Esperar un poco para que se recargue la colección
    cy.wait(1000);
    
    // Verifica que la carta aparece en la colección (en la misma página)
    cy.get('[data-testid="usercard-item"]').should('contain', 'Charizard');
  });

  it('muestra error si se intenta añadir sin seleccionar carta', () => {
    // Los elementos están en la misma página
    cy.get('[data-testid="addcard-expansion-select"]').should('be.visible');
    
    // Selecciona expansión pero no carta
    cy.get('[data-testid="addcard-expansion-select"]').select('Base');
    
    // Esperar a que aparezcan las opciones de cartas
    cy.get('[data-testid="addcard-card-select"]').should('be.visible');
    cy.wait(2000); // Tiempo para que se carguen las cartas
    
    // No seleccionar carta (dejar en "Selecciona una carta"), solo cantidad
    cy.get('[data-testid="addcard-quantity"]').clear().type('1');
    cy.get('[data-testid="addcard-submit"]').click();

    // Verificar que aparece el mensaje de error
    cy.get('.form-message', { timeout: 5000 }).should('contain', 'Debes seleccionar una carta');
  });
});
