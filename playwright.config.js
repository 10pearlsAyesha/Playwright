// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    navigationTimeout: 70 * 1000,
    actionTimeout: 70 * 1000,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },

  timeout: 3 * 1000 * 100, // this is the timeout for each individual test(step) - approximately 5min
  expect: {
    timeout: 60 * 1000,
  },
  globalTimeout: 1800000, // this is the maximum duration for the entire suite. Setting this to prevent a CI build from locking up indefinitely
  reportSlowTests: { max: 0, threshold: 300000 }, // reports on slow tests, this will inform us when tests are slowing down.

  /* Configure projects for major browsers */
  projects: [
      {
        name: 'chromium',
        use: {
          // Use the 'chromium' browser
          browserName: 'chromium',
          // Configure the device to simulate a desktop screen
          ...devices['Desktop Chrome'],
          // Configure the launch options for Chromium
          viewport: { width: 1520, height: 800 },
          launchOptions: {
            args: ['--start-maximized'] // Start Chromium with a maximized window
          },
        }
      }
/*
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        launchOptions: {
          firefoxUserPrefs: {
            'permissions.default.microphone': 1,
            'permissions.default.camera': 1,
            'permissions.default.notifications': 1,
          },
        },
      }
   },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/
  ],

  //  Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: "test-results"
});

