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
    describe("개발자(디자이너/기획)을 누르면", () => {
      beforeEach(async () => {
        cy.get('[for=":R7dmlllkq:"]').click();
      });

      it("질문 제목 네이게이션에서 개발자(디자이너/기획자)에 대한 질문들을 볼 수 있다.", async () => {
        cy.get(":nth-child(5) > .text-base").should(
          "have.text",
          "자기소개 및 에코노베이션에 지원하게 된 계기를 서술해 주세요."
        );
        cy.get(":nth-child(6) > .text-base").should(
          "have.text",
          "개발자를 희망하는 이유는 무엇인가요?"
        );
        cy.get(":nth-child(7) > .text-base").should(
          "have.text",
          "소프트웨어 프로젝트에서 주도적으로 개발한 경험이 있나요?"
        );
        cy.get(":nth-child(8) > .text-base").should(
          "have.text",
          "어떤 일에 도전하고 실패해 본 경험이 있나요?"
        );
        cy.get(":nth-child(9) > .text-base").should(
          "have.text",
          "무언가에 깊게 빠지거나 파고 들어본 적이 있나요?"
        );
        cy.get(":nth-child(10) > .text-base").should(
          "have.text",
          "협업(프로젝트, 팀 활동)에 있어서 가장 중요하다고 생각되는 것은 무엇인지 서술해 주세요."
        );
        cy.get(":nth-child(11) > .text-base").should(
          "have.text",
          "에코노베이션에 들어오게 된다면 어떤 목표와 학습 계획을 바탕으로 활동하고 싶나요?"
        );
        cy.get(":nth-child(12) > .text-base").should(
          "have.text",
          "자신을 어필할 수 있는 포트폴리오를 업로드해주세요."
        );
        cy.get(":nth-child(13) > .text-base").should(
          "have.text",
          "개인정보 수집에 관한 안내 및 개인정보 수집"
        );
        cy.get(":nth-child(14) > .text-base").should(
          "have.text",
          "면접 가능시간을 선택해주세요.(중복 선택 가능)"
        );
      });
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
    });
  });
});
