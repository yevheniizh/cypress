/// <reference types="Cypress" />

describe('tasks page', () => {
  it('should open and close the new task modal', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('.backdrop').click({ force: true });
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');

    cy.contains('Add Task').click();
    cy.contains('Cancel').click();
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');
  })

  it('should create a new task', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('#title').type('My New Task');
    cy.get('#summary').type('My New Task Description');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);
    cy.get('.task h2').contains('My New Task');
    cy.get('.task p').contains('My New Task Description');
  })

  it('should validate text input', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('.modal').contains('Add Task').click();
    cy.get('.modal').contains('Please provide values');
  })

  it('should filter tasks', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('#title').type('My New Task');
    cy.get('#summary').type('My New Task Description');
    cy.get('#category').select('urgent');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);

    cy.get('#filter').select('moderate');
    cy.get('.task').should('not.exist');
  })

  it('should add multiple tasks', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('#title').type('My New Task');
    cy.get('#summary').type('My New Task Description');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);

    cy.contains('Add Task').click();
    cy.get('#title').type('My New Task 2');
    cy.get('#summary').type('My New Task Description 2');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 2);

    cy.get('.task').eq(0).contains('My New Task');
    cy.get('.task').eq(1).contains('My New Task 2');
  })
})