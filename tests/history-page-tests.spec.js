const { test } = require('@playwright/test');
const LoginPage = require("../models/login");
const historyPage = require("../models/history")

test.describe("User is on History page", () => {
let loginPage; 
let history;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    history = new historyPage(page);

    await page.goto(`${process.env.BASE_URL}`);
  });

  test("Owner apply filter, reset filter, check call details, search by Date range, verify applied date range results and download CSV", async () => {
    await loginPage.loginOwnerEnterpPayg();
    await loginPage.closeModals();

    await history.historyTab.click();
    await history.applyAndResetFilter();
    await history.checkCallDetails();
    await history.searchByDateRange();
    await history.verifyAppliedDateRangeResults();
    await history.downloadCSV();
  });

  test("Member download CSV", async () => {
    await loginPage.loginMember();
    await loginPage.closeModals();
    
    await history.historyTab.click();
    await history.searchByDateRange();
    await history.downloadCSV();
  });

  test("Linguist download CSV", async () => {
    await loginPage.loginLinguist();
    await loginPage.closeModals();

    await history.historyTab.click();
    await history.searchByDateRange();
    await history.downloadCSV();
  });

  test("Customer download CSV", async () => {
    await loginPage.loginCustomer();
    await loginPage.closeModals();
    
    await history.historyTab.click();
    await history.searchByDateRange();
    await history.downloadCSV();
  });
});
  