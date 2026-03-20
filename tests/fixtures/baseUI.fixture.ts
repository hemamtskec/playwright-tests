import { test as base } from '@playwright/test';
import * as allure from 'allure-js-commons';

export const test = base;

test.afterEach(async ({ page }, testInfo) => {
  //if (testInfo.status !== testInfo.expectedStatus) {
    const screenshot = await page.screenshot({ fullPage: true });

    await allure.attachment(
      `Screenshot - ${testInfo.title}`,
      screenshot,
      'image/png'
    );

    const fileName = testInfo.title.replace(/\s+/g, '_');
    // Get current time in PST
    const pstOffset = -8 * 60; // PST is UTC-8
    const localDate = new Date();
    const utc = localDate.getTime() + (localDate.getTimezoneOffset() * 60000);
    const pstDate = new Date(utc + pstOffset * 60000);
    
    // Format as YYYY-MM-DD_HH-MM-SS
    const timestamp = pstDate.toISOString()
      .replace('T', '_')
      .replace(/:/g, '-')
      .split('.')[0]; // Remove milliseconds

    await page.screenshot({
      path: `tests/screenshots/${fileName}_${timestamp}.png`,
      fullPage: true
    });
  //}
});