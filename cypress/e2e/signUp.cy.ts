/// <reference types="Cypress" />

describe(
  "sign up",
  {
    defaultCommandTimeout: 10000,
    browser: "chrome"
  },
  () => {
    beforeEach(() => {
      cy.fixture("signUp.json").as("signUpJson");
      cy.clock();
      // cy.tick(2000);
      cy.visit("/").then((win) => {
        cy.get("@signUpJson").then((signUpJson) => {
          cy.stub(win.navigator.geolocation, "getCurrentPosition")
            .as("getUserPosition")
            .callsFake((cb) => {
              setTimeout(() => {
                cb({ signUpJson });
              }, 100);
            });
        });
      });
    });
    cy.get("@getUserPosition").should("have.been.called");
    it("should be able to click Register here ! for signing up to the application", () => {
      cy.visit("http://localhost:3000/");
      cy.task("seedDatabase", "arjunank.json").then((returnValue) => {
        console.log(returnValue);
      });
      // cy.get(".signin-signup p span").click({ force: true });
      cy.get("[data-cy='registerHereButton']").then((el) => {
        expect(el.text("Register Here !"));
      });
      cy.get("[data-cy='registerHereButton']").click();
      // cy.get("[data-cy='signInAndUpTitle']").should("have.text", "Sign Up");
      // cy.get("[data-cy='signInAndUpTitle']").should("not.have.text", "Sign In");
      // cy.submitForm();
      cy.get("[data-cy='signUpSubmitButton']").as("submitButton");
      cy.get("[data-cy='signUpName']").focus().blur();
      cy.get("@submitButton")
        .contains("Sign Up")
        .click()
        .then((el) => {
          expect(el.text("Sign Up"));
        });
      cy.get("[data-cy='signUpErrorMessage']").should("have.class", "signUpErrorMessage");
      cy.get("[data-cy='signUpName']").type("Lee");
      cy.get("[data-cy='signUpEmail']").type("lee@gmail.com");
      cy.get("[data-cy='signUpPassword']").type("123456");
      cy.get("[data-cy='signUpConfirmPassword']").type("123456{enter}");
      // cy.get("[data-cy='signUpImageUpload']").selectFile("../../public/images/brad.jpg");
      // cy.get("@submitButton").contains("Sign Up").click().and("have.text", "Loading");
      cy.get("@submitButton")
        .contains("Sign Up")
        .click()
        .then((el) => {
          expect(el.text("Sign Up"));
        });
      cy.get("[data-cy='signUpErrorMessage']").should("have.class", "signUpErrorMessage");
    });
  }
);
