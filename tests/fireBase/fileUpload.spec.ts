import {test,expect,Page} from '@playwright/test';

test('File Upload Testing',async({page})=>{
    //Launch Application
    await page.goto('https://selenium-prd.firebaseapp.com/');
    //Login
    await page.locator('#email_field').fill('admin123@gmail.com');
    await page.locator('#password_field').fill('admin123');
    await page.getByRole('button',{name:'Login to Account'}).click();
    //Validate after Login
    await expect(page).toHaveURL(/prd.firebaseapp.com/);

    //Click Home Button
    await page.getByRole('link',{name :'Home'}).click();
    await expect(page).toHaveURL(/home/);

    // Hover over Intraction button
    await page.getByRole('link', {name:'File Upload'}).click();
    //Validation
    await expect(page).toHaveURL(/fileupload/);

    //Click Upload

    await page.click('#logo');

    await page.setInputFiles('input[type="file"]', 'C:/Automation Testing/flower.jpg');
    await expect(page.locator('#logo')).toHaveValue(/flower.jpg/);
   // await page.click('button[type="submit"]');

});