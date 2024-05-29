const { test, expect } = require('@playwright/test');
const path = require('path');
const LoginPage = require("../models/login");
const ProfilePage = require("../models/updateProfile");

test.describe("User is on Profile Page", () => {
let profilePage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    profilePage = new ProfilePage(page);

    await page.goto(`${process.env.BASE_URL}`);
    await loginPage.loginCustomer();
    await loginPage.closeModals();
  });

  test("User uploads and removes a profile picture", async ({ page }) => {
    //uploads picture
    await profilePage.loggedinUserName.click();
    await profilePage.editIcon.click();
    await profilePage.profilePictureEditIcon.click();
  
    page.on('filechooser', async (fileChooser) => {
      const filePath = path.resolve(__dirname, "../profile-picture/image-1.jpg");  
      await fileChooser.setFiles(filePath);
    });

    await profilePage.uploadImageButton.click();
    await profilePage.saveImageButton.click();
    await page.waitForTimeout(3000);
    await expect(profilePage.imageUploadedOnProfile).toBeVisible(); 
    await expect(profilePage.imageUploadedOnHeader).toBeVisible(); 
    await page.waitForTimeout(3000);

    //removes picture
    await profilePage.profilePictureEditIcon.click();  
    await profilePage.removeImageButton.click();
    await page.waitForTimeout(3000);
    await expect(profilePage.imageRemovedFromProfile).toBeVisible(); 
    await expect(profilePage.imageRemovedFromHeader).toBeVisible(); 
  });
  
  test("User updates his profile", async () => {
    await profilePage.loggedinUserName.click();
    await profilePage.editIcon.click();
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
  