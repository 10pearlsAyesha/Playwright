const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");
const acceptCallCase = require("../models/acceptCall")

test.describe("User is on Get a Jeenie page", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.context().grantPermissions(['microphone','camera','notifications']);
    await page.goto(`${process.env.BASE_URL}`);
    await loginPage.loginLinguist();
  });

  test.only("Linguists accepts a call", async ({ page }) => {
    const AcceptCall = new acceptCallCase(page);

    await expect(AcceptCall.availableForCallsStatus).toBeVisible();
    await expect(AcceptCall.incomingCallModal).toBeVisible();
    await AcceptCall.acceptCallThroughLinguist();
  });
});
  