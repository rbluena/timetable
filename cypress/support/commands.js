Cypress.Commands.add('signup', () => {
  cy.visit(`/auth/register`);
  cy.get('input[name="firstname"]').type('John');
  cy.get('input[name="lastname"]').type('Doe');
  cy.get('input[name="email"]').type('john_doe@gmail.com');
  cy.get('input[name="password"]').type('password');
  cy.get('button[type="submit"]').should('be.visible').click();
});

Cypress.Commands.add('signin', (email, password) => {
  cy.visit(`/auth/login`);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').should('be.visible').click();
});

Cypress.Commands.add('signout', () => {
  cy.visit('/');
  cy.get('button[type="button"]')
    .contains('Logout')
    .should('be.visible')
    .click();
});

Cypress.Commands.add('apiSignin', (email, password) =>
  cy
    .request('POST', `${Cypress.env('API')}/auth/login`, {
      email,
      password,
      type: 'local',
    })
    .then((response) => response.body.data.jwt)
);
