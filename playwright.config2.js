const { devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */

const config = {
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 10000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  projects: [
    {
      name: 'Safari',
      use: {
        actionTimeout: 0,
        trace: 'on',
        browserName : 'webkit',
        screenshot : 'on',
        headless: false,
        viewport: {width:720, height:720},
        ignoreHTTPSErrors : true,
        permissions:['geolocation']
      },
    },
    {
      name: 'Google',
      use: {
        actionTimeout: 0,
        trace: 'on',
        browserName : 'chromium',
        screenshot : 'on',
        headless: false,
        ...devices['iPhone 13 Pro Max']
      },
    }
  ]
};

module.exports = config;
