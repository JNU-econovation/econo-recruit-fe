const MAX_LENGTH = 1000;

describe("참가자 지원 동기 질문 페이지 e2e 테스트", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("/application");

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
    cy.wait(100);

    // 기본 인적사항 페이지
    cy.get("input").first().as("nameInput");
    cy.get("input").eq(1).as("phoneInput");
    cy.get("input").eq(2).as("studentIdInput");
    cy.get("input").eq(3).as("academicStatusInput");
    cy.get("label").contains("4학년").as("fourthGradeLabel");

    cy.get("@nameInput").type("홍길동");
    cy.get("@phoneInput").type("01012341234");
    cy.get("@studentIdInput").type("123456");
    cy.get("@academicStatusInput").type("재학");
    cy.get("@fourthGradeLabel").click();
    cy.get("label").contains(/학기/).eq(0).click();
    cy.get("@nextButton").should("exist").click();
    cy.wait(100);

    // 기본 인적사항 2번째 페이지
    cy.get("input").eq(0).as("major");
    cy.get("input").eq(1).as("revengeMajor");
    cy.get("input").eq(2).as("minor");

    cy.get("@major").type("철학과");
    cy.get("@revengeMajor").type("건축학과");
    cy.get("@minor").type("물리학과");
    cy.get("@nextButton").should("exist").click();
    cy.wait(100);

    // 기타 질문 페이지
    cy.get("input").eq(0).as("futurePlanInput");
    cy.get("label").contains("학과 공지사항").as("applyRouteLabel");

    cy.get("@futurePlanInput").type("없음");
    cy.get("@applyRouteLabel").click();
    cy.get("@nextButton").should("exist").click();
    cy.wait(100);

    // 지원 동기 페이지 (테스트 하고자 하는 페이지)
    cy.get("textarea").as("motivationTextarea");
    cy.get("textarea").siblings("div").as("charCount");
  });

  describe("초기 상태(아무 내용도 작성하지 않았을 경우)에서", () => {
    it("다음 버튼을 누르면 “필수 질문을 작성해주세요.” 알림창이 뜬다.", () => {
      cy.checkAlert("필수 질문을 작성해주세요.");
      cy.get("@nextButton").click();
    });
    it("질문 제목 네비게이션의 이후 질문을 누르면 “필수 질문을 작성해주세요.” 알림창이 뜬다.", () => {
      cy.checkAlert("필수 질문을 작성해주세요.");

      cy.get("@questionTitleNavbar")
        .find("button")
        .contains("개발자를 희망하는 이유는 무엇인가요?")
        .click();
    });
    it("이전 버튼 클릭시 이전 질문 페이지로 이동한다.", () => {
      cy.get("@prevButton").should("exist").click();
      cy.get("span")
        .contains("기타 질문 사항에 답변해주세요.*")
        .should("exist");
    });
    it("질문 제목 네비게이션의 이전 질문을 누르면 이전 질문 페이지로 이동한다.", () => {
      cy.get("@questionTitleNavbar")
        .find("button")
        .contains("기타 질문 사항에 답변해주세요.")
        .click();

      cy.get("span")
        .contains("기타 질문 사항에 답변해주세요.*")
        .should("exist");
    });
  });

  describe("유저가 답변 입력시", () => {
    it("입력한 글자수를 볼 수 있다.", () => {
      cy.get("@charCount").should("have.text", `(0/${MAX_LENGTH})`);
      cy.get("@motivationTextarea").type("안녕하세요.");
      cy.get("@charCount").should("have.text", `(6/${MAX_LENGTH})`);
      cy.get("@motivationTextarea").type(" 반갑습니다.");
      cy.get("@charCount").should("have.text", `(13/${MAX_LENGTH})`);

      cy.get("@motivationTextarea").clear();
      cy.get("@charCount").should("have.text", `(0/${MAX_LENGTH})`);
    });
    it("100자 이하로 입력하였을 때, 다음 버튼을 누르면 다음 화면으로 이동한다.", () => {
      cy.get("@motivationTextarea").type("안녕하세요.");
      cy.get("@nextButton").click();
      cy.get("span")
        .contains("개발자를 희망하는 이유는 무엇인가요?")
        .should("exist");
    });
    it("유저가 답변 입력시 100자 이하로 입력하였을 때, 질문 제목 네비게이션의 다음 질문을 누르면 다음 화면으로 이동한다.", () => {
      cy.get("@motivationTextarea").type("안녕하세요.");
      cy.get("@questionTitleNavbar")
        .find("button")
        .contains("개발자를 희망하는 이유는 무엇인가요?")
        .click();
      cy.get("span")
        .contains("개발자를 희망하는 이유는 무엇인가요?")
        .should("exist");
    });
    it("최대 글자수 이상 입력할 수 없다.", () => {
      cy.get("@motivationTextarea").type("a".repeat(MAX_LENGTH + 1));
      cy.get("@motivationTextarea").should(
        "have.value",
        "a".repeat(MAX_LENGTH)
      );
    });
    it("입력한 내용이 로컬스토리지에 올바르게 저장된다.", () => {
      cy.get("@motivationTextarea").type("안녕하세요.");
      cy.checkLocalStorage("reason", '"안녕하세요."');

      cy.get("@motivationTextarea").clear();
      cy.checkLocalStorage("reason", '""');

      cy.get("@motivationTextarea").type("반갑습니다!");
      cy.checkLocalStorage("reason", '"반갑습니다!"');

      cy.get("@motivationTextarea").clear();
    });
  });
});
