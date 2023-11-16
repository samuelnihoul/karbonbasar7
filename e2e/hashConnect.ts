import { test, expect } from '@playwright/test';
let page;
let page2;
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  page2 = await browser.newPage();
  await page.goto('https://webapp.hashpack.app');
  await page.goto('https://karbonbasar.harmonia.eco')

});

test('login with Hashpack', async () => {
});

