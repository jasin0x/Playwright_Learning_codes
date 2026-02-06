// @ts-check
import {  devices } from '@playwright/test';
import { permission } from 'node:process';


const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
  
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    ignoreHttpsErrors: true, // Ignore HTTPS errors
    permissions: ['geolocation'], // Grant geolocation permission
    //viewport: { width: 1280, height: 720 },
    ...devices['iPhone 11'] // Emulate iPhone 11 screen size and capabilities
  },

};

export default config;

