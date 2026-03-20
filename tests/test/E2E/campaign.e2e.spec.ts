import { expect } from '@playwright/test';
import testData from '../../testdata/config.json';
import {test} from '../../fixtures/crmUI.fixture';

//Test Case for creating and verify create campaign using UI+API
test('Create campaign via UI then verify in API', async ({ campaignPage,request }) => {

//Create a new Campaign
const randomStr = Math.random().toString(36).replace(/[^a-z]/g, '').substring(0, 6);
const name=`${testData.campaignName}${randomStr}`;
await campaignPage.createcampaign(name, testData.targetSize);

//Validation
await campaignPage.validateCreateCampaign(`${testData.campaignName}${randomStr}`);


//Verify in API
const username = 'rmgyantra';
const password = 'rmgy@9999';

//Login CRM Application
  const response = await request.get('http://49.249.28.218:8098/login', {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
      'Content-Type': 'application/json'
    }
    });

      // Verify login was successful
      expect(response.status()).toBe(202);

      //Save the token
      const responseBody = await response.json();
      const jwtToken= responseBody.jwtToken;

      //Get request to get campaign details
        const res = await request.get('http://49.249.28.218:8098/campaign/all-campaigns', {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
        //Validate status code
        expect(res.status()).toBe(200);
        //Print the Campaign details from the body
        const body = await res.json();
        const campaign = body.find((c: any) => c.campaignName === name);
        console.log(campaign);
        expect(campaign).toBeTruthy();
        expect(campaign.campaignName).toBe(name);
});