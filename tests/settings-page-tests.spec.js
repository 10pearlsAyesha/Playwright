const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");
const SettingsPage = require("../models/settings");

test.describe("User is on Settings Page", () => {
let loginPage; 

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
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

  test("User sees privacy terms, policies and delete account form", async ({ page }) => {
    const settingsPage = new SettingsPage(page);

    //Terms Of Use
    const termsOfUsePage = await settingsPage.privacyTermsOfUse();
    await expect(termsOfUsePage).toHaveURL(`${process.env.terms_of_use_link}`);

    await termsOfUsePage.close();

    await expect(page).toHaveURL(`${process.env.SETTINGS_PAGE_URL}`);
    
    //Privacy Policy
    const privacyPolicyPage = await settingsPage.privacyPolicy();
    await expect(privacyPolicyPage).toHaveURL(`${process.env.privacy_policy_link}`);

    await privacyPolicyPage.close();

    await expect(page).toHaveURL(`${process.env.SETTINGS_PAGE_URL}`);

    //Delete Account Form
    settingsPage.privacyDeleteAccount();
  });

  test.only("User changes account password", async ({ page }) => {
    const settingsPage = new SettingsPage(page);

    await settingsPage.changePassword();
    await loginPage.loginCustomerWithNewPassword();
  });

  test("User logs out from Jeenie site", async ({ page }) => {
    const settingsPage = new SettingsPage(page);

    await settingsPage.logoutButton.click();
  });
});