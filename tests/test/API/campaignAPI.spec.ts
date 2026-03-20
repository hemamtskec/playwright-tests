//import { CRMClient } from '../tests/api/crmClient';
import { expect } from '@playwright/test';
import { campaignData } from '../../testdata/campaignData';
import { test} from '../../fixtures/api.fixture';


test.describe('CRM API Tests', () => {

  let id: string;

  //get all campaign details
  test('Get Campaigns', async ({ apiCRM }) => {
    const res = await apiCRM.getCampaign();
    expect(res.status()).toBe(200);
    const body = await res.json();
    console.log(body);
  });


  //Create a new campaign
  test('Create Campaign', async ({ apiCRM }) => {
    const res = await apiCRM.createCampaign(campaignData.campaign);
    expect(res.ok()).toBeTruthy();
      expect(res.status()).toBe(201);
    const body = await res.json();
    id = body.campaignId;
    console.log('Campaign created:',body);
  });


  //Delete Campaign
  test('Delete Campaign', async ({ apiCRM }) => {
    const res = await apiCRM.deleteCampaign(id);
    expect(res.status()).toBe(204);
    console.log('Campaign deleted:',id);
  });
});