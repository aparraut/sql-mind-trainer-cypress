const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://learn-sql-trainer.vercel.app",
    video: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    viewportWidth: 1280,
    viewportHeight: 800,
  }
});
