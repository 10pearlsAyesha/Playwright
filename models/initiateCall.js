
class initiateCallCase {
  constructor(page) {
    this.page = page;
    this.iSpeak = page.locator("//input[@placeholder='Select your language']");
    this.selectLanguage = page.locator("//div[@id='list-52']//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.language}` + "')]");
    this.getAJeeniePage = page.locator("//div[@class='titles text-center']//h1[contains(text(),'" + `${process.env.get_a_jeenie_page_text}` + "')]");
    this.service = page.locator("(//input[@placeholder='Select an option'])[1]");
    this.selectService = page.locator("//div[@id='list-57']//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.service}` + "')]");
    this.getAnInterpreterFor = page.locator("//div[@class='languageSelector'][2]//div[@class='v-select__slot']//input[1]");
    this.selectInterpreterLanguage = page.locator("//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.interpreter_language}` + "')]");
    this.audioButton = page.locator("//span[@class='v-btn__content']//span[contains(text(),'Audio')]");
    this.videoButton = page.locator("//span[@class='v-btn__content']//span[contains(text(),'Video')]");
    this.callConnectingPage = page.locator("(//div[@class='logo-pulse'])[2]");
    this.gettingAJeenieNowText = page.locator("//p[@class='status-text'][contains(text(),'" + `${process.env.getting_a_jeenie_now_text}` + "')]");
    this.lookingForJeenieText = page.locator("//p[@class='status-text'][contains(text(),'" + `${process.env.looking_for_jeenie_text}` + "')]");
    this.cancelCallButton = page.locator("(//img[@class='hang-up'])[2]");
    this.cancelCallConfirmationModal = page.locator(".cancel-call-card.v-card.v-sheet.theme--light");
    this.yesCancelCallButton = page.locator("//span[@class='v-btn__content'][contains(text(),'" + `${process.env.yes_cancel_call_button_text}` + "')]");
    this.addPaymentModal = page.locator(".v-dialog.v-dialog--active.v-dialog--persistent");
    this.paymentModalSkipLink = page.locator("//span[@class='v-btn__content'][contains(text(),'" + `${process.env.skip_and_place_call_text}` + "')]");
  }

  //Actions  
  async initiateCallThroughCustomer() {
    await this.iSpeak.clear;
    await this.iSpeak.type(`${process.env.language}`);
    await this.getAJeeniePage.click();
    await this.service.type(`${process.env.service}`);
    await this.getAnInterpreterFor.click();
    await this.getAnInterpreterFor.type(`${process.env.interpreter_language}`);
    await this.selectInterpreterLanguage.click();
//    await this.videoButton.click();
  }
}

module.exports = initiateCallCase;
