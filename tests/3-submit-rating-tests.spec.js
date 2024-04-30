const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");
const submitRatingCase = require("../models/submitRating")

// example.spec.js
test.describe("User is on History page", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto(`${process.env.BASE_URL}`);
    await loginPage.loginCustomer();
  });

  test("Submitting the rating", async ({ page }) => {
    const submitRating = new submitRatingCase(page);

    await submitRating.submitRatingThroughHistory();
  });
  
});
  