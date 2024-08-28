describe("참가자 지원 동기 질문 페이지 e2e 테스트", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();

    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/application");

    // 희망 분야 페이지
    cy.get("label").contains("개발자").parent().as("occupation");
    cy.contains("1순위").parent().as("firstChapter");
    cy.get("nav").as("questionTitleNavbar");
    cy.get("button").contains("다음").as("nextButton");
    cy.get("button").contains("이전").as("prevButton");

    cy.get("@occupation").find("label").contains("개발자").click();
    cy.get("@firstChapter").find("label").contains("APP").click();
    cy.contains("선택없음").parent().as("secondChapter");
    cy.get("@secondChapter").find("label").contains("WEB").click();
    cy.get("@nextButton").should("exist").click();

    // 기본 인적사항 페이지
    cy.get("input").first().as("nameInput");
    cy.get("input").eq(1).as("phoneInput");
    cy.get("input").eq(2).as("studentIdInput");
    cy.get("input").eq(3).as("academicStatusInput");
    cy.get("label").contains("4학년").as("fourthGradeLabel");

    cy.get("@nameInput").type("김아무개");
    cy.get("@phoneInput").type("01012341234");
    cy.get("@studentIdInput").type("123456");
    cy.get("@academicStatusInput").type("재학");
    cy.get("@fourthGradeLabel").click();
    cy.get("label").contains(/학기/).eq(0).click();
    cy.get("@nextButton").should("exist").click();

    // 기본 인적사항 2번째 페이지
    cy.get("input").eq(0).as("major");
    cy.get("input").eq(1).as("revengeMajor");
    cy.get("input").eq(2).as("minor");

    cy.get("@major").type("컴퓨터정보통신공학과");
    cy.get("@revengeMajor").type("건축학과");
    cy.get("@minor").type("물리학과");
    cy.get("@nextButton").should("exist").click();
  });

  it("테스트 뭐하지?", () => {
    expect(true).to.be.true;
  });
});
