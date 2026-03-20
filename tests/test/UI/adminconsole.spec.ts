import {test} from '../../fixtures/crmUI.fixture';

test.describe('Admin Console Tests', () => {
// let loginPage: LoginPage;
// let campaignPage: CampaignPage;
//let screenshotUtil: ScreenshotUtil;
// let baseTest: BaseTest;
// let adminconsole: AdminConsolePage;
//Before Method
// test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     campaignPage = new CampaignPage(page);
//     baseTest=new BaseTest(page);
//     adminconsole= new AdminConsolePage(page);
//     //Application Launch
//     await baseTest.launchApplication();
// });
//After Method
// test.afterEach(async ({page}, testInfo) => {
//     screenshotUtil = new ScreenshotUtil();
//     //take screenshot
//     await screenshotUtil.takeScreenshot(page,testInfo);
    
// });

//Test Case 1
test('Verify Admin Console Mouse Hover', async ({adminConsolePage}) => {

    await adminConsolePage.verifyMouseHover();

});

});

