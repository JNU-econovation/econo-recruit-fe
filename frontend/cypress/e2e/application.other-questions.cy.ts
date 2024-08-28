describe("기타 질문 사항 e2e 테스트", () => {
  beforeEach(() => {
    cy.viewport(1200, 900);

    cy.goOtherQuestions();

    cy.get("label")
      .contains(
        "학업 외에 병행하고 있거나 향후 계획 중에 있는 활동이 있으시다면 서술해 주세요.*"
      )
      .parent()
      .next("input")
      .as("plan");

    cy.get("span")
      .contains("지원 경로(중복 선택 가능)*")
      .parent()
      .next()
      .contains("label", "학과 공지사항")
      .as("announcement");

    cy.get("span")
      .contains("지원 경로(중복 선택 가능)*")
      .parent()
      .next()
      .contains("label", "인스타그램")
      .as("instagram");

    cy.get("span")
      .contains("지원 경로(중복 선택 가능)*")
      .parent()
      .next()
      .contains("label", "기타")
      .as("etc");

    cy.get("span")
      .contains("자기소개 및 에코노베이션에 지원하게 된 계기를 서술해 주세요.")
      .as("nextPage");

    cy.get("button").contains("다음").as("nextButton");
  });

  it("사용자는 향후 계획활동을 기입할 수 있다.", () => {
    cy.get("@plan").type("프로젝트").should("have.value", "프로젝트").clear();
  });

  it("사용자는 지원 경로를 중복으로 선택가능하다.", () => {
    cy.get("@announcement").click();
    cy.get("@instagram").click();
    cy.get("@announcement")
      .should("have.class", "text-white")
      .click()
      .should("not.have.class", "text-white");
    cy.get("@instagram")
      .should("have.class", "text-white")
      .click()
      .should("not.have.class", "text-white");
  });

  it("사용자는 지원 경로에서 기타를 선택할 경우 기타 지원 경로에 관한 내용을 입력할 수 있다.", () => {
    cy.get("@etc").click();
    cy.get('input[placeholder="내용을 입력해주세요."]')
      .type("dev")
      .should("have.value", "dev")
      .clear();
    cy.get("@etc").should("have.class", "text-white").click();
  });

  it("사용자는 아무것도 작성 및 선택하지 말고 다음버튼을 누를 시, “필수 질문을 작성해주세요.”라는 alert창이 뜬다.", () => {
    cy.get("@nextButton").click();
    cy.checkAlert("필수 질문을 작성해주세요.");
  });

  it("사용자는 향후 계획활동을 기입하지 않고 다음버튼을 누를 시, “필수 질문을 작성해주세요.”라는 alert창이 뜬다. (지원경로 선택 = true)", () => {
    cy.get("@announcement").click();
    cy.get("@nextButton").click();
    cy.checkAlert("필수 질문을 작성해주세요.");
  });

  it("사용자는 지원경로를 선택하지 않고 다음버튼을 누를 시, “지원경로를 선택해주세요.”라는 alert창이 뜬다. (향후 계획활동 작성 = true)", () => {
    cy.get("@plan").type("프로젝트").should("have.value", "프로젝트");
    cy.get("@nextButton").click();
    cy.checkAlert("지원 경로를 선택해주세요.");
  });

  it("사용자는 지원경로 중 “기타” 만 선택하고 다음버튼을 누를 시, “지원경로를 선택해주세요.”라는 alert창이 뜬다. (향후 계획활동 작성 = true)", () => {
    cy.get("@plan").type("프로젝트").should("have.value", "프로젝트");
    cy.get("@etc").click();
    cy.get("@nextButton").click();
    cy.checkAlert("지원 경로를 선택해주세요.");
  });

  it("사용자는 “기타”가 아닌 지원경로 하나 이상과, “기타”를 선택하고 다음버튼을 누를 시, 다음 페이지로 넘어간다. (향후 계획활동 작성 = true, 지원경로 선택 = true )", () => {
    cy.get("@plan").type("프로젝트").should("have.value", "프로젝트");
    cy.get("@announcement").click();
    cy.get("@etc").click();
    cy.get("@nextButton").click();
    cy.get("@nextPage").should("have.class", "text-black");
  });

  it("사용자는 지원경로 중 “기타”만 선택하고 기타에 관한 내용을 기입한 이후, 다음 버튼을 누를 시, 다음페이지로 넘어간다. (향후 계획활동 작성 = true, 지원 경로 선택 = true)", () => {
    cy.get("@plan").type("프로젝트").should("have.value", "프로젝트");
    cy.get("@etc").click();
    cy.get('input[placeholder="내용을 입력해주세요."]').type("dev");
    cy.get("@nextButton").click();
    cy.get("@nextPage").should("have.class", "text-black");
  });
});
