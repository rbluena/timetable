describe('UI testing for workspace', () => {
  before(() => {
    cy.signin('john_doe@gmail.com', 'password');
  });

  it('should create a workspace', () => {
    cy.visit(`/`);
  });
});
