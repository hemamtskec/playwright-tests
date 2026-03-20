import { Page, Locator,expect, BrowserContext} from '@playwright/test';
import testData from '../testdata/config.json';
export class PopUpPage {

     readonly page: Page;
     readonly popupHeader: Locator;
     readonly campaignList: Locator;
     readonly campaignDD:Locator;
     readonly searchTxtBox:Locator;
     readonly selectButton: Locator;
     readonly searchBy: string;

     constructor(page: Page) {
     this.page = page;
     this.popupHeader= page.locator('h3', { hasText: 'Select a Campaign' });;
     this.campaignList = page.locator('#campaign-table tbody tr');
     this.campaignDD = page.locator('#search-criteria');
     this.searchTxtBox = page.getByPlaceholder('Search');
     this.selectButton= page.getByRole('button', { name: 'Select' });
     this.searchBy='Campaign Name';
  }

  async addCampaignPopup() {
    await this.page.waitForLoadState('domcontentloaded'); 
    await expect(this.popupHeader).toBeVisible();
 
    // Wait for table to load
    await expect(this.campaignList.first()).toBeVisible();

    await this.campaignDD.selectOption(this.searchBy);
    await this.searchTxtBox.click();
    await this.searchTxtBox.fill(testData.searchCampaign);
        
    // Wait for table to refresh and show campaign
    await expect(
    this.campaignList.filter({ hasText: testData.searchCampaign })
    ).toBeVisible();

    //Click select button
    await this.selectButton.first().click();
  }


}