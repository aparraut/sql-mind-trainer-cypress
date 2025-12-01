/// <reference types="cypress" />

import { SELECTORS } from "../../support/selectors";

describe("Progress Tracking – SQL Mind Trainer", () => {

  beforeEach(() => {
    cy.visit("/");
    cy.login();
    //cy.waitForStartScreen();
  });

  // ============================
  // 1. VALIDAR MAPA DE NIVELES
  // ============================
  it("Should display completed levels correctly in the Levels Map", () => {

    cy.get("#btn-levels").click();

    // Esperar a que aparezcan los botones reales y no el loader
    cy.get("#levels-container .level-btn", { timeout: 8000 })
      .should("have.length.at.least", 1);

    cy.fixture("progress.json").then((data) => {
      data.completedLevels.forEach((levelNumber) => {

        cy.contains("#levels-container .level-btn", levelNumber)
          .should("have.class", "completed");

      });
    });

  });


  // ============================
  // 2. VALIDAR LOGROS
  // ============================
  it("Should correctly display unlocked achievements", () => {

    cy.get("#btn-achievements").click();

    // Esperar que se carguen los logros
    cy.get("#achievements-container .achievement", { timeout: 8000 })
      .should("have.length.at.least", 1);

    cy.fixture("achievements.json").then((data) => {
      data.unlockedTitles.forEach((title) => {

        // Buscar el logro por título visible
        cy.contains("#achievements-container .achievement", title)
          .within(() => {
            cy.contains("✔ Logro desbloqueado")
              .should("exist");
          });

      });
    });

  });


  // ============================
  // 3. VALIDAR RANKING MUNDIAL
  // ============================
  it("Should show the logged user inside the global ranking", () => {
    cy.get("#btn-ranking").click();

    cy.get("#screen-ranking")
      .should("exist")
      .and("be.visible");

    cy.fixture("user.json").then((user) => {
      cy.get("#ranking-container")
        .contains(user.email)
        .should("exist");
    });
  });

  // ============================
  // 4. NAVEGAR DESDE PROGRESO → NIVEL
  // ============================
  it.only("Should allow selecting a completed level to replay it", () => {
  cy.openLevel("1");

  cy.get("#challenge-title")
    .should("contain.text", "Desafío");
});
});
