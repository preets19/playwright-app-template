import { BasePage } from '@your-org/playwright-base-framework';
import { HomePage } from './homePage.js';

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.locator('[data-test="username"]');
  private readonly passwordInput = this.page.locator('[data-test="password"]');
  private readonly loginButton = this.page.locator('[data-test="login-button"]');
  private readonly errorMessage = this.page.locator('[data-test="error"]');

  async open(): Promise<void> {
    await this.navigateTo('/');
  }

  async loginAs(username: string, password: string): Promise<HomePage> {
    await this.actions.clearAndFill(this.usernameInput, username);
    await this.actions.clearAndFill(this.passwordInput, password);
    await this.actions.click(this.loginButton);
    return new HomePage(this.page);
  }

  async isErrorDisplayed(): Promise<boolean> {
    return this.actions.isVisible(this.errorMessage);
  }
}
