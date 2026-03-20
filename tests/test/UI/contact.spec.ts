import testData from '../../testdata/config.json';
import {test} from '../../fixtures/crmUI.fixture';


test.describe('Contact Test Cases', () => {

    //TestCase 1
    test('Create Contact', async ({contactPage}) => {
         
        //Click Contact 
        await contactPage.clickContact();
        
        //Validate Contact page
        await contactPage.validateContactPage(testData.expectedHeader);

        //Generate unique name
        const randomStr = Math.random().toString(36).replace(/[^a-z]/g, '').substring(0, 6);
        const conName=`${testData.contactName}${randomStr}`;
        //Generate unique phone number
        const phoneNumber = '9' + Date.now().toString().slice(-9);

        //Create Contact
        await contactPage.createContact(conName,testData.organizationName
            ,testData.contactTitle,phoneNumber
        );

        //Validate new contact
        await contactPage.validateCreateContact(conName);
  });

   

});