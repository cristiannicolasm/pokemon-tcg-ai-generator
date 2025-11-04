describe('Debug Add Card Form', () => {
  beforeEach(() => {
    cy.fixture('example.json').then((user) => {
      cy.login(user.username, user.password);
    });
  });

  it('should show form validation error when no card is selected', () => {
    // Verificar que el formulario esté visible
    cy.get('[data-testid="addcard-expansion-select"]').should('be.visible');
    
    // Seleccionar expansión
    cy.get('[data-testid="addcard-expansion-select"]').select('Base');
    
    // Esperar a que se carguen las cartas
    cy.wait(3000);
    
    // Verificar que hay opciones de cartas disponibles
    cy.get('[data-testid="addcard-card-select"] option').should('have.length.greaterThan', 1);
    
    // Asegurarse de que no hay carta seleccionada (debe estar en "Selecciona una carta")
    cy.get('[data-testid="addcard-card-select"]').should('have.value', '');
    
    // Llenar cantidad
    cy.get('[data-testid="addcard-quantity"]').clear().type('1');
    
    // Hacer click en submit
    cy.get('[data-testid="addcard-submit"]').click();
    
    // Buscar cualquier elemento que contenga el mensaje de error
    cy.get('body').should('contain', 'Debes seleccionar una carta');
    
    // También buscar por la clase específica
    cy.get('.form-message').should('exist');
    
    // Debug: Tomar screenshot
    cy.screenshot('validation-error-state');
  });
});