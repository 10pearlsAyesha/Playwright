const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");
const ScheduledPage = require('../models/scheduleCall');

test.describe("User is on Scheduled page", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto(`${process.env.BASE_URL}`);
    await loginPage.loginOwner();
    await loginPage.closeModals();
  });

  test.only("Owner schedules a call for tomorrow", async ({ page }) => {
    const scheduleCall = new ScheduledPage(page);

    await scheduleCall.scheduledTab.click();
    await scheduleCall.reserveAFutureCallTimeButton.click();
    await scheduleCall.scheduleCallForTomorrow();
    await page.pause();
  });
  
});
  