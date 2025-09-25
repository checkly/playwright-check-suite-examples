// checkly.config.ts
import { defineConfig } from "checkly"
import { Frequency } from "checkly/constructs"

export default defineConfig({
  projectName: "Playwright Check Suite Examples",
  logicalId: "pwt-check-suite-examples",
  repoUrl: "https://github.com/checkly/playwright-check-suite-examples",
  checks: {
    // reuse your existing Playwright configuration
    playwrightConfigPath: "./playwright.config.ts",
    // define locations from which your tests will run as monitors
    locations: ["us-west-1", "eu-west-2", "ap-northeast-1"],

    playwrightChecks: [
      /**
       * Example 1: Run Playwright tests with multiple browsers
       *
       * This Playwright Check Suite combines the tests defined in `chromium`
       * and `firefox` project and runs them every 10 minutes.
       *
       * Test it and record the results with:
       * $ npx checkly test --grep="Multiple Browser Suite" --record
       */
      {
        name: "Multiple Browser Suite",
        logicalId: "browser-compat-e2e-suite",
        pwProjects: ["chromium", "firefox"],
        frequency: Frequency.EVERY_10M,
      },

      /**
       * Example 2: Monitor different environments
       * with multiple Playwright Check Suites.
       *
       * These Playwright Check Suites monitor different environments with
       * different monitoring frequencies and locations.
       *
       * Test them and record the results with:
       * $ npx checkly test --grep="Environment" --record
       */
      {
        name: "Marketing Environment",
        logicalId: "environment-marketing-suite",
        pwProjects: ["environment-marketing"],
        frequency: Frequency.EVERY_10M,
        locations: ["us-west-1", "eu-west-2", "af-south-1"],
      },
      {
        name: "Docs Environment",
        logicalId: "environment-docs-suite",
        pwProjects: ["environment-docs"],
        frequency: Frequency.EVERY_1H,
        locations: ["us-west-1"],
      },

      /**
       * Example3: Monitor different application areas using Playwright tags
       */

      /**
       * Example 3a: Monitor different application areas using Playwright projects
       *
       * Test them and record the results with:
       * $ npx checkly test --grep="tagged-via-project" --record
       */
      {
        name: "Tagged Checkly Tests (tagged-via-project)",
        logicalId: "tagged-tests-via-project",
        // Tests are filtered by tag by using a separated Playwright project
        pwProjects: ["checkly-monitoring"],
        frequency: Frequency.EVERY_1H,
      },
      /**
       * Example 3b: Monitor different application areas using `pwTags`
       *
       * Test them and record the results with:
       * $ npx checkly test --grep="tagged-via-pwtags" --record
       */
      {
        name: "Tagged Checkly Tests (tagged-via-pwtags)",
        logicalId: "tagged-tests-via-pwtags",
        // Tests are filtered by tag by using `pwTags`
        pwTags: ["@checkly"],
        frequency: Frequency.EVERY_1H,
      },

      /**
       * Example 4: Authenticate tests for logged-in scenarios
       * using Playwright project dependencies
       *
       * This Playwright Check Suite will run the setup step defined in the
       * `playwright.config.ts` first, log in and write storage data to disk.
       * Then the actual Playwright project will be run and reuse the browser
       * session information.
       *
       * Test them and record the results with:
       * $ npx checkly test --grep="Logged-in tests" --record
       */
      {
        name: "Logged-in tests",
        logicalId: "logged-in-tests",
        pwProjects: ["logged-in-tests"],
        frequency: Frequency.EVERY_1H,
      },
    ],
  },
  //also include:
  cli: {
    runLocation: "eu-west-1",
    retries: 0,
  },
})
