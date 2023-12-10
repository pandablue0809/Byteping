/// <reference types="Cypress" />
import { signInJsonTypes } from "../types";

describe("sign in", () => {
  beforeEach(() => {
    cy.viewport(1500, 800);
    cy.clock();
    cy.visit("/");
  });
  it("should test entire sign in functionalities", () => {
    cy.fixture("signIn.json").then((signInJson: signInJsonTypes) => {});
    cy.get("[data-cy='signInErrorMessage']").as("signInErrorMessage");
    cy.get("[data-cy='signInEmail']").as("signInEmail");
    cy.get("[data-cy='signInPassword']").as("signInPassword");
    cy.get("[data-cy='signInSubmitButton']").as("signInSubmitButton");
    cy.get("[data-cy='signInGuestButton']").as("signInGuestButton");
    cy.get("@signInErrorMessage").should("have.text", "Fill your email");
    cy.get("@signInSubmitButton").click();
    cy.get("@signInErrorMessage").should("have.text", "Type your secret");
  });
});
