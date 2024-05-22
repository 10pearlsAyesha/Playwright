
class LoginPage {
  constructor(page) {
    this.page = page;
    // this.email = page.locator("//input[@data-automation-name='email']");
    // this.password = page.locator("//input[@data-automation-name='password']");    
    this.email = page.locator('#input-31');
    this.password = page.locator('#input-35');
    this.loginButton = page.locator('#loginbtn');
    this.ratingModalCloseButton = page.locator('.v-card__title > .v-btn');
    this.rejoinModalCloseButton = page.locator("//div[@class='in-call-status pa-8 v-card v-sheet theme--light']//button[@class='v-btn v-btn--icon v-btn--round theme--light v-size--default']");
    this.getAJeeniePage = page.locator("//div[@class='v-toolbar__title']//img[contains(@src,'img')]");
  }

  //Actions  
  async loginCustomer() {
    await this.email.type(`${process.env.customer_email}`);
    await this.password.type(`${process.env.customer_password}`);
    await this.loginButton.click();

//     try {
//       await this.ratingModalCloseButton.click();
// //      await this.rejoinModalCloseButton.click();
//     } catch (error) {
//       //do nothing
//     }
  }

  async loginLinguist() {
    await this.email.type(`${process.env.linguist_email}`);
    await this.password.type(`${process.env.linguist_password}`);
    await this.loginButton.click();
  }

  async loginOwner() {
    await this.email.type(`${process.env.owner_email}`);
    await this.password.type(`${process.env.owner_password}`);
    await this.loginButton.click();
  }

  async loginMember() {
    await this.email.type(`${process.env.member_email}`);
    await this.password.type(`${process.env.member_password}`);
    await this.loginButton.click();
  }

  async loginCustomerWithNewPassword(){
    
  }
}

module.exports = LoginPage;
