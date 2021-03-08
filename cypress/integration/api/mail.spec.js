describe('testing mail sending email', () => {
  Cypress.config('baseUrl', Cypress.env('API'));

  it('should update a link', () => {
    const data = {
      title: 'This is changed title',
      description: 'This is changing description.',
    };

    cy.request({
      method: 'POST',
      url: `/mail`,
      body: data,
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });
});
