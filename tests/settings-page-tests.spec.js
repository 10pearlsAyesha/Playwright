const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");
const SettingsPage = require("../models/settings");

test.describe("User is on Settings Page", () => {
//  let settingsPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto(`${process.env.BASE_URL}`);
    await loginPage.loginCustomer();
  });

  test.only("User changes platform language", async ({ page }) => {
    const settingsPage = new SettingsPage(page);

    await settingsPage.platformLanguage();
  });

  // test("", async () => {
  // });

  // test("", async () => {
  // });

  // test("", async () => {
  // });

  test("User logs out from Jeenie site", async () => {
    await settingsPage.settingsTab.click();
    await settingsPage.logoutButton.click();
  });
});