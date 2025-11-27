const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://sqlmindtrainer.vercel.app/",
    setupNodeEvents(on, config) {
      // tareas personalizadas aquí si las necesitás
    },
    video: false,
    screenshotsFolder: "cypress/screens",
  }
});
