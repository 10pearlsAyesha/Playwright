const { expect } = require('@playwright/test');

class SettingsPage {
  constructor(page) {
    this.page = page;
    this.settingsTab = page.locator("//div[@class='v-list-item__title'][contains(text(),'Settings')]");
    this.platformLanguageOption = page.locator("//div[@class='options-lists']//div[@class='content']//h2[contains(text(),'Platform Language')]");
    this.languageDropdown = page.locator("//div[@class='v-select__selections']//div[@class='row']//div[1]//span");
    this.selectedLanguageInDropdown = page.locator("//div[@class='v-select__selections']//div[@class='row']//div[2]//span");
    this.selectAnotherLanguage = page.locator("//div[@class='row']//div[2]//span[contains(text(),'" + `${process.env.another_platform_language}` + "')]");
    this.selectDefaultLanguage = page.locator("(//div[@class='v-list-item__content']//div[@class='row']//div[1]//span[contains(text(),'" + `${process.env.default_platform_language}` + "')])[2]");
    this.saveButton = page.locator("//span[@class='v-btn__content'][contains(text(),'Save')]");

    this.supportOption = page.locator("//div[@class='options-lists']//div[@class='content']//h2[contains(text(),'Support')]");
    this.privacyOption = page.locator("//div[@class='options-lists']//div[@class='content']//h2[contains(text(),'Privacy')]");
    this.changePasswordOption = page.locator("//div[@class='options-lists']//div[@class='content']//h2[contains(text(),'Change Password')]");

    // this. = page.locator("");
    // this. = page.locator("");
    // this. = page.locator("");

    this.logoutButton = page.locator("//span[@class='v-btn__content'][contains(text(),'Log out')]");    
  }

  //Actions  
  async platformLanguage() {
    await this.settingsTab.click();
    await this.platformLanguageOption.click();
    await this.languageDropdown.click();
    await this.selectAnotherLanguage.click();
    await this.saveButton.click();
    await this.platformLanguageOption.click();

    const selectedLanguage = await this.selectedLanguageInDropdown.textContent();
    console.log("selected language: " + selectedLanguage);
    expect(selectedLanguage).toBe(`${process.env.another_platform_language}`);

    await this.languageDropdown.click();
    await this.selectDefaultLanguage.click();
    await this.saveButton.click();
  }

  async support() {
  }

  async privacy() {
  }

  async changePassword() {
  }
}

module.exports = SettingsPage;
