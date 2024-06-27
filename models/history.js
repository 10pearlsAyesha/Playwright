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

    this.moreDetailsIcon = page.locator("(//tbody//tr//td[4]//div//button[1]//span//i)[1]");
    this.callDetailsModalTitle = page.locator("//div[contains(@class,'v-card__title')][text()='Call Details']");
    this.typeOfCallValue = page.locator("//span[@class='call-type text'][text()='" + `${process.env.call_type_filter}` + "']");
    this.userValue = page.locator("//td[contains(text(),'" + `${process.env.user_filter}` + "')]");
    this.serviceValue = page.locator("//td[contains(text(),'" + `${process.env.service_filter}` + "')]");
    this.platformValue = page.locator("//td//span[contains(text(),'" + `${process.env.platform_filter}` + "')]");
    this.closeIconCallDetailsModal = page.locator("//span//i[contains(@class,'mdi-close')]");

    this.searchForDateRangeField = page.locator("//input[@id='call-history-datepicker']");
    this.calendarPreviousArrow = page.locator("//div[contains(@class,'v-date-picker-header')]//i[contains(@class,'mdi-chevron-left')]");
    this.calendarNextArrow = page.locator("//div[contains(@class,'v-date-picker-header')]//i[contains(@class,'mdi-chevron-right')]");

    this.listedDateAndTime = page.locator("(//tbody//tr//td[1]//span)[1]");
    this.listedLanguage = page.locator("(//tbody//tr//td[1]//span[contains(@class,'language')])[1]");
    this.listedLinguistName = page.locator("(//tbody//tr//td[3]//span[1])[1]");
    this.listedLinguistID = page.locator("(//tbody//tr//td[3]//span[2])[1]");
    this.detailedDateAndTime = page.locator("//div[@id='callDetailTable']//tbody//tr[1]//td[2]//span[1]");
    this.detailedLanguage = page.locator("//div[@id='callDetailTable']//tbody//tr[4]//td[2]");
    this.detailedLinguistName = page.locator("//div[@class='d-sm-flex align-center pl-6 mt-2']//div[2]//div//span");
    this.detailedLinguistID = page.locator("//div[@class='d-sm-flex align-center pl-6 mt-2']//div[2]//span[2]");  

    this.downloadCsvButton = page.locator("//img[contains(@class,'download-btn')]");
    this.callHistoryDownloadTitle = page.locator("//div[contains(@class,'download-title')][text()='Call History Download']");
    //this. = page.locator("");

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

    await this.moreDetailsIcon.click();
    await expect(this.typeOfCallValue).toBeVisible();
    await expect(this.userValue).toBeVisible();
    await expect(this.serviceValue).toBeVisible();
    await expect(this.platformValue).toBeVisible();
    await this.closeIconCallDetailsModal.click();

    await this.resetFilterLink.click();
    await this.page.waitForTimeout(4000);
    await expect(this.getTotalRecordsCount).toHaveText(totalRecords);
  }

  async selectDate(day) {
    await this.page.locator(`//td//button//div[text()='${day}']`).click(); // Click the button containing the day
  }

  async searchByDateRange() {
    const today = new Date();

    await this.page.waitForTimeout(3000);
    await this.searchForDateRangeField.click();
    await this.calendarPreviousArrow.click();
    await this.page.waitForTimeout(2000);
    await this.selectDate('1'); // Select the start date: 1st of the last month
    await this.calendarNextArrow.click();
    await this.page.waitForTimeout(2000);
    await this.selectDate(String(today.getDate())); // Select the end date: today
    await this.page.waitForTimeout(3000);
  }

  async verifyAppliedDateRangeResults() {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    
    const listedDatesElements = await this.listedDateAndTime.allTextContents();
    for (let dateTimeText of listedDatesElements) {
      const dateText = dateTimeText.split(',')[0]; // Extract the date part "Jun 26"
      const [month, day] = dateText.split(' ');
      const monthIndex = new Date(`${month} 1`).getMonth();
      const dateObject = new Date(today.getFullYear(), monthIndex, parseInt(day));

      if (dateObject < lastMonth || dateObject > today) {
        throw new Error(`Date ${dateText} is outside the selected date range`);
      }
    }
  }

  async downloadCSV() {
    await this.downloadCsvButton.click();
    await expect(this.callHistoryDownloadTitle).toBeVisible();

  }

  async checkCallDetails() {
    await this.moreDetailsIcon.click();

    let detailedDateAndTimeValue = await this.detailedDateAndTime.textContent();
    detailedDateAndTimeValue = detailedDateAndTimeValue.replace('|', '').trim();
    const detailedLanguageValue = await this.detailedLanguage.textContent();
    const detailedLinguistNameValue = await this.detailedLinguistName.textContent();
    const detailedLinguistIDValue = await this.detailedLinguistID.textContent();

    await expect(this.listedDateAndTime).toHaveText(detailedDateAndTimeValue);
    await expect(this.listedLanguage).toHaveText(detailedLanguageValue);
    await expect(this.listedLinguistName).toHaveText(detailedLinguistNameValue);
    await expect(this.listedLinguistID).toHaveText(detailedLinguistIDValue);
    await this.closeIconCallDetailsModal.click();
  }
}

module.exports = historyPage;
