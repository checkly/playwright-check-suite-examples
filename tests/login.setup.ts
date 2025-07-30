import { expect, test as setup } from "@playwright/test"

const AUTH_FILE = ".auth/user.json"

setup("Log into Checkly", async ({ page }) => {
  console.log(process.env.USER_NAME);
  await page.goto("https://app.checklyhq.com")
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill(process.env.USER_EMAIL as string);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PW as string);
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('button', { name: /switch accounts/i })).toBeVisible()
  await page.context().storageState({ path: AUTH_FILE })
});