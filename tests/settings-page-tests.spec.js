const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");
const SettingsPage = require("../models/settings");

test.describe("User is on Settings Page", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const settingsPage = new SettingsPage(page);

    await page.goto(`${process.env.BASE_URL}`);
    await loginPage.loginCustomer();
    await settingsPage.settingsTab.click();
  });

  test("User changes platform language", async ({ page }) => {
    const settingsPage = new SettingsPage(page);

    await settingsPage.platformLanguage();
  });

  test("User priovides feedback through Support option", async ({ page }) => {
    const settingsPage = new SettingsPage(page);

    await settingsPage.support();
  });

  test.only("User sees privacy terms and policies", async ({ page }) => {
    const settingsPage = new SettingsPage(page);

    const newPage = await settingsPage.privacyTermsOfUse();

    await expect(newPage).toHaveURL(`${process.env.terms_of_use_link}`);

    // const settingsPage = new SettingsPage(page);

    // settingsPage.privacy();

    // settingsPage.privacyOption.click();
    
    // const [newPage] = await Promise.all([
    //   page.context().waitForEvent('page'),
    //   await settingsPage.termsOfUseOption.click()
    // ]);
  
    // await newPage.waitForLoadState();
    // await expect(newPage).toHaveURL(`${process.env.terms_of_use_link}`);
    // await expect(settingsPage.termsOfUseHeading).toBeVisible(); 
  });

  test("User logs out from Jeenie site", async ({ page }) => {
    const settingsPage = new SettingsPage(page);

    await settingsPage.logoutButton.click();
  });
});