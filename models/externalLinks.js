const { expect } = require('@playwright/test');

class ExternalLinks {
  constructor(page) {
    this.page = page;
    this.questionMarkIcon = page.locator("//button[contains(@class,'mdi-help-circle-outline')]");
    this.resourceCenterLink = page.locator("//div[@class='v-list-item__title'][text()='Resource Center']");
    this.jeenieAppLink = page.locator("(//a[@class='store-link'])[1]");
  }

  async verifyHowCanWeHelpLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.questionMarkIcon.click()
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(`${process.env.question_mark_help_link}`);
    await newPage.close();
  }

  async verifyOwnerEnterpriseSubResourceCenterLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.resourceCenterLink.click()
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(`${process.env.owner_enterprise_sub_resource_center_link}`);
    await newPage.close();
  }

  async verifyAppStoreLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.jeenieAppLink.click()
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(`${process.env.jeenie_app_link}`);

    const appStoreLinkLocator = newPage.locator("//a[contains(@href,'" + `${process.env.app_store_link}` + "')]");
    await appStoreLinkLocator.click();
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(new RegExp(`${process.env.app_store_link}`));
    await newPage.close();
  }

  async verifyGooglePlayLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.jeenieAppLink.click()
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(`${process.env.jeenie_app_link}`);

    const appStoreLinkLocator = newPage.locator("//a[contains(@href,'" + `${process.env.google_play_link}` + "')]");
    await appStoreLinkLocator.click();
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(new RegExp(`${process.env.google_play_link}`));
    await newPage.close();  
  }

  async verifyOwnerHealthcareResourceCenterLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.resourceCenterLink.click()
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(`${process.env.owner_healthcare_sub_resource_center_link}`);
    await newPage.close();
  }
}

module.exports = ExternalLinks;
