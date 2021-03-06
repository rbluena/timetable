const { decode } = require('jsonwebtoken');

describe('testing tasks', () => {
  Cypress.config('baseUrl', Cypress.env('API'));

  let authToken = null;
  let user = null;
  let taskId = null;
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
      url: '/projects/create',
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

  it('should create a task', () => {
    const start = new Date('2021-03-02 02:00');
    const end = new Date('2021-03-02 06:00');
    user = decode(authToken);

    const data = {
      title: 'This is my first title for my next publishing content.',
      description:
        'Description will be used in the future, for the mean time let focus on somethng else.',
      start,
      end,
      schedule: {
        start,
        end,
      },
      creator: user._id,
      project: projectId,
    };

    cy.request({
      method: 'POST',
      url: '/tasks/create',
      body: data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(201);
      expect(body).to.have.property('data');

      taskId = body.data._id;
    });
  });

  it('should assign a task', () => {});

  it('should update a task', () => {
    const data = {
      title: 'This is changed title',
      description: 'This is changing description.',
    };

    cy.request({
      method: 'PUT',
      url: `/tasks/${taskId}`,
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

  it('should retrieve a task.', () => {
    cy.request({
      method: 'get',
      url: `/tasks/${taskId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it('should retrieve all tasks', () => {
    cy.request({
      method: 'GET',
      url: '/tasks',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      qs: {
        creator: user._id,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it('should delete a task', () => {
    cy.request({
      method: 'DELETE',
      url: `/tasks/${taskId}`,
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
