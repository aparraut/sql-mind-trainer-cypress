import { SELECTORS } from "../../support/selectors";

describe('Login Flow', () => {
  it('Should log in successfully', () => {
    cy.fixture('users').then(({ validUser }) => {
      cy.login(validUser.email, validUser.password);

      cy.contains('Select a Level').should('be.visible');
    });
  });
});
