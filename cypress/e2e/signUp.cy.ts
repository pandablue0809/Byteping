/// <reference types="Cypress" />

describe("sign up", () => {
  it("should be able to sign up to the application", () => {
    cy.visit("http://localhost:3000/");
    // cy.get(".signin-signup p span").click({ force: true });
    cy.get(".signin-signup p span").contains("Register here !").click();
    cy.get(".signin-signup p:first-child").should("not.have.text", "Sign In");
    cy.get(".signin-signup p:first-child").should("have.text", "Sign Up");
  });
});
