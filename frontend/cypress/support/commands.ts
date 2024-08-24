declare namespace Cypress {
  interface Chainable {
    goSecondPersonalInformation(): Chainable<void>;
  }
}

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
  cy.get("span")
    .contains("1순위")
    .next()
    .next()
    .next()
    .contains("label", "WEB")
    .should("exist")
    .click();
  cy.get("button").contains("다음").should("exist").click();
  cy.get("span").contains("이름").parent().next().type("심민보");
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
  cy.get("span").contains("학적상태").parent().next().type("재학");
  cy.get("label").contains("4학년").should("exist").click();
  cy.get("label").contains("2학기").should("exist").click();
  cy.get("button").contains("다음").should("exist").click();
});
