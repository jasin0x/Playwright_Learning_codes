// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'console';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40 * 1000,
  expect:{
    timeout: 5000
  },
  reporter: 'html',


  use: {

    browserName: 'chromium',
    headless: false,
    trace: 'retain-on-failure',
  },

});
module.exports = config

