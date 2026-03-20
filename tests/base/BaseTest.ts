import { Page, expect } from '@playwright/test';
import testData from '../testdata/config.json';

export class BaseTest {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Launch application method
   */
  async launchApplication() {
    await this.page.goto(testData.baseUrl);
  }
}