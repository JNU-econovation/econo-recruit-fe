/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    checkLocalStorage(key: string, expectedValue: string): Chainable<void>;
    checkAlert(expectedValue: string): Chainable<void>;
    goSecondPersonalInformation(): Chainable<void>;
    goOtherQuestions(): Chainable<void>;
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

Cypress.Commands.add("goSecondPersonalInformation", () => {
  cy.clearAllLocalStorage();
  cy.visit("http://localhost:3000/application");
  cy.get("label").contains("개발자").should("exist").click();
  cy.get("span")
    .contains("1순위")
    .next()
    .contains("label", "APP")
    .should("exist")
    .click();
  cy.wait(1000);
  cy.get("span")
    .filter((index, element) => Cypress.$(element).text().trim() === "2순위")
    .next()
    .contains("label", "WEB")
    .should("exist")
    .click();
  cy.get("button").contains("다음").should("exist").click();
  cy.get("span")
    .contains("이름")
    .parent()
    .next()
    .type("심민보")
    .invoke("val")
    .should("satisfy", (value) => value.length <= 5);
  cy.get("span")
    .contains("연락처")
    .parent()
    .next()
    .type("00000000000")
    .invoke("val")
    .should("match", /^\d{3}-\d{4}-\d{4}$/);
  cy.get("span")
    .contains("학번")
    .parent()
    .next()
    .type("123456")
    .invoke("val")
    .should("match", /^\d{6}$/);
  cy.get("span")
    .contains("학적상태")
    .parent()
    .next()
    .type("재학")
    .invoke("val")
    .should("satisfy", (value) => value.length >= 1);
  cy.get("label").contains("4학년").should("exist").click();
  cy.get("label").contains("2학기").should("exist").click();
  cy.get("button").contains("다음").should("exist").click();
});

Cypress.Commands.add("goOtherQuestions", () => {
  cy.goSecondPersonalInformation();
  cy.get("span")
    .filter((index, element) => Cypress.$(element).text().trim() === "전공*")
    .parent()
    .next("input")
    .type("컴퓨터정보통신공학과");

  cy.get("button").contains("다음").click();
});
