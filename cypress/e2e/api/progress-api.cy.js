describe("Supabase Progress API", () => {

  it("Should fetch progress for the test user", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("SUPABASE_URL")}/rest/v1/user_progress`,
      qs: {
        user_id: `eq.${Cypress.env("TEST_USER_ID")}`,
        select: "*",
      },
      headers: {
        apikey: Cypress.env("SUPABASE_ANON_KEY"),
        Authorization: `Bearer ${Cypress.env("SUPABASE_ANON_KEY")}`,
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");

      // Aceptar que puede estar vacío o tener 1 fila
      expect(res.body.length).to.be.oneOf([0, 1]);

      if (res.body.length === 1) {
        const row = res.body[0];
        expect(row).to.have.property("user_id");
        expect(row).to.have.property("max_level");
        expect(row).to.have.property("total_score");
      }
    });
  });

  it("Should return an error when user_id is missing", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("SUPABASE_URL")}/rest/v1/user_progress`,
      failOnStatusCode: false,
      qs: { select: "*" }
    }).then((res) => {
      // 400 = bad filter
      // 401 = unauthorized (RLS)
      // 406 = missing condition
      expect(res.status).to.be.oneOf([400, 401, 406]);
    });
  });
});
