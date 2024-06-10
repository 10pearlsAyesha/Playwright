const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");
const { log } = require('console');

test.describe("User is on Login Page", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);

    loginPage = new LoginPage(page);
  });

  test("Customer logs-in into Jeenie site", async () => {
    await loginPage.loginCustomer();
    await loginPage.closeModals();
    await expect(loginPage.getAJeeniePage).toBeVisible();  
  });

  test("Linguist logs-in into Jeenie site", async () => {
    await loginPage.loginLinguist();
    await loginPage.closeModals();
    await expect(loginPage.getAJeeniePage).toBeVisible();  
  });

  test("Owner Enterprise Payg logs-in into Jeenie site", async () => {
    await loginPage.loginOwnerEnterpPayg();
    await loginPage.closeModals();
    await expect(loginPage.getAJeeniePage).toBeVisible();  
  });
  test("Owner Enterprise Sub logs-in into Jeenie site", async () => {
    await loginPage.loginOwnerEnterpSub();
    await loginPage.closeModals();
    await expect(loginPage.getAJeeniePage).toBeVisible();  
  });

  test("Owner Healthcare logs-in into Jeenie site", async () => {
    await loginPage.loginOwnerHealthcareSub();
    await loginPage.closeModals();
    await expect(loginPage.getAJeeniePage).toBeVisible();  
  });

  test("Member logs-in into Jeenie site", async () => {
    await loginPage.loginMember();
    await loginPage.closeModals();
    await expect(loginPage.getAJeeniePage).toBeVisible();  
  });
});