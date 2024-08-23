declare namespace Cypress {
  interface Chainable {
    goSecondPersonalInformation(): Chainable<void>;
  }
}

Cypress.Commands.add("goSecondPersonalInformation", () => {
  cy.visit("http://localhost:3000/application");
  cy.get('[for=":R7dmlllkq:"]').click();
  cy.get('[for=":Rblmlllkq:"]').click();
  cy.get('[for=":r1:"]').click();
  cy.get(
    ".flex-1.rounded-md.flex.justify-center.items-center.p-4.bg-dark.text-white"
  ).click(); // 첫번째 인적사항 페이지로 이동
  cy.get("input.my-2.border.rounded-lg.p-4.w-full").eq(0).type("심민보");
  cy.get("input.my-2.border.rounded-lg.p-4.w-full").eq(1).type("01000000000");
  cy.get("input.my-2.border.rounded-lg.p-4.w-full").eq(2).type("111111");
  cy.get("input.my-2.border.rounded-lg.p-4.w-full").eq(3).type("재학");
  cy.get('[for=":rb:"]').click();
  cy.get('[for=":re:"]').click();
  cy.get(
    ".flex-1.rounded-md.flex.justify-center.items-center.p-4.bg-dark.text-white"
  ).click(); // 두번째 인적사항 페이지로 이동
});
