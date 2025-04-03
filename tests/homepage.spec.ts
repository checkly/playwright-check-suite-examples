import { expect, test } from '@playwright/test';

test('Visit Checkly home page @fast', async ({ page }) => {
    const response = await page.goto('https://checklyhq.com');

    expect(response).not.toBeNull();

    if (response === null) {
      return;
    }

    expect(response.status()).toBeLessThan(400);
  });