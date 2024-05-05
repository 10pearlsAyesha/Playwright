const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");
const initiateCallCase = require("../models/initiateCall")

test.describe("User is on Get a Jeenie page", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.context().grantPermissions(['microphone','camera','notifications']);
    await page.goto(`${process.env.BASE_URL}`);
    await loginPage.loginCustomer();
  });

  test("Customer initiates a call and cancel it", async ({ page }) => {
    const InitiateCall = new initiateCallCase(page);

    await InitiateCall.initiateCallThroughCustomer();
    await InitiateCall.audioButton.click();
    try{
      await expect(InitiateCall.addPaymentModal).toBeVisible();
      await InitiateCall.paymentModalSkipLink.click();
    }
    catch{
      //do nothing
    }
    await expect(InitiateCall.callConnectingPage).toBeVisible();
    await expect(InitiateCall.gettingAJeenieNowText).toBeVisible();
    await expect(InitiateCall.lookingForJeenieText).toBeVisible();
    await InitiateCall.cancelCallButton.click();
    await expect(InitiateCall.cancelCallConfirmationModal).toBeVisible();
    await InitiateCall.yesCancelCallButton.click();
    await expect(InitiateCall.getAJeeniePage).toBeVisible();
  });
});
  