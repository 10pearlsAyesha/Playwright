const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");
const ScheduledPage = require('../models/scheduleCall');

test.describe("User is on Scheduled page", () => {
let loginPage; 
let scheduleCall;

  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);

    loginPage = new LoginPage(page);
    scheduleCall = new ScheduledPage(page);
  });

  //------------------not working right now due to payment issue-------------------//
  test("Owner schedules a call for tomorrow", async ({ page }) => {
    await loginPage.loginOwnerEnterpMonthly();
    await loginPage.closeModals();

    await scheduleCall.scheduledTab.click();
    await scheduleCall.reserveAFutureCallTimeButton.click();
    await scheduleCall.scheduleCallForTomorrow();
    await page.pause();
  });
  
  //------------------not working right now due to payment issue-------------------//
  test("Member schedules a call for tomorrow", async ({ page }) => {
    await loginPage.loginMember();
    await loginPage.closeModals();

    await scheduleCall.scheduledTab.click();
    await scheduleCall.reserveAFutureCallTimeButton.click();
    await scheduleCall.scheduleCallForTomorrow();
    await page.pause();
  });
});
  