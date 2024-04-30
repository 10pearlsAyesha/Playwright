const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");

// example.spec.js
test.describe("Login Page", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);
    });

  test.skip("User logs-in into Jeenie site ", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginCustomer();

    try {
      await loginPage.ratingModalCloseButton.click();
      await loginPage.rejoinModalCloseButton.click();
    } catch (error) {
      //do nothing
    }

    await expect(loginPage.getAJeeniePage).toBeVisible();  
  });
});
  