import { test, expect } from '@playwright/test'

const routes = ['/', '/about', '/contact', '/governance', '/privacy', '/products', '/terms'];

for (const route of routes) {
  test(`page "${route}" should load without error`, async ({ page }) => {
    await page.goto(`http://localhost:3000${route}`);
    await expect(page).toHaveScreenshot()
  });
}
