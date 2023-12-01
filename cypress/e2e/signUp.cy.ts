/// <reference types="Cypress" />

describe("sign up", () => {
  it("should be able to click Register here ! for signing up to the application", () => {
    cy.visit("http://localhost:3000/");
    // cy.get(".signin-signup p span").click({ force: true });
    cy.get(".signin-signup p span").contains("Register here !").click();
    cy.get(".signin-signup p:first-child").should("not.have.text", "Sign In");
    cy.get(".signin-signup p:first-child").should("have.text", "Sign Up");
    cy.get("[data-cy='signUpName']").type("Lee");
    cy.get("[data-cy='signUpEmail']").type("lee@gmail.com");
    cy.get("[data-cy='signUpPassword']").type("123456");
    cy.get("[data-cy='signUpConfirmPassword']").type("123456");
    cy.get("[data-cy='signUpImageUpload']").selectFile("../../public/images/brad.jpg");
    cy.get(".sign-up .signUpSubmit").contains("Sign Up").click();
  });
});
