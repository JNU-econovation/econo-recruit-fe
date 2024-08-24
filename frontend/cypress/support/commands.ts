/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    checkLocalStorage(key: string, expectedValue: string): Chainable<void>;
    checkAlert(expectedValue: string): Chainable<void>;
  }
}

Cypress.Commands.add(
  "checkLocalStorage",
  (key: string, expectedValue: string) => {
    cy.window().then((win) => {
      const actualValue = win.localStorage.getItem(key);
      expect(actualValue).to.equal(expectedValue);
    });
  }
);

Cypress.Commands.add("checkAlert", (expectedValue: string) => {
  cy.on("window:alert", (str) => {
    expect(str).to.equal(expectedValue);
  });
});
