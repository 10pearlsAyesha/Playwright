
class submitRatingCase {
  constructor(page) {
    this.page = page;
    this.historyTab = page.locator("//div[@class='app-menu-items']//div//a//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.history_tab_text}` + "')]");
    this.rejoinModalCloseButton = page.locator("//div[@class='in-call-status pa-8 v-card v-sheet theme--light']//button[@class='v-btn v-btn--icon v-btn--round theme--light v-size--default']");
    this.actionRequired = page.locator("//tbody//tr//td[3]//button//span//i[@class='v-icon notranslate ma-1 alert mdi mdi-alert theme--light'][1]");
    this.addRatingButton = page.locator("//span[@class='v-btn__content']//span[contains(text(),'" + `${process.env.add_rating_button_text}` + "')]");
    this.howDidIDoRating = page.locator("(//div[@class='ml-2 pt-1'])[1]//div[@class='v-rating stars pl-1']//button[@aria-label='" + `${process.env.how_did_I_do_rating_label}` + "']");
    this.whatCanIImproveTag = page.locator("(//div[@class='d-flex flex-wrap align-center justify-center'])[1]//button[2]");
    this.howWasTheConnectionQualityRating = page.locator("(//div[@class='ml-2 pt-1'])[2]//div[@class='v-rating stars pl-1']//button[@aria-label='" + `${process.env.how_was_the_connection_quality_rating_label}` + "']");
    this.whatWasGoodTag = page.locator("(//div[@class='d-flex flex-wrap align-center justify-center'])[2]//button[1]");
    this.anythingElseWeShouldKnowRating = page.locator("//div[@class='v-text-field__slot']//textarea");
    this.submitButton = page.locator("//span[@class='v-btn__content'][contains(text(),'" + `${process.env.submit_button}` + "')]");
  }

  //Actions  
  async submitRatingThroughHistory() {
    await this.historyTab.click();

    try {
      await this.rejoinModalCloseButton.click();
    } catch (error) {
      //do nothing
    }

    try {
      await this.actionRequired.click();
      await this.addRatingButton.click();
      await this.howDidIDoRating.click();
      await this.whatCanIImproveTag.click();
      await this.howWasTheConnectionQualityRating.click();
      await this.whatWasGoodTag.click();
      await this.anythingElseWeShouldKnowRating.type(`${process.env.anything_else_we_should_know_rating_text}`);
      await this.submitButton.click();
    } catch (error) {
      console.log("No rating found to submit");
    }


  }
}

module.exports = submitRatingCase;
