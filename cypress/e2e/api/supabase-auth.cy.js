describe("Supabase Auth API", () => {
  it("Should log in successfully with valid credentials", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("SUPABASE_URL")}/auth/v1/token?grant_type=password`,
      headers: {
        apiKey: Cypress.env("SUPABASE_ANON_KEY"),
      },
      body: {
        email: Cypress.env("TEST_USER_EMAIL"),
        password: Cypress.env("TEST_USER_PASSWORD"),
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("access_token");
      expect(res.body).to.have.property("user");
      expect(res.body.user.email).to.eq(Cypress.env("TEST_USER_EMAIL"));
    });
  });

  it("Should fail login with invalid credentials", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("SUPABASE_URL")}/auth/v1/token?grant_type=password`,
      failOnStatusCode: false,
      headers: { apiKey: Cypress.env("SUPABASE_ANON_KEY") },
      body: {
        email: "wrong@example.com",
        password: "invalid123",
      },
    }).then((res) => {
      expect(res.status).to.eq(400); // o 401 según configuración
    });
  });
});
