import { BasePage } from '@your-org/playwright-base-framework';

export class SampleCartPage extends BasePage {
  private readonly cartPageTitle = this.page.locator('[data-test="title"]');
  private readonly checkoutButton = this.page.locator('[data-test="checkout"]');
  // Provisional: a multi-item cart should replace this with a stable cart-item scope.
  private readonly cartProductNameByProduct = (productName: string) =>
    this.page.locator('[data-test="inventory-item-name"]').filter({ hasText: productName }).first();
  // Provisional: this price is not scoped to the same cart item as the product name.
  private readonly cartProductPriceByPrice = (expectedPrice: string) =>
    this.page.locator('[data-test="inventory-item-price"]').filter({ hasText: expectedPrice }).first();

  override async waitUntilReady(): Promise<void> {
    await this.waits.forVisible(this.cartPageTitle);
  }

  async waitForHeadingText(expectedCartPageHeading: string): Promise<void> {
    await this.waits.forText(this.cartPageTitle, expectedCartPageHeading);
  }

  async getHeadingText(): Promise<string> {
    return this.actions.text(this.cartPageTitle);
  }

  async getProductName(productName: string): Promise<string> {
    return this.actions.text(this.cartProductNameByProduct(productName));
  }

  async getProductPrice(expectedPrice: string): Promise<string> {
    return this.actions.text(this.cartProductPriceByPrice(expectedPrice));
  }

  async clickCheckout(): Promise<void> {
    await this.actions.click(this.checkoutButton);
  }
}