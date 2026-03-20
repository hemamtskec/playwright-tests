import { test, expect, request } from '@playwright/test';
 let jwtToken:string;
test('Login Request', async ({request}) => {
 
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
  console.log(await response.json());
  //Save the token
  const responseBody = await response.json();
  jwtToken= responseBody.jwtToken;
  console.log('Token:', jwtToken);
 
});

test('Get Data with JWT token', async ({ request }) => {
  //Get request to get campaign details
  const response = await request.get('http://49.249.28.218:8098/campaign/all-campaigns', {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  });
  //Validate status code
  expect(response.status()).toBe(200);
  //Print the Campaign details from the body
  const body = await response.json();
  console.log(body);
});

test('Create Campaign',async({request})=>{
const response = await request.post('http://49.249.28.218:8098/campaign', {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    },
    data:{
        "campaignName": "HHPost",
        "campaignStatus": "",
        "targetSize": 15,
        "expectedCloseDate": "",
        "targetAudience": "",
        "description": "Test"
    }
  });

  expect(response.status()).toBe(201);
  //Log details of campaign created
  const campaign = await response.json();
  console.log('Campaign created:',campaign);
  expect(campaign.campaignName).toBe('HHPost');
});

test('Delete Campaign',async({request})=>{
const campaignId = 'CAM09537';
const response = await request.delete(`http://49.249.28.218:8098/campaign?campaignId=${campaignId}`,
   {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
 //Validate status code
  expect(response.status()).toBe(204);
  
  console.log(`Campaign ${campaignId} deleted successfully`);
  
});