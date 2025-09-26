# Checkly Playwright Check Suites examples

![Use your Playwright end-to-end tests for synthetic monitoring with Playwright Check Suites.](/assets/header.jpg)

> Take your existing Playwright Test Suite and reuse it for synthetic monitoring.

## Overview

This repository demonstrates how to use Playwright natively for end-to-end testing and [Checkly synthetic monitoring](https://www.checklyhq.com/product/synthetic-monitoring/).

It showcases Playwright Check Suites that:

- [Run Playwright tests with multiple browsers](#1-run-playwright-tests-with-multiple-browsers)
- [Monitor different environments using Playwright projects](#2-monitor-different-environments-using-playwright-projects)
- [Monitor specific application areas using Playwright tags](#3-monitor-specific-application-areas-using-playwright-tags)
- [Authenticate tests for logged-in scenarios using Playwright project dependencies](#4-authenticate-tests-for-logged-in-scenarios-using-playwright-project-dependencies)

> [!NOTE]
> The examples focus on showing how to structure and organize your Playwright tests and reuse them for Checkly synthetic monitoring.
>
> To leverage the Playwright Check Suites' full potential mix and match the shown practices in your projects.

## Prerequisites

- Node.js (v22 or higher recommended)
- npm package manager
- [a Checkly account](https://www.checklyhq.com/) for synthetic monitoring

## Installation

```bash
npm install
```

## Project Structure

```
playwright-check-suite-examples/
├── tests/                      # Playwright Test files
│   ├── example-1/              # Example 1 spec files
│   ├── example-2/              # Example 2 spec files
│   ├── ...
├── checkly.config.ts           # Checkly configuration
├── playwright.config.ts        # Playwright configuration
└── package.json                # Project dependencies
```

## Basic Configuration

This repository includes an initialized Playwright and [Checkly CLI project](#todo) to show how to use Playwright Check Suites.

Checkly Playwright Check Suites enable you to reuse and bundle your existing Playwright end-to-end test suite for end-to-end testing and synthetic monitoring runing in the global Checkly infrastructure.

### Playwright Configuration

Every Playwright project is configured via a `playwright.config.ts` file in the root of your project. The main options to look out for are:

- **Test directory**: the directory of your Playwright `spec.ts` files (`testDir`)
- **Projects**: projects to select, configure and run spec files with different configuration (`projects`)
- **Trace**: trace file configuration for easier failure debugging (`use.trace` or `projects[].use.trace`)

The Checkly CLI parses and reuses your existing Playwright configuration to guarantee a smooth transition from local end-to-end testing to global synthetic monitoring with Playwright Check Suites.

> [!TIP]
> Learn more about all test configuration options in [the official Playwright documentation](https://playwright.dev/docs/test-configuration).

### Checkly Configuration

Every Checkly CLI projects is configured via a `checkly.config.ts` file in the root of the project. Use this main configuration to define your Playwright Check Suites.

Specify the following properties to control your Playwright setup for synthetic monitoring.

- **Project Name**: a human readable name for your project (`Demo Playwright Check Suites`)
- **LogicalID**: a unique identifier across your Checkly account (`pwt-check-suite-examples`)
- **Playwright configuration**: your general Playwright configuration (`checks.playwrightConfigPath`)
- **Check Suite Definitions**: subsets of your Playwright test suite used as Playwright Check Suites (`checks.playwrightChecks`)

> [!TIP]
> Learn more about all the Checkly monitoring options in [the official Checkly documentation](#todo).

## Running Tests

Playwright tests usually run on your local machine or in your CI/CD pipeline when you execture `npx playwright test`. The Checkly CLI lets you take your tests and run them from one of the global Checkly locations.

### Run your Playwright tests in the Checkly infrastructure

Use [the `pw-test` command](#todo) to run your Playwright tests in the Checkly infrastructure before deploying them as synthetic monitors. The command accepts Checkly and Playwright CLI options.

```bash
npx checkly pw-test [checkly options] -- [playwright options]
```

Run all tests:

```bash
npx checkly pw-test
```

Run tests from a specific location:

```bash
npx checkly pw-test --location="eu-central-1"
```

Run specific project:

```bash
npx checkly pw-test -- --project="chromium"
```

Run tests with a specific tag:

```bash
npx checkly pw-test -- --grep @sanity
```

### Test and run your Playwright Check Suite configuration

Once you have configured your Playwright Check Suites use [the `npx checkly test` command](#todo) to run and test your combined Playwright and Checkly configuration.

Run a specific Playwright Check Suite:

```bash
npx checkly test --grep="Multiple Browser Suite" --record
```

Run a specific Playwright Check Suite from a specific location:

```bash
npx checkly test --grep="Multiple Browser Suite" --record --location="eu-central-1"
```

## Deploy your checks

Once your tests pass, deploy them as scheduled monitors to Checkly:

```bash
npx checkly deploy
```

## Examples

These following examples highlight configurations to reuse, select and configure your Playwright end-to-end tests for Checkly synthetic monitoring.

> [!TIP]
> Learn more about Playwright Check Suites, best practices and how to structure your tests in [the organizing Playwright Check Suites documentation](#todo).

### 1. Run Playwright tests with multiple browsers

Use the `pwProjects` option to reuse existing Playwright projects and their configuration in your Playwright Check Suite.

```typescript
// playwright.config.ts

export default defineConfig({
  projects: [
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
  ],
})
```

Reuse and configure the different Playwright projects in your `checkly.config.ts`.

```typescript
// checkly.config.ts

export default defineConfig({
  checks: {
    playwrightChecks: [
      {
        name: "Multiple Browser Suite",
        logicalId: "browser-compat-e2e-suite",
        // Specify which projects should be
        // included in the Playwright Check Suite
        pwProjects: ["chromium", "firefox"],
        frequency: Frequency.EVERY_10M,
      },
    ],
  },
})
```

Use the `--grep` option to run a specific Playwright Check Suite.

```bash
npx checkly test --grep="Multiple Browser Suite" --record
```

### 2. Monitor different environments using Playwright projects

Configure different `baseURL` Playwright project settings if you want to run the same monitoring tests against different environments.

```typescript
// playwright.config.ts

export default defineConfig({
  projects: [
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
        // Change the base URL for this environment
        baseURL: "https://docs.checklyhq.com",
      },
    },
  ],
})
```

Reuse and configure the different Playwright projects in your `checkly.config.ts`.

```typescript
// checkly.config.ts

export default defineConfig({
  checks: {
    playwrightChecks: [
      {
        name: "Marketing Environment",
        logicalId: "environment-marketing-suite",
        pwProjects: ["environment-marketing"],
        // Run this Playwright check suite in three locations every ten minutes
        frequency: Frequency.EVERY_10M,
        locations: ["us-west-1", "eu-west-2", "af-south-1"],
      },
      {
        name: "Docs Environment",
        logicalId: "environment-docs-suite",
        pwProjects: ["environment-docs"],
        // Run this Playwright check suite in one location every hour
        frequency: Frequency.EVERY_1H,
        locations: ["us-west-1"],
      },
    ],
  },
})
```

> [!TIP]
> Use this approach to monitor different development environments (`production`, `staging`, etc.) or localized environments (`your-company.com/en`, `your-company.com/de`, etc.) with the same Playwright code base.

### 3. Monitor specific application areas using Playwright tags

When you reuse your existing Playwright test suite for synthetic monitoring it is common to run only a subset of your tests as Checkly monitors. [Use Playwright tags](https://playwright.dev/docs/test-annotations#tag-tests) to specify which tests should become part of your monitoring setup.

Annotate tests with a tag signaling that they are used for end-to-end monitoring.

```typescript
import { expect, test } from "@playwright/test"

// Annotate a test to reuse is for synthetic monitoring
test("Visit Checkly home page", { tag: "@checkly" }, async ({ page }) => {
  await page.goto("/")

  // More test code ...
})
```

Once your future monitoring tests are tagged you can target them via Playwright projects or the `pwTags` Playwright Check Suite option.

#### Run tagged tests with Playwright projects

Configure a Playwright project that will only run tests with your specific tag.

```typescript
// playwright.config.ts

export default defineConfig({
  projects: [
    {
      name: "checkly-monitoring",
      use: { ...devices["Desktop Chrome"], baseURL: "https://checklyhq.com" },
      // Filter tests by tag
      grep: /@checkly/,
    },
  ],
})
```

Reuse and configure the Playwright project in your `checkly.config.ts`.

```typescript
// checkly.config.ts

export default defineConfig({
  checks: {
    playwrightChecks: [
      {
        name: "Tagged Checkly Tests (tagged-via-project)",
        logicalId: "tagged-tests-via-project",
        // Tests are filtered by tag by using a separated Playwright project
        pwProjects: ["checkly-monitoring"],
        frequency: Frequency.EVERY_1H,
      },
    ],
  },
})
```

#### Run tagged tests with `pwTags`

If you don't want to include the test filtering logic in your Playwright project, use `pwTags` to filter the tests in your `checkly.config.ts`.

```typescript
// checkly.config.ts

export default defineConfig({
  checks: {
    playwrightChecks: [
      {
        name: "Tagged Checkly Tests (tagged-via-pwtags)",
        logicalId: "tagged-tests-via-pwtags",
        // Tests are filtered by tag by using `pwTags`
        pwTags: ["@checkly"],
        frequency: Frequency.EVERY_1H,
      },
    ],
  },
})
```

> [!TIP]
> Playwright Check Suites let you filter existing tests using `pwTags`. However, we recommend to always start with a separated Playwright project and reuse it via `pwProjects` in your `checkly.config.ts`.
>
> This approach improves the maintainability and separates the Playwright test configuration (`playwright.config.ts`) from the Checkly monitoring configuration (`checkly.config.ts`).

### 4. Authenticate tests for logged-in scenarios using Playwright project dependencies

If your existing Playwright tests require authentication and a login step use [Playwright project dependencies and storage state](https://playwright.dev/docs/test-global-setup-teardown#option-1-project-dependencies) to log in once and reuse the browser session information.

Create a Playwright test that performs your login actions and calls [`context().storageState()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state).

```typescript
// login.setup.ts

const AUTH_FILE = ".auth/user.json"

setup("Log into Checkly", async ({ page }) => {
  await page.goto("/")

  // Perform your login actions
  // ...

  // Use storage state to write the browser state to disk
  await page.context().storageState({ path: AUTH_FILE })
})
```

Configure two new Playwright projects. The first one performs the login actions to persist the browser state, while the other one imports the browser state to avoid the login steps.

```typescript
// playwright.config.ts

export default defineConfig({
  projects: [
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
        // 2. Reuse the written browser state to avoid login steps
        storageState: path.resolve(__dirname, AUTH_FILE),
      },
      testMatch: /.*\/example-4\/.*\.spec\.ts/,
      // 1. Set the project doing the login as a dependency
      dependencies: ["login-setup"],
    },
  ],
})
```

This Playwright setup will always run the `login-setup` project before running `logged-in-tests` so that the authentication will be available and the browser state can be reused.

Reuse the `logged-in-tests` project in your Checkly configuration.

```typescript
// checkly.config.ts

export default defineConfig({
  checks: {
    playwrightChecks: [
      {
        name: "Logged-in tests",
        logicalId: "logged-in-tests",
        // Run the `logged-in-tests` project which will automatically run
        // `login-setup` to write the authentication file to disk
        pwProjects: ["logged-in-tests"],
        frequency: Frequency.EVERY_1H,
      },
    ],
  },
})
```

Project dependencies and storage state work the same way as your standard Playwright project.

> [!TIP]
> Check this video to learn more about [Playwright `storageState` and how to configure Playwright project dependencies](https://www.youtube.com/watch?v=nSHPCLUwwVk).

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Checkly Documentation](#TODO)
- [Checkly Playwright Check Suites](#TODO)
- [Checkly Playwright Tips on YouTube](https://www.youtube.com/playlist?list=PLMZDRUOi3a8NtMq3PUS5iJc2pee38rurc)

## License

MIT
