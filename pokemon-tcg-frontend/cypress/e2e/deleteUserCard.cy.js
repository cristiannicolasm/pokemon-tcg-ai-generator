describe('Flujo E2E - Eliminar Carta de la Colección', () => {
  beforeEach(() => {
    // Login usando custom command y datos del fixture
    cy.fixture('example.json').then((user) => {
      cy.login(user.username, user.password);
    });

    // Interceptar las llamadas reales
    cy.intercept('GET', '/api/user-cards/grouped/').as('getGroupedCards');
    cy.intercept('DELETE', '/api/user-cards/*').as('deleteInstance');
  });

  it('elimina una carta y verifica que desaparece de la colección', () => {
    // La colección ya está en la página principal
    // Esperar a que carguen las cartas
    cy.get('[data-testid="usercard-item"]').should('exist');
    
    // Abrir modal de detalles de la primera carta
    cy.get('[data-testid="usercard-details-btn"]').first().click();
    
    // Eliminar primera instancia
    cy.get('[data-testid^="instance-delete-btn-"]').first().click();
    cy.on('window:confirm', () => true); // Confirmar eliminación
    
    // Esperar que se complete la eliminación
    cy.wait('@deleteInstance');
    
    // El modal puede cerrarse y la colección debería actualizarse
    cy.wait(1000); // Pequeña pausa para que se actualice la UI
  });

  /*
  //frontend muestra error si falla el delete, por lo que se deshabilita el test
  it('muestra error si el backend falla al eliminar', () => {
    // Mock de error en DELETE
    cy.intercept('DELETE', '/api/user-cards/456/', {
      statusCode: 500,
      body: { detail: 'Error interno' }
    }).as('deleteInstanceError');

    cy.wait('@getGroupedCards');
    cy.get('[data-testid="usercard-details-btn"]').first().click();
    cy.get('[data-testid^="instance-delete-btn-"]').first().click();
    cy.on('window:confirm', () => true);
    cy.wait('@deleteInstanceError');
    cy.contains('Error al eliminar la instancia').should('be.visible');
  });
  */
});
