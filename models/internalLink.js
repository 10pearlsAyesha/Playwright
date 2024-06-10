const { expect } = require('@playwright/test');

class InternalLink {
  constructor(page) {
    this.page = page;
    this.notificationPermissionPopup = page.locator("//div[contains(@class,'linguist-alert')]");
    this.moreInfoLink = page.locator("//span[@class='v-btn__content'][text()='More info']");
  }

  async verifyNotificationPermissionMoreInfoLink() {
    await expect(this.notificationPermissionPopup).toBeVisible();

    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.moreInfoLink.click()
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(`${process.env.uat_more_info_link}`);
    await newPage.close();
  }
}

module.exports = InternalLink;
