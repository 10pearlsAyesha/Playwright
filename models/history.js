const { expect } = require('@playwright/test');

class historyPage {
  constructor(page) {
    this.page = page;
    this.historyTab = page.locator("//div[@class='app-menu-items']//div//a//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.history_tab_text}` + "')]");
    this.getTotalRecordsCount = page.locator("//div[@class='v-data-footer__pagination']");
    this.usersFilter = page.locator("//div[@class='v-select__selections']//input[@placeholder='Users']");
    this.selectUser = page.locator("//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.user_filter}` + "')]");
    this.serviceFilter = page.locator("//div[@class='v-select__selections']//input[@placeholder='Service']");
    this.selectService = page.locator("//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.service_filter}` + "')]");
    this.moreFiltersLink = page.locator("//span[text()='More Filters']");
    this.historyHeading = page.locator("//span[text()='History']");
    this.platformFilter = page.locator("//div[@class='v-select__selections']//input[@placeholder='Platform']");
    this.selectPlatform = page.locator("//div[@class='v-list-item__title'][text()='" + `${process.env.platform_filter}` + "']");
    this.callTypeFilter = page.locator("//div[@class='v-select__selections']//input[@placeholder='Call Type']");
    this.selectCallType = page.locator("//div[@role='listbox']//div[@class='v-list-item__title'][text()='" + `${process.env.call_type_filter}` + "']");
    this.applyFiltersButton = page.locator("//span[text()='" + `${process.env.apply_filter_button}` + "']");
    this.resetFilterLink = page.locator("//span[contains(@class,'reset-text')]");


    this.actionRequired = page.locator("(//tbody//tr//td[3]//div//button//span//i[@class='v-icon notranslate alert mdi mdi-alert theme--light'])[1]");
  }

  //Actions  
  async applyAndResetFilter() {
    const totalRecords = await this.getTotalRecordsCount.textContent();
    
    await this.usersFilter.click();
    await this.selectUser.click();
    await this.serviceFilter.click();
    await this.selectService.click();
    await this.moreFiltersLink.click();
    await this.moreFiltersLink.click();
    await this.platformFilter.click();
    await this.selectPlatform.click();
    await this.historyHeading.click();
    await this.callTypeFilter.click();
    await this.selectCallType.click();
    await this.historyHeading.click();
    await this.applyFiltersButton.click();
    await this.page.waitForTimeout(4000);
    await expect(this.getTotalRecordsCount).not.toHaveText(totalRecords);
    await this.resetFilterLink.click();
    await this.page.waitForTimeout(4000);
    await expect(this.getTotalRecordsCount).toHaveText(totalRecords);
  }

  async searchByDateRange() {
  }

  async checkDetails() {
    await this.actionRequired.click();
  }

  async downloadCSV() {
    await this.actionRequired.click();
  }
}

module.exports = historyPage;
