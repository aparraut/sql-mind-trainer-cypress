describe("Logout Flow", () => {
  beforeEach(() => {
    cy.visit("/");

    // Login de prueba
    cy.login(
      Cypress.env("TEST_EMAIL"),
      Cypress.env("TEST_PASSWORD")
    );
  });

  it("Should log out successfully and return to auth screen", () => {
    cy.logout();

    // Asegurar que no haya sesión activa en local storage
    cy.window().then((win) => {
      const session = win.localStorage.getItem("supabase.auth.token");
      expect(session).to.be.null;
    });
  });
});
