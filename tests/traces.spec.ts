import { expect, test } from "@playwright/test"

test('Visit Traces page', async ({ page }) => {
    const response = await page.goto('https://app.checklyhq.com/traces');

    expect(response).not.toBeNull();

    if (response === null) {
      return;
    }

    expect(response.status()).toBeLessThan(400);
});