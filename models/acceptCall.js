
class acceptCallCase {
  constructor(page) {
    this.page = page;
    this.availableForCallsStatus = page.locator("//div[@id='availability-status']//span[contains(text(),'" + `${process.env.available_for_calls_status_text}` + "')]");
    this.incomingCallModal = page.locator("//div[@class='incomming-call px-4 v-card v-sheet theme--light']");
    this.acceptCallButton = page.locator("//span[@class='v-btn__content'][contains(text(),'" + `${process.env.accept_button_text}` + "')]");
    this.connectingText = page.locator("//p[@class='status-text'][contains(text(),'" + `${process.env.connecting_text}` + "')]");
    this.sessionTimer = page.locator("//div[@class='session-timer']");
  }

  //Actions  
  async acceptCallThroughLinguist() {
    await this.acceptCallButton.click();
    await expect(this.connectingText).toBeVisible();
    await expect(this.sessionTimer).toBeVisible();
  }
}

module.exports = acceptCallCase;
