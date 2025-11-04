describe('Debug Collection Loading', () => {
  it('should load collection successfully after login', () => {
    cy.visit('/');
    
    // Hacer login
    cy.get('[data-testid="login-username"]').type('testuser');
    cy.get('[data-testid="login-password"]').type('testpass123');
    cy.get('[data-testid="login-submit"]').click();
    
    // Verificar login exitoso
    cy.contains('¡Bienvenido! Has iniciado sesión exitosamente.').should('be.visible');
    
    // Interceptar la petición correcta a user-cards/grouped/
    cy.intercept('GET', '**/user-cards/grouped/').as('getGroupedCards');
    
    // Esperar un poco para la carga inicial
    cy.wait(2000);
    
    // Verificar si se hace la petición correcta
    cy.wait('@getGroupedCards').then((interception) => {
      cy.log('Petición interceptada:', interception.request.url);
      expect(interception.response.statusCode).to.eq(200);
    });
    
    // Buscar elementos de colección
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="usercard-item"]').length > 0) {
        cy.log('✅ Cartas encontradas');
        cy.get('[data-testid="usercard-item"]').should('have.length.greaterThan', 0);
      } else {
        cy.log('❌ No se encontraron cartas');
        // Verificar si hay mensajes de error o estado
        cy.contains('Cargando').should('not.exist');
        cy.get('body').should('contain', 'Mi Colección Pokémon');
      }
    });
    
    cy.screenshot('collection-after-login');
  });
});