# Playwright Check Suites example with Checkly

This repository demonstrates how to use Playwright natively for end-to-end testing and how to integrate these tests with Checkly for continuous monitoring.

## Overview

This repository showcases:
- Native Playwright test setup with multiple browser configurations
- Authentication state management for logged-in test scenarios
- Integration with Checkly for running Playwright tests as synthetic monitors
- Test organization with tags for selective execution

## Prerequisites

- Node.js (v22 or higher recommended)
- npm package manager
- [Checkly account](https://www.checklyhq.com/) for synthetic monitoring

## Installation

```bash
npm install
```

## Project Structure

```
playwright-native-example/
├── tests/                      # Test files
│   ├── home-dashboard.spec.ts  # Dashboard tests
│   ├── homepage.spec.ts        # Homepage tests with @sanity tag
│   ├── login.setup.ts          # Authentication setup, logs into Checkly
│   ├── please.cleanup.ts       # Cleanup after tests
│   ├── test-sessions.spec.ts   # Test sessions page loads correctly
│   └── traces.spec.ts          # Observability Traces overview page loads correctly
├── checkly.config.ts           # Checkly configuration
├── playwright.config.ts        # Playwright configuration
├── package.json                # Project dependencies
└── .env                        # Environment variables (add this file or create the env vars USER_NAME and PW in Checkly so that they're used)
```

## Configuration

### Playwright Configuration

The `playwright.config.ts` file configures:
- **Test directory**: `./tests`
- **Projects**: Chromium, Firefox and Iphone-13 with shared authentication state
- **Authentication**: Uses storage state from `.auth/user.json`
- **Setup/Teardown**: Login before tests and cleanup after
- **Trace**: Always enabled for debugging

### Checkly Configuration

The `checkly.config.ts` file defines:
- **Project Name**: DemoCheckSuite
- **LogicalID**:
- **Check Suites**:
  1. **Chromium Suite**: Runs every 10 minutes in 3 locations
  2. **Critical Suite**: Runs tests tagged with `@critical` every 5 minutes
  3. **Sanity Suite**: Runs Chromium tests tagged with `@sanity` every 2 minutes
- **Locations**: us-west-1, eu-west-2, ap-northeast-1

## Running Tests

### Checkly Remote Execution

Run all tests:
```bash
npx checkly pw-test
```

Run specific project:
```bash
npx pw-test -- --project=chromium
```

Run tests with specific tag:
```bash
npx pw-test -- --grep @sanity
```

### Deploy your checks

Deploy your tests as scheduled checks to Checkly:

```bash
npx checkly deploy
```

## Authentication

This project uses Playwright's authentication state feature:
1. The `login.setup.ts` file handles the initial login
2. Authentication state is saved to `.auth/user.json`
3. All subsequent tests reuse this authentication state
4. The `please.cleanup.ts` file runs after all tests for cleanup

## Test Tags

Tests can be tagged for selective execution:
- `@sanity`: Quick smoke tests
- `@critical`: Critical user flows

Example:
```typescript
test('Visit Checkly home page @sanity', async ({ page }) => {
  // test implementation
});
```

## Environment Variables

Create a `.env` file in the root directory with necessary environment variables:
```
# Add your environment variables here
# 
USER_EMAIL=youruseremail
PW=yourpassword
```

## Playwright assets / Debugging:

- **Traces**: Always enabled, available in all check and test runs


## CI/CD Integration

The Playwright configuration includes CI-specific settings:
- Retries: 2 test-level attempts on CI and Checkly, 0 locally
- Workers: A single worker on CI and Checkly, parallel locally
- Forbid test.only: Prevents accidental exclusive tests


## License

ISC

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Checkly Documentation](https://www.checklyhq.com/docs)
- [Checkly Playwright Check Suites](https://www.checklyhq.com/docs/playwright-checks/)