import { defineConfig, devices } from "@playwright/test"
const iphone13 = devices['iPhone 13'];

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

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
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: path.resolve(__dirname, 'test-results/html') }],
    // ['monocart-reporter', {
    //     name: 'My Test Report',
    //     outputFile: path.resolve(__dirname, 'test-results/monocart/index.html'),
    //     outputFolder: path.resolve(__dirname, 'test-results/monocart')
    // }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    viewport: {
      width: 1280,
      height: 720
    }
  },
  /* Configure projects*/ 
  projects: [
    {
      name: "setup",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /.*\.setup\.ts/,
      teardown: 'cleanup',
    },
    {
      name: 'cleanup',
      // This might be multiple files that end with .teardown.ts
      testMatch: '**/*.cleanup.ts',
    },
    {
      name: 'chromium',
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
    },
     {
      name: 'firefox',
      use: {
        ...devices["Desktop Firefox"],
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
    },
      {
      name: 'iphone-14',
      use: {
        ...devices["iPhone 14"],
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})
