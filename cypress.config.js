const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: false, 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  video: true,
  videoCompression: 32,
  reporter: "mochawesome",
  reporterOptions: {
    "reportDir": "cypress/results",
    "overwrite": true,
    "html": true,
    "json": true
  },

  
  env: {
    "allure": true
  },

  
});
