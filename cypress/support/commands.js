import { SELECTORS } from "./selectors";

// =============================
// CYPRESS CUSTOM COMMANDS
// =============================

// -----------------------------
// AUTH COMMANDS
// -----------------------------
Cypress.Commands.add("login", (email, password) => {
  // 1. Visit base URL (Vercel)
  cy.visit("/");

  // 2. Esperar a que exista la pantalla de autenticación
  cy.get("#screen-auth", { timeout: 10000 }).should("exist");

  // 3. Esperar a que esté visible (hidratación de Vercel)
  cy.get("#screen-auth", { timeout: 10000 })
    .should(($el) => {
      const opacity = parseFloat($el.css("opacity"));
      expect(opacity).to.be.greaterThan(0);
    });

  // 4. Obtener las credenciales desde cypress.env.json
  const userEmail = email || Cypress.env("TEST_USER_EMAIL");
  const userPassword = password || Cypress.env("TEST_USER_PASSWORD");

  // 5. Llenar los inputs correctos de Vercel
  cy.get("#email").clear().type(userEmail);
  cy.get("#password").clear().type(userPassword);

  // 6. Click en el botón login real
  cy.get("#btn-login").click();

  // 7. Validar que entró al mapa (screen-map)
  cy.get("#screen-start", { timeout: 10000 }).should("be.visible");
});


Cypress.Commands.add("register", (email, password) => {
  cy.visit("/");
  cy.get(SELECTORS.authEmail).type(email);
  cy.get(SELECTORS.authPassword).type(password);
  cy.get(SELECTORS.authRegisterBtn).click();
});

// -----------------------------
// NAVIGATION
// -----------------------------
Cypress.Commands.add("goToStart", () => {
  cy.get(SELECTORS.startBtn).click();
  cy.get(SELECTORS.levelsScreen).should("not.exist");
});

Cypress.Commands.add("openLevelMap", () => {
  cy.get(SELECTORS.startLevelsBtn).click();
  cy.get(SELECTORS.levelsScreen).should("be.visible");
});

Cypress.Commands.add("startLevel", (levelNumber) => {
  // Busca el número del nivel dentro del contenedor
  cy.get(SELECTORS.levelsContainer)
    .contains(levelNumber.toString())
    .click();

  cy.get(SELECTORS.gameScreen).should("be.visible");
});

// -----------------------------
// GAMEPLAY COMMANDS
// -----------------------------
Cypress.Commands.add("submitQuery", (query) => {
  cy.get(SELECTORS.sqlInput).clear().type(query);
  cy.get(SELECTORS.runBtn).click();
});

Cypress.Commands.add("expectSuccess", () => {
  cy.get(SELECTORS.feedback)
    .should("be.visible")
    .and("contain.text", "Correcto");

  // El resultado debería mostrarse
  cy.get(SELECTORS.resultTable).should("be.visible");
});

Cypress.Commands.add("expectError", () => {
  cy.get(SELECTORS.feedback)
    .should("be.visible")
    .and("contain.text", "Error");

  // No debería mostrarse la tabla
  cy.get(SELECTORS.resultTable).should("not.exist");
});

// -----------------------------
// LEVEL COMPLETION
// -----------------------------
Cypress.Commands.add("nextLevel", () => {
  cy.get(SELECTORS.nextLevelBtn).should("be.visible").click();
});
// LOGOUT
Cypress.Commands.add("logout", () => {
  const SELECTORS = {
    startScreen: "#screen-start",
    logoutBtn: "#btn-logout",
    authScreen: "#screen-auth"
  };


  // 2. Click en Logout
  cy.get(SELECTORS.logoutBtn, { timeout: 6000 }).click();

  // 3. Confirmar que volvemos a la pantalla de login
  cy.get(SELECTORS.authScreen, { timeout: 6000 })
    .should("exist")
    .should("be.visible");
});
Cypress.Commands.add("openLevel", (levelNumber) => {
  // Primero abrir el mapa de niveles
  cy.get("#btn-levels").click();

  // Esperar a que se rendericen los niveles reales
  cy.get("#levels-container .level-btn", { timeout: 8000 })
    .should("have.length.at.least", 1);

  // Buscar un nivel por su texto interno ("1", "2", "3", etc.)
  cy.contains("#levels-container .level-btn", levelNumber)
    .click();

  // Verificar que estamos en el juego
  cy.get("#screen-game")
    .should("exist")
    .and("be.visible");
});
Cypress.Commands.add("openCompletedLevel", (levelNumber) => {
  cy.get("#btn-levels").click();

  // Cargar niveles
  cy.get("#levels-container .level-btn", { timeout: 8000 })
    .should("have.length.at.least", 1);

  // Buscar solo los completados
  cy.contains("#levels-container .level-btn.completed", levelNumber)
    .click();

  cy.get("#screen-game")
    .should("exist")
    .and("be.visible");
});
Cypress.Commands.add("openNextAvailableLevel", () => {
  cy.get("#btn-levels").click();

  cy.get("#levels-container .level-btn.available", { timeout: 8000 })
    .first()
    .click();

  cy.get("#screen-game")
    .should("exist")
    .and("be.visible");
});
