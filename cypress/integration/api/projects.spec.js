const { decode } = require('jsonwebtoken');

describe('testing projects', () => {
  Cypress.config('baseUrl', Cypress.env('API'));

  let authToken = null;
  let user = null;
  let projectId = null;

  before(() => {
    cy.apiSignin('rbluena@gmail.com', 'password').then((token) => {
      authToken = token;
    });
  });

  it('should create a project', () => {
    const startDate = new Date('2021-03-02');
    const endDate = new Date('2021-05-02');
    user = decode(authToken);

    const data = {
      title: 'This is my first title for my next publishing content.',
      description:
        'Description will be used in the future, for the mean time let focus on somethng else.',
      code: 'PA',
      startDate,
      endDate,
      owner: user._id,
    };

    cy.request({
      method: 'POST',
      url: '/projects',
      body: data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(201);
      expect(body).to.have.property('data');

      projectId = body.data._id;
    });
  });

  it('should update a project', () => {
    const data = {
      title: 'This is changed title',
      description: 'This is changing description.',
    };

    cy.request({
      method: 'PUT',
      url: `/projects/${projectId}`,
      body: data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it('should retrieve a project.', () => {
    cy.request({
      method: 'get',
      url: `/projects/${projectId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it('should retrieve all projects', () => {
    cy.request({
      method: 'GET',
      url: '/projects',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      qs: {
        owner: user._id,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it.skip('should delete a project', () => {
    cy.request({
      method: 'DELETE',
      url: `/projects/${projectId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });
});
