const { test, expect } = require('@playwright/test');
const LoginPage = require("../models/login");

test.describe("User is on Login Page", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);

    loginPage = new LoginPage(page);
    });

  test.only("Customer logs-in into Jeenie site ", async () => {
    await loginPage.loginCustomer();
    await expect(loginPage.getAJeeniePage).toBeVisible();  
  });

  test.only("Linguist logs-in into Jeenie site ", async () => {
    await loginPage.loginLinguist();
    await expect(loginPage.getAJeeniePage).toBeVisible();  
  });

  test.only("Owner logs-in into Jeenie site ", async () => {
    await loginPage.loginOwner();
    await expect(loginPage.getAJeeniePage).toBeVisible();  
  });

  test.only("Member logs-in into Jeenie site ", async () => {
    await loginPage.loginMember();
    await expect(loginPage.getAJeeniePage).toBeVisible();  
  });
});
  