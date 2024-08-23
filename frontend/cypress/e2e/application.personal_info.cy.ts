describe('신청폼 테스트: ', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/application')
      cy.get('label').contains("개발자").click();
      cy.get('label').contains("WEB").click();
      cy.wait(100);
      cy.get('label').contains("선택없음").click();
      cy.get('button').contains(/다음/).click();

      cy.get('input').first().as('nameInput');
      cy.get('input').eq(1).as('phoneInput');
      cy.get('input').eq(2).as('studentIdInput'); 
      cy.get('input').eq(3).as('academicStatusInput');

  })

  describe('인적사항 첫번째 페이지 테스트', () => {
    it('사용자는 이름을 5글자까지 입력할 수 있다.', () => {
      cy.get('@nameInput').type("에").should("have.value", "에").clear()
      cy.get('@nameInput').type("에코노").should("have.value", "에코노").clear()
      cy.get('@nameInput').type("abcde").should("have.value", "abcde").clear()

    });
  
    it('사용자는 5글자가 넘는 이름을 입력할 시 앞의 5글자까지만 입력을 받는다.', () => {
      cy.get('@nameInput').type("에코노베이션").should("have.value", "에코노베이").clear();
    });
  
    it('사용자는 연락처에 11자리 숫자만 기입할 수 있다. 숫자를 기입하면, 표준 연락처 형식에 맞게 값을 보여준다.', () => {
      cy.get('@phoneInput').type('01011111111').should("have.value", "010-1111-1111").clear();
    });

    it('사용자가 연락처를 입력한 시점부터 연락처 형식에 맞게 작성을 완료하지 못한경우 \"연락처를 입력해주세요.\" 라는 안내문구가 입력창에 나타난다.', () => {
      cy.get('@phoneInput').type('01011');
      cy.get('@phoneInput').siblings().find('div').should("have.text", "연락처를 입력해주세요.");
    });

    it('사용자는 학번에 6자리 숫자를 입력할 수 있다.', () => {
      cy.get('@studentIdInput').type('1').should("have.value", "1").clear();
      cy.get('@studentIdInput').type('123').should("have.value", "123").clear();
      cy.get('@studentIdInput').type('123456').should("have.value", "123456").clear();
    });
    
    it('사용자는 학번에 6자리를 초과하는 숫자를 입력할 경우 앞의 6글자까지만 입력받는다.', () => {
      cy.get('@studentIdInput').type('1234567').should("have.value", "123456").clear();
    });

    it('사용자는 학번을 입력한 시점부터 학번 형식에 맞게 작성을 완료하지 못한경우 "\학번을 입력해주세요"\라는 안내문구가 입력창에 나타난다.', () => {
      cy.get('@studentIdInput').type('1');
      cy.get('@studentIdInput').siblings().find('div').should('have.text', "학번을 입력해주세요.");
    });

    it('사용자는 학적상태(재학/휴학)을 입력할 수 있다.', () => {
      cy.get('@academicStatusInput').type("재학중").should('have.value', '재학중').clear();
      cy.get('@academicStatusInput').type("부트캠프로 인한 휴학. 2025년 1학기에 복학할 예정입니다.").should("have.value", "부트캠프로 인한 휴학. 2025년 1학기에 복학할 예정입니다.");
    }); 
  })
  
})