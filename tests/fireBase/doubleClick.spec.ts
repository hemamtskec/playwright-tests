import {test,expect,Page} from '@playwright/test';

test('Double Click Testing',async({page})=>{
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
    await page.getByRole('button', { name: 'Intractions                    '}).hover();
    await page.getByRole('link', {name:'Double Click'}).click();
    //Validation
    await expect(page).toHaveURL(/double-click/);
    //Click on Double Click button
    await page.getByRole('button',{name:'Double Click'}).dblclick();

    //validate
    await expect(page.locator('#Selenium')).toHaveText('Count   =  1');

    
});


