/// <reference types="Cypress" />

describe('template spec', () => {
  it('should navigate between pages', () => {
    cy.visit('http://localhost:5173')

    cy.get('[data-cy="header-about-link"]').click()
    cy.url().should('include', '/about')
    cy.location('pathname').should('eq', '/about')
    
    cy.go('back');
    cy.get('[data-cy="header-about-link"]').click()
    cy.get('[data-cy="header-home-link"]').click()
    cy.url().should('include', '/')
    cy.location('pathname').should('eq', '/')
  })
})