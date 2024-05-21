const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");
const SettingsPage = require("../models/settings");

test.describe("User is on Settings Page", () => {
  let loginPage;
  let settingsPage;

  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);

    loginPage = new LoginPage(page);
    settingsPage = new SettingsPage(page);
  });

  test("User changes platform language", async () => {
    await settingsPage.platformLanguage();
  });

  test("", async () => {
  });

  test("", async () => {
  });

  test("", async () => {
  });

  test("User logs out from Jeenie site", async () => {
    await settingsPage.settingsTab.click();
    await settingsPage.logoutButton.click();
  });
});