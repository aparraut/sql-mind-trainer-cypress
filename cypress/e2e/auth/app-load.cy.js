import { SELECTORS } from "../../support/selectors";

describe("SQL Mind Trainer - App Load", () => {

  it("Should load the application and display the Auth screen", () => {
    cy.visit("/");

    // La pantalla de auth debe aparecer
    cy.get(SELECTORS.authScreen)
      .should("be.visible");

    // Elementos principales deben existir
    cy.get(SELECTORS.authEmail).should("be.visible");
    cy.get(SELECTORS.authPassword).should("be.visible");
    cy.get(SELECTORS.authLoginBtn).should("be.visible");
    cy.get(SELECTORS.authRegisterBtn).should("be.visible");
  });

});
