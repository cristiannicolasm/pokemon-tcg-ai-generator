/**
 * Test de Verificación de Setup
 * 
 * Este test verifica que:
 * 1. Cypress está configurado correctamente
 * 2. El frontend está corriendo
 * 3. Cypress puede acceder a la aplicación
 */
describe('Verificación de Setup de Cypress', () => {
  
  it('debe poder acceder al frontend en localhost:5173', () => {
    // Visitar la página principal
    cy.visit('http://localhost:5173')
    
    // Verificar que la página cargó
    cy.url().should('include', 'localhost:5173')
  })
  
  it('debe poder encontrar elementos básicos de la app', () => {
    cy.visit('http://localhost:5173')
    
    // Verificar que existe algún elemento (ajusta según tu app)
    cy.get('body').should('be.visible')
    
    // Si tiene un título o logo, verifica que exista
    // cy.contains('Pokemon TCG').should('be.visible')
  })
  
  it('cypress está funcionando correctamente', () => {
    // Test simple que siempre pasa
    expect(true).to.be.true
    
    cy.log('✅ Cypress está configurado correctamente')
  })
})