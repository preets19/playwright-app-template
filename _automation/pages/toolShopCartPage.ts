import { BasePage } from '@your-org/playwright-base-framework';
import { ToolShopCheckoutPage } from './toolShopCheckoutPage.js';

export class ToolShopCartPage extends BasePage {
  private readonly productTitle = this.page.locator('[data-test="product-title"]');
  private readonly productPrice = this.page.locator('[data-test="product-price"]');
  private readonly proceedToCheckoutButton = this.page.locator('[data-test="proceed-1"]');

  async productName(): Promise<string> {
    return this.actions.text(this.productTitle.first());
  }

  async price(): Promise<string> {
    return this.actions.text(this.productPrice.first());
  }

  async proceedToCheckout(): Promise<ToolShopCheckoutPage> {
    await this.actions.click(this.proceedToCheckoutButton);
    return new ToolShopCheckoutPage(this.page);
  }
}