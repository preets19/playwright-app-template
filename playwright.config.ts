import { defineConfig, devices } from '@playwright/test';
import { ConfigReader, type BrowserName, type TestSettings } from '@your-org/playwright-base-framework';

type AppTestSettings = TestSettings & {
  browser: TestSettings['browser'] & {
    browsers?: BrowserName[];
  };
};

const settings = ConfigReader.read(process.env.APP_SETTINGS_PATH ?? 'appsettings.json') as AppTestSettings;
const browserNames: BrowserName[] = Array.isArray(settings.browser.browsers) && settings.browser.browsers.length
  ? settings.browser.browsers
  : [settings.browser.name ?? 'chromium'];

const desktopDevices = {
  chromium: devices['Desktop Chrome'],
  firefox: devices['Desktop Firefox'],
  webkit: devices['Desktop Safari']
} as const;

export default defineConfig({
  testDir: './_automation/tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000
  },
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],
  use: {
    baseURL: settings.application.baseUrl,
    headless: settings.browser.headless,
    viewport: settings.browser.viewport,
    launchOptions: {
      slowMo: settings.browser.slowMo
    },
    actionTimeout: 10_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: browserNames.map((browserName) => ({
    name: browserName,
    use: {
      ...desktopDevices[browserName as keyof typeof desktopDevices],
      browserName
    }
  })),
  outputDir: 'test-results'
});
