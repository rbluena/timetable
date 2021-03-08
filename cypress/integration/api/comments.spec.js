const { decode } = require('jsonwebtoken');

describe('testing comments', () => {
  Cypress.config('baseUrl', Cypress.env('API'));

  let authToken = null;
  let user = null;
  let linkId = null;
  let commentId = null;

  before(() => {
    cy.apiSignin('luenarabii@gmail.com', 'password').then((token) => {
      authToken = token;
    });
  });

  it('should create a link', () => {
    const date = new Date('2021-01-02');
    user = decode(authToken);

    const data = {
      title: 'This is my first title for my next publishing content.',
      description:
        'Description will be used in the future, for the mean time let focus on somethng else.',
      date,
      owner: user._id,
    };

    cy.request({
      method: 'POST',
      url: '/links/create',
      body: data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(201);
      expect(body).to.have.property('data');

      linkId = body.data._id;
    });
  });

  it('should create a comment', () => {
    user = decode(authToken);

    const data = {
      text:
        'Description will be used in the future, for the mean time let focus on somethng else.',
      author: user._id,
      link: linkId,
    };

    cy.request({
      method: 'POST',
      url: '/comments/create',
      body: data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(201);
      expect(body).to.have.property('data');

      commentId = body.data._id;
    });
  });

  it('should update a comment', () => {
    const data = {
      text: 'This should update the comment.',
      like: true,
    };

    cy.request({
      method: 'PUT',
      url: `/comments/${commentId}`,
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

  it('should retrieve single comment', () => {
    cy.request({
      method: 'GET',
      url: `/comments/${commentId}`,
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it('should delete a comment', () => {
    cy.request({
      method: 'DELETE',
      url: `/comments/${commentId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it('should retreive all comments', () => {
    cy.request({
      method: 'GET',
      url: '/comments',
      qs: {
        linkId,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });
});
