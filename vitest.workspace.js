import { defineWorkspace } from "vitest/config";


export default defineWorkspace([
    {
      extends: "./vite.config.js",
      test: {
        // ...
        // add to the end of the happy-dom test object 
        coverage: {
          provider: "istanbul",
          reporter: ["text", "json", "html"],
        },
      },
    },
    {
      extends: "./vite.config.js",
      test: {
        // ...
        // add to the end of the browser test object 
        coverage: {
          reporter: ["text", "json", "html"],
        },
      },
    },
  ]);