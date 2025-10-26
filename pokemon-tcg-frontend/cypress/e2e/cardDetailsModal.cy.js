describe('CardDetailsModal - Acciones de instancia', () => {
  beforeEach(() => {
    // Login usando custom command y datos del fixture
    cy.fixture('example.json').then((user) => {
      cy.login(user.username, user.password);
    });
    // Espera a que la colección cargue y abre el modal de detalles
    cy.get('[data-testid="usercard-details-btn"]').first().click();
  });

  it('muestra los botones de favorito y eliminar para cada instancia', () => {
    cy.get('[data-testid^="instance-favorite-btn-"]').should('exist');
    cy.get('[data-testid^="instance-delete-btn-"]').should('exist');
  });

  it('puede marcar y desmarcar como favorito', () => {
    cy.get('[data-testid^="instance-favorite-btn-"]').first().click();
  });

  /*
  //Elimina la primera carta listada en la colección
  it('puede eliminar una instancia', () => {
    cy.get('[data-testid^="instance-delete-btn-"]').first().click();
    // Simula confirmación si tu app la requiere
    cy.on('window:confirm', () => true);
    // Verifica que la instancia desaparece o el modal se cierra
  });
  */
});