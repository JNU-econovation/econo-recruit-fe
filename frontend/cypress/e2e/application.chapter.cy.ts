describe("chaoter", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("http://localhost:3000/application");
  });
  describe("초기 상태(처음 진입시, 로컬 데이터가 없는 상태)에서", () => {
    it("질문 제목 네비게이션 클릭시 “필수 질문을 작성해주세요.” 알람창이 뜬다. ", async () => {
      cy.get(".pl-12 > :nth-child(2) > .text-base").click();

      cy.on("window:alert", (str) => {
        expect(str).to.equal("필수 질문을 작성해주세요.");
      });
    });
    it("다음 버튼 클릭시 “필수 질문을 작성해주세요.” alert창이 뜬다. ", async () => {
      cy.get("button").contains("다음").should("exist").click();

      cy.on("window:alert", (str) => {
        expect(str).to.equal("필수 질문을 작성해주세요.");
      });
    });
    // describe("개발자(디자이너/기획)을 누르면", () => {
    //   it("질문 제목 네이게이션에서 개발자(디자이너/기획자)에 대한 질문들을 볼 수 있다.", () => {});
    //   it("질문 제목 네이게이션 클릭 시 “필수 질문을 작성해주세요.” alert창이 뜬다. ", () => {});
    //   it("다음 버튼 클릭시 “필수 질문을 작성해주세요.” alert창이 뜬다. ", () => {});
    //   describe("1순위 분야를 선택하면", () => {
    //     it("2순위로는 동일한 분야를 선택할 수 없다.", () => {});
    //     describe("2순위를 선택한 후", () => {
    //       it("2순위와 동일한 분야를 1순위에서 선택할 수 없다.", () => {});
    //       it("선택하지 않는 분야를 1순위에서 선택시 2순위 선택이 풀린다", () => {});
    //       it("다음 버튼을 누르면 다음 질문(기본 인적사항)으로 넘어간다.", () => {});
    //     });
    //   });
    // });
  });
});
