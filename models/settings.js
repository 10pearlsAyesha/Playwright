const { expect } = require('@playwright/test');

class SettingsPage {
  constructor(page) {
    this.page = page;
    this.settingsTab = page.locator("//div[@class='v-list-item__title'][contains(text(),'Settings')]");
    this.platformLanguageOption = page.locator("//div[@class='options-lists']//div[@class='content']//h2[contains(text(),'Platform Language')]");
    this.languageDropdown = page.locator("//div[@class='v-select__selections']//div[@class='row']//div[1]//span");
    this.selectedLanguageInDropdown = page.locator("//div[@class='v-select__selections']//div[@class='row']//div[2]//span");
    this.selectAnotherLanguage = page.locator("//div[@class='row']//div[2]//span[contains(text(),'" + `${process.env.another_platform_language}` + "')]");
    this.selectDefaultLanguage = page.locator("//div[@class='v-list-item__content']//div[@class='row']//div[1]//span[contains(text(),'" + `${process.env.default_platform_language}` + "')]");
    this.platformLanguageSaveButton = page.locator("//button[contains(@class,'save')]//span");

    this.supportOption = page.locator("//div[@class='options-lists']//div[@class='content']//h2[contains(text(),'Support')]");
    this.feedbackReasonDropdown = page.locator("//div[@class='v-select__selections']//div[@class='v-select__selection v-select__selection--comma']");
    this.selectFeedbackReason = page.locator("//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.feedback_reason}` + "')]");
    this.addFeedbackMessage = page.locator("//textarea[@placeholder='Please enter your message.']");
    this.supportSubmitButton = page.locator("//span[@class='v-btn__content'][contains(text(),'Submit')]");
    this.supportThankyouText = page.locator("//h2[@class='tagline text-center'][contains(text(),'" + `${process.env.support_thankyou_text}` + "')]");

    this.privacyOption = page.locator("//div[@class='options-lists']//div[@class='content']//h2[contains(text(),'Privacy')]");
    this.termsOfUseOption = page.locator("//a[@id='terms-of-use']");
    this.privacyNoticeOption = page.locator("//a[@id='privacy-notice']");
    this.deleteAccountOption = page.locator("//div[@class='content']//h2[contains(text(),'Delete Account')]");



    this.changePasswordOption = page.locator("//div[@class='options-lists']//div[@class='content']//h2[contains(text(),'Change Password')]");
    // this. = page.locator("");
    // this. = page.locator("");
    // this. = page.locator("");

    this.logoutButton = page.locator("//span[@class='v-btn__content'][contains(text(),'Log out')]");    
  }

  //Platform Language  
  async platformLanguage() {
    await this.platformLanguageOption.click();
    await this.languageDropdown.click();
    await this.selectAnotherLanguage.click();
    await this.platformLanguageSaveButton.click();
    await this.platformLanguageOption.click();

    const selectedLanguage = await this.selectedLanguageInDropdown.textContent();
    expect(selectedLanguage).toBe(`${process.env.another_platform_language}`);

    await this.languageDropdown.click();
    await this.selectDefaultLanguage.click();
    await this.platformLanguageSaveButton.click();
  }

  //Support
  async support() {
    await this.supportOption.click();
    await this.feedbackReasonDropdown.click();
    await this.selectFeedbackReason.click();
    await this.addFeedbackMessage.type(`${process.env.feedback_message}`);
    await this.supportSubmitButton.click();
    await expect(this.supportThankyouText).toBeVisible(); 
  }

  //Privacy 
  async privacyTermsOfUse() {
    await this.privacyOption.click();
    
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.termsOfUseOption.click()
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  //Change Password
  async changePassword() {
  }
}

module.exports = SettingsPage;
