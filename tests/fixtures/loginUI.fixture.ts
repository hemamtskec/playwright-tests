import { BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';
import loginData from '../testdata/config.json';
import { test as base } from '../fixtures/baseUI.fixture'

type AuthFixtures = {
  page: Page;
  context: BrowserContext;
  loggedInPage: Page; //Page already logged in
  
};

// Extend the base test
export const test = base.extend<AuthFixtures>({
  // create a browser context
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },

  // create a page
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },

  // fixture to provide logged-in page
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(loginData.username, loginData.password!);
    await use(page); // page is now logged in
  },
});