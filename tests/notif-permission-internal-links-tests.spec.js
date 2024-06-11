const { test } = require('@playwright/test');
const LoginPage = require("../models/login");
const InternalLink = require('../models/internalLink');

test.describe("User is logged-in", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);

    const loginPage = new LoginPage(page);
    await loginPage.loginLinguist();
    await loginPage.closeModals();
  });

  test("Linguist verifies the notification permission internal link of Jeenie App", async ({ page }) => {
    const internalLink = new InternalLink(page);
    await internalLink.verifyNotificationPermissionMoreInfoLink();
  });
});
  