import { BasePage } from '@your-org/playwright-base-framework';
import type { SampleLoginCredentialsModel } from '../models/sampleLoginCredentialsModel.js';

export class SampleLoginPage extends BasePage {
  // Provisional broad scope from the recording; replace if a specific brand locator becomes available.
  private readonly loginPageContent = this.page.locator('#root');
  private readonly usernameInput = this.page.locator('[data-test="username"]');
  private readonly passwordInput = this.page.locator('[data-test="password"]');
  private readonly loginButton = this.page.locator('[data-test="login-button"]');

  async open(): Promise<void> {
    await this.navigateTo('/');
  }

  override async waitUntilReady(): Promise<void> {
    await this.waits.forVisible(this.loginPageContent);
  }

  async waitForIdentityText(expectedLoginPageHeading: string): Promise<void> {
    await this.waits.forText(this.loginPageContent, expectedLoginPageHeading);
  }

  async enterCredentials(credentials: SampleLoginCredentialsModel): Promise<void> {
    await this.actions.fill(this.usernameInput, credentials.username);
    await this.actions.fill(this.passwordInput, credentials.password);
  }

  async submitLogin(): Promise<void> {
    await this.actions.click(this.loginButton);
  }
}