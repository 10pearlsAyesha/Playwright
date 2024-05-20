const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");
const ProfilePage = require("../models/updateProfile");

// example.spec.js
test.describe("Profile Page", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto(`${process.env.BASE_URL}`);
    await loginPage.loginCustomer();
  });

  test.only("User updates his profile", async ({ page }) => {
    const profilePage = new ProfilePage(page);

    await profilePage.updateProfile();

    const savedDisplayName = await profilePage.updatedDisplayName.textContent();
    const savedDisplayNameOnHeader = await profilePage.updatedDisplayNameOnHeader.textContent();
    const savedGender = await profilePage.updatedGender.textContent();
    const savedNativeLanguage = await profilePage.updatedNativeLanguage.textContent();
    const savedPhoneNumber = await profilePage.updatedPhoneNumber.textContent();

    expect(savedDisplayName).toBe(`${process.env.customer_display_name}`);
    expect(savedDisplayNameOnHeader).toBe(`${process.env.customer_display_name}`);
    expect(savedGender).toBe(`${process.env.gender}`);
    expect(savedNativeLanguage).toBe(`${process.env.native_language}`);
    expect(savedPhoneNumber).toBe(`${process.env.phone_number}`);

  });
  
});
  