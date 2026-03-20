import loginData from '../../testdata/config.json';
import {test} from '../../fixtures/crmUI.fixture';

test.describe('Login Test Cases', () => {
  
    //TestCase 1
    test('Successful Login', async ({loginPage}) => {
         await loginPage.goto();
        //Valid login
         await loginPage.login(loginData.username, loginData.password);
        // Validation
         await loginPage.validateSuccessfulLogin();

  });

    //TestCase 2
    test('Invalid Login', async ({loginPage}) => {
        await loginPage.goto();
        //Invalid Login
         await loginPage.login(loginData.invalidusername, loginData.invalidpassword);
        //Validation
        await loginPage.validateInvalidLogin();
   
  });

});