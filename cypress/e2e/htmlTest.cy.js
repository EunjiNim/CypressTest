describe('My Html test', () => {
  beforeEach(() => {
    // 로컬 서버를 실행하여 URL 접근
    cy.visit('http://localhost:8080/index.html');
  });

  // 메인 페이지 확인
  it('메인 페이지가 출력되는가?', ()=>{
    // 타이틀 및 헤더 이름, 설명 체크
    cy.title().should('eq', 'Astral by HTML5 UP');
    cy.get('header h1').should('contain.text', 'EunJi Park'); 
    cy.get('header p').should('contain.text', 'QA Engineer'); 
  });

  // Work 페이지 확인
  it('메인 페이지의 폴더 아이콘 클릭 시 WORK 페이지로 이동하는가?', ()=>{
    cy.get('nav a[href="#work"]').click({ force: true }); 
    // URL 및 헤더 이름 확인
    cy.url().should('include', '#work'); 
    cy.get('article#work h2').should('contain.text', 'Work');
  });

  // Work 페이지에 설명 텍스트 체크
  it('WORK 페이지에 의도된 내용의 설명 텍스트가 출력되는가?', () => {
    cy.get('p#description').should('include.text', '다양한 그라데이션 이미지');
  });

  // Work 페이지 내 이미지 개수 체크 
  it('페이지 내 이미지 개수가 12개로 출력되는가?', () => {
    cy.get('article#work img').should('have.length', 12); 
  });

   // 이미지 출력 확인
   it('모든 이미지가 정상 출력되는가?', () => {
    // "Work" 페이지로 이동
    cy.get('nav a[href="#work"]').click({ force: true });

    // 'article#work' 요소가 보이는지 확인 (display: none 상태에서 변경되는지)
    cy.get('article#work').should('not.have.css', 'display', 'none');
  
    // 모든 이미지가 다 출력되고 있는지 확인
    cy.get('article#work img').each(($img) => {
      cy.wrap($img)
        .should('be.visible')
        .and('have.attr', 'src')
        .and('not.be.empty'); // 이미지가 정상적으로 로딩되는지 확인
    });
  });

  // Contact 페이지 확인
  it('메일 아이콘 클릭 시 CONTACT 페이지로 이동하는가?', () => {
    cy.get('nav a[href="#contact"]').click({ force: true });
    // URL 및 헤더 이름 확인
    cy.url().should('include', '#contact');
    cy.get('article#contact h2').should('contain.text', 'Contact Me'); 
  });

  // 폼 입력 및 제출 확인
  it('내용 입력 후 제출 시 얼럿 창이 팝업되는가?', () => {
    cy.get('input[name="name"]').type('EunJi Park',  { force: true }); // 이름 입력
    cy.get('input[name="email"]').type('eunji@example.com',  { force: true }); // 이메일 입력
    cy.get('input[name="subject"]').type('Test Subject',  { force: true }); // 제목 입력
    cy.get('textarea[name="message"]').type('This is a test message.',  { force: true }); // 메시지 입력
    
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub'); // window.alert를 stub으로 교체
    });
    
    cy.get('input[type="submit"]').click( { force: true }); // 폼 제출
    cy.get('@alertStub').should('have.been.calledOnce'); // alert가 한 번 호출됐는지 확인
  });

  // 페이지 이동 링크 확인
  it('구글 버튼 클릭 시 구글 페이지로 이동하는가?', () => {
    cy.get('nav a[href="https://www.google.com"]').should('have.attr', 'href', 'https://www.google.com'); // Google 링크 확인
  });
})