import { expect, test } from '@playwright/test';

test('Log out', async ({ page }) => {
  await page.getByTestId('navbard-menu-trigger').click();
  await page.getByRole('listitem').filter({ hasText: 'Logout' }).click();
  });