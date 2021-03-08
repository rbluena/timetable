/// <reference types="cypress" />

/**
 *  TODO:
 *
 * 1. Creat authRequest command
 * 2. Save some of the responses to the environment variables Cypress.env('key', 'value')
 * 3. Adding custom commands for opening AuthMenu, Dialog
 * 3. Adding tabs to switch between completed and uncompleted on the modal
 * 4: Checking how to test crossbrowser
 * 5. Setup new configurations
 * 6. Using aliases
 * 7. Using wait
 * 8. Running test with parallel CI with Circle CI
 * 9. Implementing test doubles, i.e spies, mocks and stubs  SINON.js
 * 10. State persistance, using client side authentication only
 * */

describe('testing workspaces', () => {
  Cypress.config('baseUrl', Cypress.env('API'));

  let authToken = null;
  let settingId = null;

  before(() => {
    cy.apiSignin('rbluena@gmail.com', 'password').then((token) => {
      authToken = token;
    });
  });

  it('should create a setting', () => {
    const data = {
      name: 'Updated Setting',
      code: 'relationship',
      type: 'topic',
    };

    cy.request({
      method: 'POST',
      url: '/settings/create',
      body: data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(201);
      expect(body).to.have.property('data');

      settingId = body.data._id;
    });
  });

  it.skip('should update a setting', () => {
    const data = {
      name: 'Updated Setting',
      code: 'update',
      type: 'topic',
    };

    cy.request({
      method: 'PUT',
      url: `/settings/update/${settingId}`,
      body: data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(201);
      expect(body).to.have.property('data');

      settingId = body.data._id;
    });
  });

  it.only('it should return all or filtered settings', () => {
    cy.request({
      method: 'GET',
      url: '/settings',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      qs: {
        code: ['startup', 'business'],
        type: ['category'],
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });
});
