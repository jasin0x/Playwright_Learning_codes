// @ts-check
import { devices } from '@playwright/test';
import { worker } from 'node:cluster';


const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 1, // Retry will be triggered once if a test fails
  workers: 1, // Run all tests in a single worker to avoid parallel execution
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'only-on-failure',
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
      },
    },

    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
      },
    }
  ]



};
export default config;

