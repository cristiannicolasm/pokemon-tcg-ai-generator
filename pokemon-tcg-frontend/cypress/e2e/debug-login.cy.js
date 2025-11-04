describe('Debug Login Process', () => {
  it('should login successfully and show debugging info', () => {
    cy.visit('/');
    
    // Verificar que estamos en la página de login
    cy.get('[data-testid="login-username"]').should('be.visible');
    
    // Hacer login
    cy.get('[data-testid="login-username"]').type('testuser');
    cy.get('[data-testid="login-password"]').type('testpass123');
    cy.get('[data-testid="login-submit"]').click();
    
    // Verificar que el login fue exitoso
    cy.contains('¡Bienvenido! Has iniciado sesión exitosamente.').should('be.visible');
    
    // Verificar que el token se guardó en localStorage
    cy.window().then((win) => {
      const token = win.localStorage.getItem('access_token');
      expect(token).to.exist;
      cy.log('Token guardado:', token);
    });
    
    // Esperar un poco para que cargue la colección
    cy.wait(3000);
    
    // Verificar si aparecen elementos de la colección O el mensaje de carga
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="usercard-item"]').length > 0) {
        cy.log('✅ Cartas encontradas en la colección');
        cy.get('[data-testid="usercard-item"]').should('be.visible');
      } else if ($body.text().includes('Cargando tu colección')) {
        cy.log('⏳ Colección aún cargando');
      } else if ($body.text().includes('No tienes cartas')) {
        cy.log('📭 Colección vacía');
      } else if ($body.text().includes('Error')) {
        cy.log('❌ Error cargando colección');
      } else {
        cy.log('🤔 Estado desconocido de la colección');
      }
    });
    
    // Tomar screenshot para debug
    cy.screenshot('debug-after-login');
  });
});