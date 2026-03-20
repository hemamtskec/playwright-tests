// tests/fixtures/api.fixture.ts
import { request, APIRequestContext } from '@playwright/test';
import { test as base } from './auth.fixture';
import { CRMClient } from '../api/crmClient';

type APIFixtures  = {
  apiCRM: CRMClient;
};

// merge auth + api
export const test = base.extend<APIFixtures>({
  apiCRM: async ({ token }, use) => {
    const apiContext = await request.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log("Token is:",token)
    const apiCRM = new CRMClient(apiContext);
    await use(apiCRM);
    await apiContext.dispose();
  },
});