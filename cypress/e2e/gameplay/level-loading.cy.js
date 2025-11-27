describe("Level Solving", () => {
  beforeEach(() => {
    cy.login("demo@test.com", "123456");
  });

  it("Should solve Level 1 correctly", () => {
    cy.contains("Nivel 1").click();

    cy.get(".sql-input").type("SELECT * FROM users;");
    cy.get("#submit-query").click();

    cy.contains("Correcto").should("be.visible");
  });
});
