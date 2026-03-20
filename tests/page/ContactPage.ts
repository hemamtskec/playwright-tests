import { Page, Locator,expect, BrowserContext} from '@playwright/test';
import { PopUpPage } from './PopUpPage';

export class ContactPage {
  readonly page: Page;
 // readonly context : BrowserContext;
  readonly contactLink: Locator;
  readonly contactHeader: Locator;
  readonly createContactButton: Locator;
  readonly organizationInput : Locator;
  readonly titleInput: Locator;
  readonly mobileInput: Locator;
  readonly contactButton: Locator;
  readonly contactnameInput: Locator;
  readonly campaignHeader: Locator;
  readonly campaignDD:Locator;
  readonly campaignIdInput:Locator;
  readonly selectButton: Locator;
  readonly popupButton: string;
  popupPage?: PopUpPage;
  //constructor(page: Page,context: BrowserContext)
  constructor(page: Page) {
    this.page = page;
    //this.context = context;
    this.contactLink = page.getByRole('link', { name: 'Contacts' });
    this.contactHeader=page.getByRole('heading',{name: 'Contacts'});
    this.createContactButton=page.getByRole('button', { name: 'Create Contact' });
    this.organizationInput=page.locator('input[name="organizationName"]');
    this.titleInput=page.locator('input[name="title"]');
    this.mobileInput=page.locator('input[name="mobile"]');
    this.contactnameInput=page.locator('input[name="contactName"]');
    this.contactButton=page.getByRole('button', { name: 'Create Contact' });
    this.campaignHeader=page.locator('h3:has-text("Select a Campaign")');
    this.campaignDD=page.locator('#search-criteria');
    this.campaignIdInput=page.locator('#search-input');
    this.selectButton=page.getByRole('button', { name: 'Select' });
    this.popupButton='button:has(svg)';
  }

  async clickContact(){
    await this.contactLink.click();
  }

  async validateContactPage(expectedHeader: string){
    await expect(this.contactHeader).toHaveText(expectedHeader);
  }

  async createContact(contactnameInput:string,organizationInput:string,
    titleInput:string, mobileInput: string)
    {
    await this.createContactButton.click();
    await this.contactnameInput.fill(contactnameInput);
    await this.organizationInput.fill(organizationInput);
    await this.titleInput.fill(titleInput);
    await this.mobileInput.fill(mobileInput);

    //Add Campaign Popup
    const [popup] = await Promise.all([
    this.page.waitForEvent('popup'),
    this.page.click(this.popupButton)
    ]);

    await popup.waitForLoadState();
    this.popupPage=new PopUpPage(popup);
    await this.popupPage.addCampaignPopup();
     
    //await popup.close();//close the popup
    await this.page.bringToFront(); //back on the parent page

    //Click create contact
    await this.contactButton.click();
  }

  async validateCreateContact(contactName:string){
    const row = this.page.locator('tr', {
    has: this.page.locator('td', { hasText: contactName })
    });

    await expect(row).toBeVisible();
  }

}
