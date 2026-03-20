import testData from '../../testdata/config.json';
import {test} from '../../fixtures/crmUI.fixture';


test.describe('Campaign Tests', () => {

//Test Case 1
test('Create Campaign Successfully', async ({campaignPage }) => {
    
    const randomStr = Math.random().toString(36).replace(/[^a-z]/g, '').substring(0, 6);
    const name=`${testData.campaignName}${randomStr}`;

    await campaignPage.createcampaign(name, testData.targetSize);
    //Validation
    await campaignPage.validateCreateCampaign(name);

});

//Test Case 2
test('Search Campaign using Id', async ({campaignPage }) => {
   
    //search campaign
    await campaignPage.searchcampaign(testData.campaignId);

    //Validation
    await campaignPage.validateSearchCampaign(testData.campaignId);
     
});

//Test Case 3
test("Test Tool Tip",async({campaignPage}) => {
    //search campaign
    await campaignPage.searchcampaign(testData.campaignId);

    //Validation
    await campaignPage.validateSearchCampaign(testData.campaignId);

    //ToolTip Verification
    await campaignPage.tooltipVerification();
    
});

});