describe("2번째 인적사항 e2e 테스트", () => {
  beforeEach(() => cy.viewport(1200, 900));

  it("전공 입력 후 다음 버튼 클릭하면 기타 질문 사항으로 이동", () => {
    cy.goSecondPersonalInformation();
    cy.get("span")
      .filter((index, element) => Cypress.$(element).text().trim() === "전공*")
      .parent()
      .next("input")
      .should("exist")
      .type("컴퓨터정보통신공학과");
    cy.get("button").contains("다음").should("exist").click();
  });

  it("전공, 복수전공 입력 후 다음 버튼 클릭하면 기타 질문 사항으로 이동", () => {
    cy.goSecondPersonalInformation();
    cy.get("span")
      .filter((index, element) => Cypress.$(element).text().trim() === "전공*")
      .parent()
      .next("input")
      .should("exist")
      .type("컴퓨터정보통신공학과");
    cy.get("span")
      .filter(
        (index, element) => Cypress.$(element).text().trim() === "복수전공"
      )
      .parent()
      .next("input")
      .should("exist")
      .type("건축학과");
    cy.get("button").contains("다음").should("exist").click();
  });

  it("전공, 부전공 입력 후 다음 버튼 클릭하면 기타 질문 사항으로 이동", () => {
    cy.goSecondPersonalInformation();
    cy.get("span")
      .filter((index, element) => Cypress.$(element).text().trim() === "전공*")
      .parent()
      .next("input")
      .should("exist")
      .type("컴퓨터정보통신공학과");
    cy.get("span")
      .filter((index, element) => Cypress.$(element).text().trim() === "부전공")
      .parent()
      .next("input")
      .should("exist")
      .type("물리학과");
    cy.get("button").contains("다음").should("exist").click();
  });

  it("전공, 복수전공, 부전공 입력 후 다음 버튼 클릭하면 기타 질문 사항으로 이동", () => {
    cy.goSecondPersonalInformation();
    cy.get("span")
      .filter((index, element) => Cypress.$(element).text().trim() === "전공*")
      .parent()
      .next("input")
      .should("exist")
      .type("컴퓨터정보통신공학과");
    cy.get("span")
      .filter(
        (index, element) => Cypress.$(element).text().trim() === "복수전공"
      )
      .parent()
      .next("input")
      .should("exist")
      .type("건축학과");
    cy.get("span")
      .filter((index, element) => Cypress.$(element).text().trim() === "부전공")
      .parent()
      .next("input")
      .should("exist")
      .type("물리학과");
    cy.get("button").contains("다음").should("exist").click();
  });

  it("아무것도 입력하지 않고 다음 버튼 클릭하면 '필수 질문을 작성해주세요.'라는 alert창이 보인다.", () => {
    cy.goSecondPersonalInformation();
    cy.get("button").contains("다음").should("exist").click();
    cy.on("window:alert", (text) => {
      console.log("Alert message:", text);
    });
  });

  it("전공을 입력하지 않고 복수전공, 부전공을 입력 후 다음 버튼 클릭하면 '필수 질문을 작성해주세요.'라는 alert창이 보인다.", () => {
    cy.goSecondPersonalInformation();
    cy.get("span")
      .filter(
        (index, element) => Cypress.$(element).text().trim() === "복수전공"
      )
      .parent()
      .next("input")
      .should("exist")
      .type("건축학과");
    cy.get("span")
      .filter((index, element) => Cypress.$(element).text().trim() === "부전공")
      .parent()
      .next("input")
      .should("exist")
      .type("물리학과");
    cy.get("button").contains("다음").should("exist").click();
    cy.on("window:alert", (text) => {
      console.log("Alert message:", text);
    });
  });
});
