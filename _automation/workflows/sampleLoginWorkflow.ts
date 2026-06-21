import type { Page } from '@playwright/test';
import type { SampleLoginCredentialsModel } from '../models/sampleLoginCredentialsModel.js';
import { SampleInventoryPage } from '../pages/sampleInventoryPage.js';
import { SampleLoginPage } from '../pages/sampleLoginPage.js';

export interface SampleLoginWorkflowResult {
  inventoryPageHeading: string;
}

export class SampleLoginWorkflow {
  constructor(private readonly page: Page) {}

  async login(
    credentials: SampleLoginCredentialsModel,
    expectedLoginPageHeading: string
  ): Promise<SampleLoginWorkflowResult> {
    const loginPage = new SampleLoginPage(this.page);
    await loginPage.open();
    await loginPage.waitUntilReady();
    await loginPage.waitForIdentityText(expectedLoginPageHeading);
    await loginPage.enterCredentials(credentials);
    await loginPage.submitLogin();

    const inventoryPage = new SampleInventoryPage(this.page);
    await inventoryPage.waitUntilReady();

    return {
      inventoryPageHeading: await inventoryPage.getHeadingText()
    };
  }
}