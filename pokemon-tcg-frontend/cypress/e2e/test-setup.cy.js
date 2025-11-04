/**
 * Test de Verificación de Setup
 * 
 * Este test verifica que:
 * 1. Cypress está configurado correctamente
 * 2. El frontend está corriendo
 * 3. Cypress puede acceder a la aplicación
 */
describe('Verificación de Setup de Cypress', () => {
  it('debe poder acceder al frontend', () => {
    cy.visit('/')
    cy.url().should('include', '/')
  })

  it('debe poder encontrar elementos básicos de la app', () => {
    cy.visit('/')
    cy.get('body').should('be.visible')
    // cy.contains('Pokemon TCG').should('be.visible')
  })

  it('cypress está funcionando correctamente', () => {
    expect(true).to.be.true
    cy.log('✅ Cypress está configurado correctamente')
  })
})