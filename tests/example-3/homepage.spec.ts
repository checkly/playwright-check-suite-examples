import { expect, test } from "@playwright/test"

test("Visit Checkly home page", { tag: "@checkly" }, async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle(/Checkly/)

  // More test code ...
})
