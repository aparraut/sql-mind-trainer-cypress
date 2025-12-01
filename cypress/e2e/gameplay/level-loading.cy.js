// cypress/e2e/level1-loading.cy.js

describe("Level 1 – Exact Content Validation (datos reales de la app)", () => {
  it("debería cargar el Nivel 1 con el contenido correcto", () => {
    // 1. Login usando tu comando custom
    cy.login();

    // 2. Click en START → debería ir al nivel 1
    cy.get("#btn-start").click();

    // 3. Verificar que estamos en la pantalla de juego
    cy.get("#screen-game.screen.neon-border.active")
      .should("be.visible");

    // ===================================================
    // 4. LEER levels.json DESDE LA APP
    // ===================================================
    cy.request("/data/levels.json").then((res) => {
      expect(res.status).to.eq(200);

      const levels = res.body;
      const level1 = levels.find((l) => l.id === 1);

      // Asegurarnos de que el nivel 1 exista en el JSON
      expect(level1, "Level 1 existe en levels.json").to.exist;

      // -----------------------------
      // Validar título del desafío
      // -----------------------------
      cy.get('#level-info > div')
        .should("be.visible")
        .and("contain.text", level1.groupName); // "Fundamentos SELECT"

      // -----------------------------
      // Validar descripción del nivel
      // -----------------------------
      cy.get("#challenge-description")
        .should("be.visible")
        .and("contain.text", level1.description); 
        // "Muestra todos los usuarios registrados."

      // -----------------------------
      // Validar que se menciona la tabla correcta
      // -----------------------------
      cy.get("#table-preview")
        .should("be.visible")
        .and("contain.text", level1.table); 
        // "users"
    });

    // ===================================================
    // 5. LEER tables.json DESDE LA APP
    // ===================================================
    cy.request("/data/tables.json").then((res) => {
      expect(res.status).to.eq(200);

      const tables = res.body;
      const users = tables.users;

      expect(users, "Tabla users existe en tables.json").to.exist;
      expect(users.length, "Tabla users tiene filas").to.be.greaterThan(0);

      // Validar que el preview muestre algunos valores reales
      cy.get("#table-preview")
        .should("contain.text", users[0].name)    // Ana
        .and("contain.text", users[1].country)    // Uruguay
        .and("contain.text", users[2].role);      // member, admin, etc.
    });

    // ===================================================
    // 6. Validar área SQL
    // ===================================================
    cy.get("#sql-input")
      .should("exist")
      .and("be.visible")
      .and("have.attr", "placeholder", "Escribe tu consulta SQL aquí...");

    // ===================================================
    // 7. Validar botón Ejecutar
    // ===================================================
    cy.get("#btn-run")
      .should("exist")
      .and("be.visible")
      .and("not.be.disabled");
  });
});
