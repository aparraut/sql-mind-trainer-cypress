// cypress/support/e2e.js

import './commands';

// Evitar que errores del frontend (no del test) rompan Cypress
Cypress.on("uncaught:exception", (err) => {
  // Ignorar errores que mencionen "process is not defined"
  if (err.message.includes("process is not defined")) {
    return false; // Evita que Cypress falle
  }

  // Ignorar errores de librerías que usan process.env
  if (err.message.includes("ci-info") || err.stack.includes("ci-info")) {
    return false;
  }

  // Permite que otros errores sí rompan la prueba
  return true;
});
