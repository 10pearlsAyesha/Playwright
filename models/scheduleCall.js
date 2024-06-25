const { expect } = require('@playwright/test');

class ScheduledPage {
  constructor(page) {
    this.page = page;
    this.scheduledTab = page.locator("//div[@class='app-menu-items']//div//a//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.scheduled_tab_text}` + "')]");
    this.reserveAFutureCallTimeButton = page.locator("//span[text()='" + `${process.env.reserve_a_future_call_time_button}` + "']");
    this.formTitle = page.locator("//div[@class='v-card__title'][contains(text(),'Reserve a Jeenie Interpreter')]");
    this.iSpeakDropdown = page.locator("(//div[@class='v-select__slot']//input[@placeholder='Select a language'])[1]");
    this.selectISpeakLanguage = page.locator("//div[@class='v-list-item__title'][text()='" + `${process.env.language}` + "']");
    this.getAnInterpreterForDropdown = page.locator("(//div[@class='v-select__slot']//input[@placeholder='Select a language'])[2]");
    this.selectGetAnInterpreterForLanguage = page.locator("(//div[@class='v-list-item__title'][text()='" + `${process.env.interpreter_language}` + "'])[2]");
    this.serviceDropdown = page.locator("(//div[@class='v-select__selections'])[3]");
    this.selectService = page.locator("//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.service}` + "')]");
    this.startDateField = page.locator("(//div[@class='v-text-field__slot'])[1]");
    this.startTimeField = page.locator("(//div[@class='v-text-field__slot'])[2]");
    this.selectStartTime = page.locator("(//span[@class='time-picker-column-item-text flex-1'][contains(text(),'02')])[1]");
    this.selectStartTimeAmPm = page.locator("(//span[@class='time-picker-column-item-text flex-1'][contains(text(),'pm')])[1]");
    this.endDateField = page.locator("(//div[@class='v-text-field__slot'])[3]");
    this.endTimeField = page.locator("(//div[@class='v-text-field__slot'])[4]");
    this.selectEndTime = page.locator("(//span[@class='time-picker-column-item-text flex-1'][contains(text(),'03')])[2]");
    this.selectEndTimeAmPm = page.locator("(//span[@class='time-picker-column-item-text flex-1'][contains(text(),'pm')])[2]");
    this.callPlatformDropdown = page.locator("(//div[@class='v-select__selections'])[4]");
    this.selectCallPlatform = page.locator("(//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.call_platform}` + "')])[2]");
    this.enterTopic = page.locator("(//div[@class='v-text-field__slot'])[5]//input");
    this.submitButton = page.locator("//div[contains(@class,'scheduled-session-form')]//span[@class='v-btn__content'][contains(text(),'" + `${process.env.submit_button}` + "')]");

    this.reserveAnInterpreterModal = page.locator("//div[@class='v-card__title'][contains(text(),'Reserve a Jeenie Interpreter')]");
    this.continueButton = page.locator("//span[@class='v-btn__content'][contains(text(),'" + `${process.env.continue_button}` + "')]");
    this.verifySelectedLanguages = page.locator("//span[@class='language'][contains(text(),'" + `${process.env.language}` + " <> " + `${process.env.interpreter_language}` + "')]");
    this.verifyTopic = page.locator("//span[contains(@class,'text-subtitle-2')][contains(text(),'" + `${process.env.topic_1}` + "')]");
  }

  //Actions  
  async scheduleCallForTomorrow() {
    await expect(this.formTitle).toBeVisible(); 
    await this.iSpeakDropdown.click();
    await this.selectISpeakLanguage.click();
    await this.getAnInterpreterForDropdown.click();
    await this.selectGetAnInterpreterForLanguage.click();
    await this.serviceDropdown.click();
    await this.selectService.click();

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dd = String(tomorrow.getDate());

    await this.startDateField.click();

    const daySelector = `//div[@class='v-btn__content' and text()='${dd}']`;

    await this.page.locator(daySelector).click();
    await this.startTimeField.click();
    await this.selectStartTime.click();
    await this.selectStartTimeAmPm.click();
    await this.endDateField.click();
    await this.page.locator(daySelector).click();
    await this.endTimeField.click();
    await this.selectEndTime.click();
    await this.selectEndTimeAmPm.click();
    await this.callPlatformDropdown.click();
    await this.selectCallPlatform.click();
    await this.enterTopic.type(`${process.env.topic_1}`);
    await this.submitButton.click();

    await expect(this.reserveAnInterpreterModal).toBeVisible();
    await this.continueButton.click();
    const verifyScheduledDate = `//span[@class='subtitle-2'][contains(text(),'${dd}')]`;
    await expect(this.page.locator(verifyScheduledDate)).toBeVisible();
    await expect(this.verifySelectedLanguages).toBeVisible(); 
    await expect(this.verifyTopic).toBeVisible(); 
  }
}

module.exports = ScheduledPage;
