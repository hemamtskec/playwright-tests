import { Page, Locator,expect } from '@playwright/test';
export class AdminConsolePage {
      
readonly page: Page;
readonly adminLink:Locator;
readonly adminLinkDD:Locator;
  
   
constructor(page: Page) {
    this.page = page;
    this.adminLink=page.getByText('Admin Console');
    this.adminLinkDD=page.locator('text=Create User');
  }

  async verifyMouseHover(){
    //Hover over Admin Console
    await this.adminLink.hover({ force: true });
    //Validate visibility 
    await expect(this.adminLinkDD).toBeVisible();
    
    await this.adminLinkDD.waitFor({ state: 'visible', timeout: 5000 });
    //await this.adminLinkDD.click();
  }
}