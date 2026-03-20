import { test as base } from '../fixtures/loginUI.fixture';
import { CampaignPage } from '../page/CampaignPage';
import { ContactPage } from '../page/ContactPage';
import { AdminConsolePage } from '../page/AdminConsolePage';
import { LoginPage } from '../page/LoginPage';

type CrmFixtures = {
  loginPage: LoginPage;
  campaignPage: CampaignPage;
  contactPage: ContactPage;
  adminConsolePage:AdminConsolePage;
};

export const test = base.extend<CrmFixtures>({
    loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page); 
    await use(loginPage);
    },

  campaignPage: async ({ loggedInPage }, use) => {
    const campaignPage = new CampaignPage(loggedInPage);
    await use(campaignPage);
  },

  contactPage: async ({ loggedInPage }, use) => {
    const contactPage = new ContactPage(loggedInPage);
    await use(contactPage);
  },

   adminConsolePage: async ({ loggedInPage }, use) => {
    const adminConsolePage = new AdminConsolePage(loggedInPage);
    await use(adminConsolePage);
  },

});