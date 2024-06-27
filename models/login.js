
class LoginPage {
  constructor(page) {
    this.page = page;
    // this.email = page.locator("//input[@data-automation-name='email']");
    // this.password = page.locator("//input[@data-automation-name='password']");    
    this.email = page.locator("(//input[@required = 'required'])[1]");
    this.password = page.locator("(//input[@required = 'required'])[2]");
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
  }

  async loginLinguist() {
    await this.email.type(`${process.env.linguist_email}`);
    await this.password.type(`${process.env.linguist_password}`);
    await this.loginButton.click();
  }

  async loginOwnerEnterpPayg() {
    await this.email.type(`${process.env.owner_enterp_payg_email}`);
    await this.password.type(`${process.env.owner_enterp_payg_password}`);
    await this.loginButton.click();
  }

  async loginOwnerEnterpSub() {
    await this.email.type(`${process.env.owner_enterp_sub_email}`);
    await this.password.type(`${process.env.owner_enterp_sub_password}`);
    await this.loginButton.click();
  }

  async loginOwnerHealthcareSub() {
    await this.email.type(`${process.env.owner_healthcare_sub_email}`);
    await this.password.type(`${process.env.owner_healthcare_sub_password}`);
    await this.loginButton.click();
  }

  async loginOwnerEnterpMonthly() {
    await this.email.type(`${process.env.owner_enterp_monthly_email}`);
    await this.password.type(`${process.env.owner_enterp_monthly_password}`);
    await this.loginButton.click();
  }

  async loginMember() {
    await this.email.type(`${process.env.member_email}`);
    await this.password.type(`${process.env.member_password}`);
    await this.loginButton.click();
  }

  async closeModals() {
    try {
      await this.ratingModalCloseButton.click();
      await this.wait(2000);
      await this.rejoinModalCloseButton.click();
      await this.wait(2000);
    } catch (error) {
      //do nothing
    }
  }

  async loginCustomerWithNewPassword(){
    await this.email.type(`${process.env.customer_email}`);
    await this.password.type(`${process.env.new_password}`);
    await this.loginButton.click();    
  }
}

module.exports = LoginPage;
