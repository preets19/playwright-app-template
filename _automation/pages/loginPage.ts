import { BasePage } from '@your-org/playwright-base-framework';
import type { UserModel } from '../models/checkoutModel.js';
import { ProductsPage } from './productsPage.js';

export class LoginPage extends BasePage {
  private readonly brandText = this.page.getByText('Swag Labs');
  private readonly usernameInput = this.page.locator('[data-test="username"]');
  private readonly passwordInput = this.page.locator('[data-test="password"]');
  private readonly loginButton = this.page.locator('[data-test="login-button"]');

  async open(startPath: string): Promise<void> {
    await this.navigateTo(startPath);
    await this.waitUntilReady();
  }

  override async waitUntilReady(): Promise<void> {
    await super.waitUntilReady();
    await this.waits.forVisible(this.brandText, { description: 'Swag Labs brand' });
    await this.waits.forEditable(this.usernameInput, { description: 'Username input' });
    await this.waits.forEditable(this.passwordInput, { description: 'Password input' });
    await this.waits.forEnabled(this.loginButton, { description: 'Login button' });
  }

  async loginAs(user: UserModel): Promise<ProductsPage> {
    await this.actions.clearAndFill(this.usernameInput, user.username);
    await this.actions.clearAndFill(this.passwordInput, user.password);
    await this.actions.click(this.loginButton);

    const productsPage = new ProductsPage(this.page);
    await productsPage.waitUntilReady();
    return productsPage;
  }
}
