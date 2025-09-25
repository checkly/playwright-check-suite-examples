import { defineConfig, devices } from "@playwright/test"

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.resolve(__dirname, ".env") })

export const AUTH_FILE = ".auth/user.json"

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["list"], ["html"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    viewport: {
      width: 1280,
      height: 720,
    },
    baseURL: "https://www.checklyhq.com",
  },
  /**
   * Configure projects
   *
   * More info in github.com/checkly/playwright-check-suite-examples/#examples
   */
  projects: [
    /**
     * Example 1
     */
    {
      name: "chromium",
      testMatch: /.*\/example-1\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "firefox",
      testMatch: /.*\/example-1\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    /**
     * Example 2
     */
    {
      name: "environment-marketing",
      testMatch: /.*\/example-2\/.*\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], baseURL: "https://checklyhq.com" },
    },
    {
      name: "environment-docs",
      testMatch: /.*\/example-2\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://docs.checklyhq.com",
      },
    },
    /**
     * Example 3
     */
    {
      name: "checkly-monitoring",
      use: { ...devices["Desktop Chrome"], baseURL: "https://checklyhq.com" },
      grep: /@checkly/,
    },
    /**
     * Example 4
     */
    {
      name: "login-setup",
      use: { ...devices["Desktop Chrome"], baseURL: "https://checklyhq.com" },
      testMatch: /.*\/example-4\/.*\.setup\.ts/,
    },
    {
      name: "logged-in-tests",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://checklyhq.com",
        storageState: path.resolve(__dirname, AUTH_FILE),
      },
      testMatch: /.*\/example-4\/.*\.spec\.ts/,
      dependencies: ["login-setup"],
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})
