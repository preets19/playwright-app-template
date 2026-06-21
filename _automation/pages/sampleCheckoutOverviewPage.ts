import { BasePage } from '@your-org/playwright-base-framework';

export class SampleCheckoutOverviewPage extends BasePage {
  private readonly checkoutOverviewPageTitle = this.page.locator('[data-test="title"]');
  // Provisional: suitable for a single-product order; harden to a shared checkout-item scope if local runs need it.
  private readonly overviewProductNameByProduct = (productName: string) =>
    this.page.locator('[data-test="inventory-item-name"]').filter({ hasText: productName }).first();
  // Provisional: this price is not associated to the same checkout item as the product name.
  private readonly overviewProductPriceByPrice = (expectedPrice: string) =>
    this.page.locator('[data-test="inventory-item-price"]').filter({ hasText: expectedPrice }).first();
  private readonly finishButton = this.page.locator('[data-test="finish"]');

  override async waitUntilReady(): Promise<void> {
    await this.waits.forVisible(this.checkoutOverviewPageTitle);
  }

  async waitForHeadingText(expectedOverviewPageHeading: string): Promise<void> {
    await this.waits.forText(this.checkoutOverviewPageTitle, expectedOverviewPageHeading);
  }

  async getProductName(productName: string): Promise<string> {
    return this.actions.text(this.overviewProductNameByProduct(productName));
  }

  async getProductPrice(expectedPrice: string): Promise<string> {
    return this.actions.text(this.overviewProductPriceByPrice(expectedPrice));
  }

  async finishOrder(): Promise<void> {
    await this.actions.click(this.finishButton);
  }
}