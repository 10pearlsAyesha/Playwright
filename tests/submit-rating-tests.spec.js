const { test } = require('@playwright/test');
const LoginPage = require("../models/login");
const submitRatingCase = require("../models/submitRating")

test.describe("User is on History page", () => {
let loginPage;
let submitRating;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    submitRating = new submitRatingCase(page);

    await page.goto(`${process.env.BASE_URL}`);
    await loginPage.loginCustomer();
    await loginPage.closeModals();
  });

  test.only("Customer submitting the good rating", async () => {
    await submitRating.historyTab.click();
    await submitRating.submitGoodRatingThroughHistory();
  });
  
  test("Customer submitting the average rating", async () => {
    await submitRating.historyTab.click();
    await submitRating.submitAveargeRatingThroughHistory();
  });

  test("Customer reports rating issue", async () => {
    await submitRating.historyTab.click();
    await submitRating.reportsRatingIssueThroughHistory();
  });
});
  