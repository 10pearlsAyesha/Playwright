const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");
const historyPage = require("../models/history")

test.describe("User is on History page", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto(`${process.env.BASE_URL}`);
    await loginPage.loginOwnerEnterpPayg();
//    await loginPage.closeModals();
  });

  test.only("Apply filter, reset filter, ", async ({ page }) => {
    const history = new historyPage(page);

    await history.historyTab.click();
    await history.applyAndResetFilter();
    // await history.searchByDateRange();
    // await history.checkDetails();
    // await history.downloadCSV();
    await page.pause();
  });
  
});
  