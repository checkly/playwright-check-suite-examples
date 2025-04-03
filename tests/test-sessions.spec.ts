import { expect, test } from "@playwright/test"

test('Test Sessions page loads', async ({ page }) => {
    const response = await page.goto('https://app.checklyhq.com/test-sessions');

    expect(response).not.toBeNull();

    if (response === null) {
      return;
    }
});