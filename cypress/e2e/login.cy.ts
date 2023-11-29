describe("template spec", () => {
  it("Visit landing page", () => {
    cy.viewport("macbook-16");
    cy.visit("http://localhost:3000/");
    cy.get(".hero-img-logo p").should("have.text", "BYTEPING");
  });
});
