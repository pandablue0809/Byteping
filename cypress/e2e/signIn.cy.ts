/// <reference types="Cypress" />
import { signInJsonTypes } from "../types";

describe("sign in", () => {
  beforeEach(() => {
    cy.viewport(1500, 800);
    cy.clock();
    cy.visit("/");
  });
  it("should test entire sign in functionalities", () => {
    cy.fixture("signIn.json").then((signInJson: signInJsonTypes) => {
      cy.get("[data-cy='companyLogo']").should("have.text", "BYTEPING");
      cy.get("[data-cy='companyMotto']").should("have.text", "IMPRESSIVE EXPERIENCES THAT DELIVER");
      cy.get("[data-cy='signInErrorMessage']").as("signInErrorMessage");
      cy.get("[data-cy='signInEmail']").as("signInEmail");
      cy.get("[data-cy='signInPassword']").as("signInPassword");
      cy.get("[data-cy='signInSubmitButton']").as("signInSubmitButton");
      cy.get("[data-cy='signInGuestButton']").as("signInGuestButton");
      cy.get("[data-cy='signInAndUpTitle']").should("have.text", "Sign In");
      cy.get("@signInSubmitButton").click();
      cy.get("@signInErrorMessage").should("have.text", "Fill your email");
      cy.get("@signInEmail").type(signInJson.email);
      cy.get("@signInSubmitButton").click();
      cy.get("@signInErrorMessage").should("have.text", "Type your secret");
      cy.get("@signInPassword").type(signInJson.wrongPassword);
      cy.get("@signInSubmitButton").click();
      cy.get("@signInErrorMessage").should("have.text", "Failed to sign in");
      cy.get("@signInGuestButton").click();
      cy.get("@signInSubmitButton").click();
      cy.location("pathname").should("eq", "/chats");
      cy.visit("/");
    });
  });
});
