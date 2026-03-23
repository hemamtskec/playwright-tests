import { test, expect, request } from '@playwright/test';

let token:string
let accountno:string

test('basic API GET request', async () => {

 // Create a new API request context
  const apiContext = await request.newContext({
    baseURL: 'https://us-central1-qa01-tekarch-accmanager.cloudfunctions.net', 
  });

  // Send POST request to login endpoint
  const loginResp = await apiContext.post('/login', {
    data: {
      username: 'Hema@tekarch.com',
      password: 'Admin@123'
    }
  });

  // Verify login was successful
  expect(loginResp.status()).toBe(201);

  // Get JSON response (e.g., token)
  const responseBody = await loginResp.json();
  console.log('Response:', responseBody);


  token = responseBody[0].token;
  console.log('Token:', token);

 
});

test('Get Data - API', async() =>{

   const apiContext = await request.newContext({
    baseURL: 'https://us-central1-qa01-tekarch-accmanager.cloudfunctions.net'
  });


  const response = await apiContext.get('/getdata',{
     headers: {
      Token: token,
      'Content-Type': 'application/json'
    } 
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body[0]).toMatchObject({
  accountno: expect.any(String),
  departmentno: expect.any(String),
  salary: expect.any(String),
  pincode: expect.any(String),
  userid: expect.any(String),
  id: expect.any(String)
});

  expect(body[0].accountno).toBe('TA-0000000');
  console.log(body[0].accountno);


   // Validate array exists
//   expect(Array.isArray(body)).toBeTruthy();

//   // Loop through each object in array
//   for (const item of body) {

//     // Validate fields exist
//     expect(item).toHaveProperty('accountno');
//     expect(item).toHaveProperty('departmentno');
//     expect(item).toHaveProperty('salary');
//     expect(item).toHaveProperty('pincode');
//     expect(item).toHaveProperty('userid');
//     expect(item).toHaveProperty('id');

//     // Validate values are not empty
//     expect(item.accountno).not.toBe('');
//     expect(item.departmentno).not.toBe('');
//     expect(item.salary).not.toBe('');
//     expect(item.pincode).not.toBe('');
//     expect(item.userid).not.toBe('');
//     expect(item.id).not.toBe('');

//     console.log(`Account No: ${item.accountno}, Department No: ${item.departmentno},
//          Salary: ${item.salary}, Pincode: ${item.pincode}, User Id: ${item.userid}, ID: ${item.id}`);
//   }

});