import { Page, Locator,expect } from '@playwright/test';
import loginData from '../testdata/config.json';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#inputPassword');
    this.loginButton = page.getByRole('button', { name: 'Sign In' });
  }

  //  async goto() {
  //   await this.page.goto(process.env.CRM_URL!);
  // }

  async goto() {
    await this.page.goto(loginData.baseUrl,{
      waitUntil: 'load',
       timeout: 60000
    });
  }


 //Login functionality
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
 //Successfull login validation
  async validateSuccessfulLogin() {
    await expect(this.page).toHaveURL(/dashboard/);
  }

  //Validate invalid login
    async validateInvalidLogin() {
    await expect(this.page).toHaveURL(/218:8098/);
  }

}