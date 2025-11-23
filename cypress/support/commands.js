Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");

  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("#login-btn").click();

  cy.contains("Mapa de niveles", { timeout: 10000 }).should("be.visible");
});
