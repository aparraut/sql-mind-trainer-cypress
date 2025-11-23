describe("Login Tests", () => {
  it("Should log in successfully", () => {
    cy.login("demo@test.com", "123456");
  });

  it("Should show error with wrong password", () => {
    cy.visit("/");
    cy.get("#email").type("demo@test.com");
    cy.get("#password").type("wrongpass");
    cy.get("#login-btn").click();
    cy.contains("Credenciales incorrectas").should("be.visible");
  });
});
