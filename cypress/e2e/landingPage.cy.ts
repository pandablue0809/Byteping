/// <reference types="Cypress" />

describe("landing page", () => {
  it("should render a landing page in macbook-16 viewport", () => {
    cy.viewport("macbook-16");
    cy.visit("http://localhost:3000/");
  });
  it("should have a BYTEPING logo text", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".hero-img-logo p").should("have.text", "BYTEPING");
    cy.get(".hero-img-logo p").contains("BYTEPING");
    cy.get(".hero-img-logo p").should("have.length", 1);
    cy.get(".hero-img-logo").find("p").should("have.text", "BYTEPING");
    cy.contains("BYTEPING");
  });
});
