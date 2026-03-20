import { Page, Locator,expect } from '@playwright/test';

export class CampaignPage {
  
    
    readonly page: Page;
    readonly createcampaignButton: Locator;
    readonly campaignnameInput: Locator;
    readonly targetsizeInput: Locator;
    readonly createButton: Locator;
    readonly campaignDD: Locator;
    readonly campaignIdInput: Locator;
    readonly expectedDate:Locator;
    readonly searchByCampaign:string;
    readonly editIcon:Locator;
    readonly editToolTip:Locator;

constructor(page: Page) {
    this.page = page;
    this.createcampaignButton = page.getByRole('button', { name: 'Create Campaign' });
    this.campaignnameInput = page.locator('input[name="campaignName"]');
    this.targetsizeInput = page.locator('input[name="targetSize"]');
    this.createButton = page.getByRole('button', { name: 'Create Campaign' });
    this.campaignDD=page.locator('select.form-control');
    this.campaignIdInput=page.getByPlaceholder('Search by Campaign Id');
    this.expectedDate=page.locator('input[name="expectedCloseDate"]');
    this.searchByCampaign='Search by Campaign Id';
    this.editIcon=page.locator('.edit');
    this.editToolTip=page.locator('[title="Edit"]');
  }

  //create campaign functionality
  async createcampaign(campaignnameInput: string, targetsizeInput: string) {
    
    await this.createcampaignButton.click();
    await this.campaignnameInput.fill(campaignnameInput);
    await this.targetsizeInput.fill(targetsizeInput);
    await this.expectedDate.click();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const dateString = futureDate.toISOString().split('T')[0];
    await this.expectedDate.fill(dateString);
    await this.createButton.click();

  }

  //Search Campaign functionality
  async searchcampaign(campaignIdInput: string) {
    await this.campaignDD.selectOption(this.searchByCampaign);
    await this.campaignIdInput.click();
    await this.campaignIdInput.fill(campaignIdInput);//CAM07415
  }

  //Validate Create Campaign
   async validateCreateCampaign(campaignName: string) {
    const row = this.page.locator('tr', {
    has: this.page.locator('td', { hasText: campaignName })
    });

    await expect(row).toBeVisible();
   }

   //Validate Search Campaign
   async validateSearchCampaign(campaignId: string) {
     const row = this.page.locator('tr', {
    has: this.page.locator('td', { hasText: campaignId })
    });

    await expect(row).toBeVisible();
   }
   //Tool Tip Verification
   async tooltipVerification() {
        await this.editIcon.hover();
        await expect(this.editToolTip).toBeVisible();
        await expect(this.editToolTip).toHaveAttribute('title','Edit');

    }

   

}