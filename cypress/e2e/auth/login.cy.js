import { SELECTORS } from "../../support/selectors";

describe("Login - Successful", () => {

  it("Should log in with a valid test user", () => {
    cy.login(); // uses credentials from cypress.env.json

    cy.get(SELECTORS.startScreen).should("be.visible");
    cy.get(SELECTORS.startBtn).should("be.visible");
    cy.get(SELECTORS.startLevelsBtn).should("be.visible");
    cy.get(SELECTORS.startLogoutBtn).should("be.visible");
    console.log("EMAIL:", Cypress.env("TEST_USER_EMAIL"));
    console.log("PASS:", Cypress.env("TEST_USER_PASSWORD"));

  });

});
