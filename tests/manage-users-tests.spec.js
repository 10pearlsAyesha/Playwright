const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");
const ManageUsersPage = require('../models/manageUsers');

test.describe("User is on Manage Users page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);

    const loginPage = new LoginPage(page);

    await loginPage.loginOwnerEnterpSub();
    await loginPage.closeModals();
  });

  test.only("Add, update, delete and invite user", async ({ page }) => {
    const manageUser = new ManageUsersPage(page);

    await manageUser.manageUsersTab.click();
    await manageUser.addUser();
//    await manageUser.updateUser();
    await page.pause();
  });
});
  