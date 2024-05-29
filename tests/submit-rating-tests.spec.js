const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");
const submitRatingCase = require("../models/submitRating")

test.describe("User is on History page", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.context().grantPermissions(['camera', 'microphone']);
    await page.goto(`${process.env.BASE_URL}`);
    await loginPage.loginCustomer();
    await loginPage.closeModals();
  });

  test("Submitting the rating", async ({ page }) => {
    const submitRating = new submitRatingCase(page);

    await submitRating.historyTab.click();
    await submitRating.actionRequired.click();
    await submitRating.addRatingButton.click();
    await page.waitForTimeout(3000);
    await submitRating.submitRatingThroughHistory();
  });
  
});
  