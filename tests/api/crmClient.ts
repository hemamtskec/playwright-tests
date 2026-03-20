import { APIRequestContext } from '@playwright/test';
//import { Auth } from '../services/auth';

export class CRMClient {

  constructor(private request: APIRequestContext) {}
 
  //get http method for getting campaign details
  async getCampaign() {
    return await this.request.get('/campaign/all-campaigns');
  }

  //Post http method for creating a new campaign 
  async createCampaign(data: any) {
    return await this.request.post('/campaign', { data });
  }

  //Delete a campaign
  async deleteCampaign(campaignId: string) {
    return await this.request.delete(`/campaign?campaignId=${campaignId}`);
  }
  
}