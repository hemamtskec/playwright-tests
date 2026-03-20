import { test as base } from '@playwright/test';
//import { test as base } from './loginUI.fixture';//any prob change this

type AuthFixture = {
  token: string;
};

export const test = base.extend<AuthFixture>({
  token: async ({request }, use) => {
    const respose = await request.get(`${process.env.BASE_URL}/login`, {
      headers: {
      'Authorization': 'Basic ' + Buffer.from(`${process.env.CRM_USERNAME}:${process.env.CRM_PASSWORD}`).toString('base64'),
      'Content-Type': 'application/json'
    }
    }); 

    if (!respose.ok()) {
      throw new Error('Login failed');
    }

    const body = await respose.json();
    const token = body.jwtToken;

    await use(token);
  },
});