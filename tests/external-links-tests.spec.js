const { test } = require('@playwright/test');
const LoginPage = require("../models/login");
const ExternalLinks = require('../models/externalLinks');

test.describe("User is logged-in", () => {
let loginPage; 
let externalLinks;

  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);

    loginPage = new LoginPage(page);
    externalLinks = new ExternalLinks(page);
  });

  test("Owner Enterprise Sub verifies Help, Resource Center, App Store & Google Play links of Jeenie App", async ({ page }) => {
    await loginPage.loginOwnerEnterpSub();
    await loginPage.closeModals();
    await externalLinks.verifyHowCanWeHelpLink();
    await externalLinks.verifyOwnerEnterpriseSubResourceCenterLink();
    await externalLinks.verifyAppStoreLink();
    await externalLinks.verifyGooglePlayLink();
  });

  test("Owner Healthcare Sub verifies Resource Center link of Jeenie App", async ({ }) => {
    await loginPage.loginOwnerHealthcareSub();
    await loginPage.closeModals();
    await externalLinks.resourceCenterLink.click();
  });

});
  