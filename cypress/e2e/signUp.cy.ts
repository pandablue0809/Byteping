/// <reference types="Cypress" />

describe("sign up", { browser: "chrome" }, () => {
  beforeEach(() => {
    cy.fixture("signUp.json").as("signUpJson");
    cy.clock();
    cy.viewport(1500, 800);
    cy.visit("/");
  });
  it("should test entire sign up functionalities", () => {
    cy.get("[data-cy='registerHereButton']").should("have.text", "Register here !");
    cy.get("[data-cy='registerHereButton']").click();
    cy.get("[data-cy='signInAndUpTitle']").contains("Sign Up");
    cy.get("[data-cy='signUpName']").focus().blur();
    cy.get("[data-cy='signUpSubmitButton']").click();
    cy.get("[data-cy='signUpErrorMessage']").should("have.text", "Please type your name");
    cy.get("[data-cy='signUpName']").type("Adrian");
    cy.get("[data-cy='signUpSubmitButton']").click();
    cy.get("[data-cy='signUpErrorMessage']").should("have.text", "Please type your email");
    cy.get("[data-cy='signUpEmail']").type("adrian@gmail.com");
    cy.get("[data-cy='signUpSubmitButton']").click();
    cy.get("[data-cy='signUpErrorMessage']").should("have.text", "Please type your password");
    cy.get("[data-cy='signUpPassword']").type("123456");
    cy.get("[data-cy='signUpSubmitButton']").click();
    cy.get("[data-cy='signUpErrorMessage']").should("have.text", "Please confirm your password");
    cy.get("[data-cy='signUpConfirmPassword']").type("adcdfe");
    cy.get("[data-cy='signUpSubmitButton']").click();
    cy.get("[data-cy='signUpErrorMessage']").should("have.text", "Please upload your picture");
    cy.get("[data-cy='signUpImageUploadLabel']").should("have.text", "Upload your image");
    cy.get("[data-cy='signUpImageUpload']").selectFile("cypress/images/brad.jpg", { force: true });
    cy.get("[data-cy='signUpImageUploadLabel']").should("have.text", "Profile picture uploaded successfully");
    cy.get("[data-cy='signUpSubmitButton']").click({ force: true });
    cy.get("[data-cy='signUpErrorMessage']").should("have.text", "Password is not matching");
    cy.get("[data-cy='signUpConfirmPassword']").type("123456");
    cy.get("[data-cy='signUpSubmitButton']").should("have.text", "Sign Up");
    cy.get("[data-cy='signUpSubmitButton']").click();
    cy.get("[data-cy='signUpSubmitButton']").should("have.text", "Loading");
    cy.location("pathname").should("eq", "/chats");
    cy.screenshot("signUp");
  });
});
