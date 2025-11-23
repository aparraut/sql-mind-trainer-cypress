describe("Progress Tracking", () => {
  beforeEach(() => {
    cy.login("demo@test.com", "123456");
  });

  it("Should display progress", () => {
    cy.contains("Progreso").should("be.visible");
  });
});
