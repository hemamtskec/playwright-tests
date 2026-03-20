import { test, expect } from '@playwright/test';

//Test Case 1
test('Alert Window testing', async ({ page }) => {
  //Launch Application
  await page.goto('https://selenium-prd.firebaseapp.com/');
  //Validation
  await expect(page).toHaveURL(/prd.firebaseapp.com/);
  //Enter Login details 
  await page.locator('#email_field').fill('admin123@gmail.com');
  await page.locator('#password_field').fill('admin123');
  await page.getByRole('button', { name: 'Login to Account' }).click();

  await expect(page).toHaveURL(/prd.firebaseapp.com/);
  //Click Home Button
  await page.getByRole('link',{name :'Home'}).click();
  await expect(page).toHaveURL(/home/);
  //Mouse Hover Switch To
  await page.getByRole('button', { name: 'Switch To                    '}).hover();

  const alertLink=page.getByRole('link',{name:'Alert'});
  await expect(alertLink).toBeVisible();
  //Click Alert 
  await alertLink.click();
  await expect(page).toHaveURL(/alert/);

  // Handle alert
  page.on('dialog', async (dialog) => {
    console.log(dialog.message());   // prints alert message
    await dialog.accept();           // click OK
  });
   //Click Window Alert Button
   await page.getByRole('button',{name :'Window Alert'}).click();

});

//Test Case 2
test('Prompt Window testing', async ({ page }) => {

  await page.goto('https://selenium-prd.firebaseapp.com/');

  await expect(page).toHaveURL(/prd.firebaseapp.com/);

  await page.locator('#email_field').fill('admin123@gmail.com');
  await page.locator('#password_field').fill('admin123');
  await page.getByRole('button', { name: 'Login to Account' }).click();

  await expect(page).toHaveURL(/prd.firebaseapp.com/);

  await page.getByRole('link',{name :'Home'}).click();
  await expect(page).toHaveURL(/home/);

  await page.getByRole('button', { name: 'Switch To                    '}).hover();

  const alertLink=page.getByRole('link',{name:'Alert'});
  await expect(alertLink).toBeVisible();

  await alertLink.click();
  await expect(page).toHaveURL(/alert/);

 // Listen for the prompt dialog
  page.on('dialog', async (dialog) => {
    console.log('Alert message:', dialog.message()); // Get alert text
    await dialog.accept('Playwright');// Enter text and click OK
  });
  
  //Click Promt Alert window
   await page.getByRole('button',{name :'Promt Alert'}).click();
   //Read the message entered in promt alert window
   const element = page.locator('#Selenium'); 
   const text = await element.textContent();
   console.log('Text is:', text);

});

//});