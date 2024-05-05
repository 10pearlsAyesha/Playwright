
class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.locator('#input-31');
    this.password = page.locator('#input-35');
    this.loginButton = page.locator('#loginbtn');
    this.ratingModalCloseButton = page.locator('.v-card__title > .v-btn');
    this.rejoinModalCloseButton = page.locator("//div[@class='in-call-status pa-8 v-card v-sheet theme--light']//button[@class='v-btn v-btn--icon v-btn--round theme--light v-size--default']");
    this.getAJeeniePage = page.locator("//div[@class='titles text-center']//h1[contains(text(),'" + `${process.env.get_a_jeenie_page_text}`+ "')]");
  }

  //Actions  
  async loginCustomer() {
    await this.email.type(`${process.env.customer_email}`);
    await this.password.type(`${process.env.customer_password}`);
    await this.loginButton.click();

    // try {
    //   await this.ratingModalCloseButton.click();
    //   await this.rejoinModalCloseButton.click();
    // } catch (error) {
    //   //do nothing
    // }
  }

  async loginLinguist() {
    await this.email.type(`${process.env.linguist_email}`);
    await this.password.type(`${process.env.linguist_password}`);
    await this.loginButton.click();

    // try {
    //   await this.ratingModalCloseButton.click();
    //   await this.rejoinModalCloseButton.click();
    // } catch (error) {
    //   //do nothing
    // }
  }

}

module.exports = LoginPage;
