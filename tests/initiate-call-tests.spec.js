const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");
const initiateCallCase = require("../models/initiateCall")

test.describe("User is on Get a Jeenie page", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.context().grantPermissions(['camera', 'microphone']);
    await page.goto(`${process.env.BASE_URL}`);
    await loginPage.loginCustomer();
  });

  test("Customer initiates a call and cancel it", async ({ page }) => {
    const InitiateCall = new initiateCallCase(page);

    await InitiateCall.initiateCallThroughCustomer();
    await page.waitForTimeout(20000);
    await InitiateCall.audioButton.click();
    await expect(InitiateCall.callConnectingPage).toBeVisible();
    await expect(InitiateCall.gettingAJeenieNowText).toBeVisible();
    await expect(InitiateCall.lookingForJeenieText).toBeVisible();
    await InitiateCall.cancelCallButton.click();
    await expect(InitiateCall.cancelCallConfirmationModal).toBeVisible();
    await InitiateCall.yesCancelCallButton.click();
    await expect(InitiateCall.getAJeeniePage).toBeVisible();
  });
});
  