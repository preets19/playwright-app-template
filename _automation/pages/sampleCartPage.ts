import { BasePage } from '@your-org/playwright-base-framework';
import { SampleCheckoutPage } from './sampleCheckoutPage.js';

export class SampleCartPage extends BasePage {
  private readonly productTitle = this.page.locator('[data-test="product-title"]');
  private readonly productPrice = this.page.locator('[data-test="product-price"]');
  private readonly proceedToCheckoutButton = this.page.locator('[data-test="proceed-1"]');

  async productName(): Promise<string> {
    return this.actions.text(this.productTitle.first());
  }

  async price(): Promise<string> {
    return this.actions.text(this.productPrice.first());
  }

  async proceedToCheckout(): Promise<SampleCheckoutPage> {
    await this.actions.click(this.proceedToCheckoutButton);

    const checkoutPage = new SampleCheckoutPage(this.page);
    await checkoutPage.waitUntilReady();
    return checkoutPage;
  }
}
