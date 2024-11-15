const { test, expect } = require('@playwright/test');
const OnboardingPage = require("../models/onboarding");
import MailosaurClient from "mailosaur";
const { JSDOM } = require('jsdom');
const mailosaur = new MailosaurClient("IuPqSGsPt7Okmz1YfKpfjaueY6FxPKhd");
const { log } = require('console');
test.describe("User is on SignUpPage", () => {
  let onboardingPage;

  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.SignUp_Url}`);
    onboardingPage = new OnboardingPage(page);
  });

  test.only("User Onboarding Process", async () => {
    const serverId = "eunoox6f";
    await onboardingPage.onboarduser();
    // Connect to Mailosaur, and wait for that email to arrive
    const email = await mailosaur.messages.get(serverId, {
      sentTo: onboardingPage.addUserEmail,
    }, {
      timeout: 20000 // 20 seconds
    })
    expect(email.subject).toBe("Welcome to Jeenie");
    // Parse the email body to extract the verification code
    const dom = new JSDOM(message.html.body);
    const el = dom.window.document.querySelector('strong.verification-code');
    const verificationCode = el.textContent.trim();
    console.log('Verification Code:', verificationCode);

    // Extract the numbers from the verification code
    const numberOnly = verificationCode.match(/\d+/)[0];
    console.log('Number Only:', numberOnly);
    // Perform actions on the web page using Playwright
    await page.goto(`${process.env.SignUp_Url}`);

    // Wait for the OTP input field and enter the extracted code
    await page.waitForSelector("//div[@class='v-otp-input__content']");
    await page.fill("//div[@class='v-otp-input__content']", numberOnly);
  });
});



