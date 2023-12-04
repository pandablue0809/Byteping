/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>;
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>;
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable {
    // submitForm(): Chainable<void>;
    // getByDataCyAttr(dataCyAttr: string): Chainable<Promise<any> | ((subject: any) => any)>;
    // dataCy(dataCyAttr: string): Chainable<JQuery<HTMLElement>>;
  }
}

// Cypress.Commands.add("submitForm", () => {
//   cy.get("[data-cy='signUpSubmitButton']").click();
// });

// Cypress.Commands.add("dataCy", (dataCyAttr: string) => {
//   return cy.get(`[data-cy=${dataCyAttr}]`) as Cypress.Chainable<JQuery<HTMLElement>>;
// });
