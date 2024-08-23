describe("2번째 인적사항 e2e 테스트", () => {
  beforeEach(() => cy.viewport(1200, 900));

  it("전공 입력 후 다음 버튼 클릭", () => {
    cy.goSecondPersonalInformation();
    cy.get("input.my-2.border.rounded-lg.p-4.w-full")
      .eq(0)
      .type("컴퓨터정보통신공학과");
    cy.get(
      ".flex-1.rounded-md.flex.justify-center.items-center.p-4.bg-dark.text-white"
    ).click();
  });

  it("전공, 복수전공 입력 후 다음 버튼 클릭", () => {
    cy.goSecondPersonalInformation();
    cy.get("input.my-2.border.rounded-lg.p-4.w-full")
      .eq(0)
      .type("컴퓨터정보통신공학과");
    cy.get("input.my-2.border.rounded-lg.p-4.w-full").eq(1).type("물리학과");
    cy.get(
      ".flex-1.rounded-md.flex.justify-center.items-center.p-4.bg-dark.text-white"
    ).click();
  });
});
