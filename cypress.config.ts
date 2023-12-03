import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        seedDatabase(fileName) {
          // Run node js
          // Edit files
          console.log(`Cypress task running ${fileName}...`);
          return fileName;
        }
      });
    }
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack"
    }
  }
});
