/// <reference types="Cypress" />

describe("contact form", () => {
  before(() => {
    // Runs only once before all tests
  });
  beforeEach(() => {
    // Runs before each test
    cy.visit("/about"); // http://localhost:5173/about
  });
  afterEach(() => {
    // Runs after each test
  });
  after(() => {
    // Runs only once after all tests
  });

  it("should submit the form", () => {
    cy.task("seedDatabase", "filename.csv").then((returnValue) => {
      // use return value here
    });
    cy.getById("contact-input-message").type("Hello World!");
    cy.getById("contact-input-name").type("John Doe");
    cy.getById("contact-btn-submit").then(($btn) => {
      // special then method
      expect($btn.attr("disabled")).to.be.undefined;
      expect($btn.text()).to.contain("Send Message");
    });

    cy.getById("contact-input-email").type("test@test.com");
    cy.submitForm();

    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains("Send Message")
    //   .and("not.have.attr", "disabled"); // and alternative to should

    cy.getById("contact-btn-submit").as("submitBtn");
    cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').then(($btn) => {
      expect($btn).to.not.have.attr("disabled");
      expect($btn).to.not.equal("Sending...");
    });
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
    cy.screenshot();
    cy.get('[data-cy="contact-input-message"]').blur();
    cy.get('[data-cy="contact-input-message"]')
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);
    // .then(($parent) => { // alternative to "should"
    //   expect($parent.attr("class")).to.contains("invalid");
    // });
    cy.screenshot();

    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);
    // .then(($parent) => { // alternative to "should"
    //   expect($parent.attr("class")).to.contains("invalid");
    // });

    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).contains("invalid");
      });
    // .then(($parent) => { // alternative to "should"
    //   expect($parent.attr("class")).to.contains("invalid");
    // });
  });
});
