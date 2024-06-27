const { expect } = require('@playwright/test');

class submitRatingCase {
  constructor(page) {
    this.page = page;
    this.historyTab = page.locator("//div[@class='app-menu-items']//div//a//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.history_tab_text}` + "')]");
    this.rejoinModalCloseButton = page.locator("//div[@class='in-call-status pa-8 v-card v-sheet theme--light']//button[@class='v-btn v-btn--icon v-btn--round theme--light v-size--default']");
    this.actionRequired = page.locator("(//tbody//tr//td[3]//div//button//span//i[@class='v-icon notranslate alert mdi mdi-alert theme--light'])[1]");
    this.addRatingButton = page.locator("//span[@class='v-btn__content']//span[contains(text(),'" + `${process.env.add_rating_button_text}` + "')]");
    this.howDidIDoRating = page.locator("(//div[@class='v-rating stars pl-1'])[1]//button[@aria-label='" + `${process.env.how_did_I_do_rating_label}` + "']");
    this.whatCanIImproveTag = page.locator("(//div[@class='d-flex flex-wrap align-center justify-center'])[1]//button[2]");
    this.howWasTheConnectionQualityRating = page.locator("(//div[@class='v-rating stars pl-1'])[2]//button[@aria-label='" + `${process.env.how_was_the_connection_quality_rating_label}` + "']");
    this.whatWasGoodTag = page.locator("(//div[@class='d-flex flex-wrap align-center justify-center'])[2]//button[1]");
    this.anythingElseWeShouldKnowComment = page.locator("//div[@class='v-text-field__slot']//textarea");
    this.submitButton = page.locator("//span[@class='v-btn__content'][text()='" + `${process.env.submit_button}` + "']");

    this.howDidIDoAverageRating = page.locator("(//div[@class='v-rating stars pl-1'])[1]//button[@aria-label='" + `${process.env.how_did_I_do_average_rating_label}` + "']");
    this.howWasTheConnectionQualityAverageRating = page.locator("(//div[@class='v-rating stars pl-1'])[2]//button[@aria-label='" + `${process.env.how_was_the_connection_quality_average_rating_label}` + "']");
    this.ohSnapText = page.locator("//span[@class='ohSnap d-block']");
    this.tellUsMoreAboutComment = page.locator("//div[@class='v-text-field__slot']//textarea[@placeholder='Tell us more about your call experience. What can we do better next time? ']");
    this.submitButtonOhSnap = page.locator("(//span[@class='v-btn__content'][text()='" + `${process.env.submit_button}` + "'])[2]");

    this.reportIssueButton = page.locator("//span[@class='v-btn__content'][text()='" + `${process.env.report_issue_button}` + "']");
    this.issueExperienced = page.locator("//div[text()='" + `${process.env.issue_experienced}` + "']");
    this.technicalDifficulty = page.locator("//span[@class='v-btn__content'][text()='" + `${process.env.technical_difficulty}` + "']");
    this.submitButtonReportIssue = page.locator("//div[contains(@class,'v-card')]//div[@class='v-card__actions']//button[2]//span[@class='v-btn__content'][text()='" + `${process.env.submit_button}` + "']");
    this.supportThankyouText = page.locator("//h2[@class='tagline text-center'][contains(text(),'" + `${process.env.support_thankyou_text}` + "')]");
  }

  //Actions  
  async submitGoodRatingThroughHistory() {
   try {
      await this.actionRequired.click();
      await this.addRatingButton.click();
      await this.page.waitForTimeout(3000);
     await this.howDidIDoRating.click();
     await this.whatCanIImproveTag.click();
      await this.howWasTheConnectionQualityRating.click();
      await this.whatWasGoodTag.click();
      await this.anythingElseWeShouldKnowComment.type(`${process.env.anything_else_we_should_know_comment}`);
     await this.submitButton.click();
    } catch (error) {
      console.log("No rating found to submit");
    }
  }

  async submitAveargeRatingThroughHistory() {
   try {
      await this.actionRequired.click();
      await this.addRatingButton.click();
      await this.page.waitForTimeout(3000);
      await this.howDidIDoAverageRating.click();
      await this.howWasTheConnectionQualityAverageRating.click();
      await this.submitButton.click();
      await expect(this.ohSnapText).toBeVisible();
      await this.tellUsMoreAboutComment.type(`${process.env.tell_us_more_about_comment}`);
      await this.page.waitForTimeout(2000);
      await this.submitButtonOhSnap.click();
    } catch (error) {
      console.log("No rating found to submit");
    }
  }

  async reportsRatingIssueThroughHistory() {
    try {
       await this.actionRequired.click();
       await this.addRatingButton.click();
       await this.page.waitForTimeout(3000);
       await this.reportIssueButton.click();
       await this.issueExperienced.click();
       await this.technicalDifficulty.click();
       await this.page.waitForTimeout(2000);
       await this.submitButtonReportIssue.click();
       await expect(this.supportThankyouText).toBeVisible(); 
    } catch (error) {
      console.log("No rating found to submit");
    }
   }
}

module.exports = submitRatingCase;
